package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/hamstersnore/homeconomy/database"
	"github.com/hamstersnore/homeconomy/managers"
	"github.com/hamstersnore/homeconomy/models"
	repositories "github.com/hamstersnore/homeconomy/repositories/models"
)

func CreateAccountHandler(w http.ResponseWriter, r *http.Request) {
	log.Print("[CreateAccountHandler]")
	var request models.CreateAccountRequest
	var id int
	var created_at time.Time
	claims := managers.GetClaims(r)
	json.NewDecoder(r.Body).Decode(&request)
	log.Printf("request -> %v", request)
	db := database.OpenDb()
	log.Print(claims.Id)
	db.QueryRow("INSERT INTO accounts (owner_id, alias, created_at) VALUES ($1,$2,$3) RETURNING id, created_at;", claims.Id, request.AccountAlias, time.Now()).Scan(&id, &created_at)
	response := repositories.AccountDb{
		Id:        id,
		OwnerId:   claims.Id,
		Alias:     request.AccountAlias,
		CreatedAt: created_at,
		UpdateAt:  nil,
	}
	log.Printf("response -> %v", response)
	json.NewEncoder(w).Encode(response)
}

func GetAccountsHandler(w http.ResponseWriter, r *http.Request) {
	db := database.OpenDb()
	rows, err := db.Query("SELECT * FROM accounts WHERE owner_id = $1", managers.GetClaims(r).Id)
	if err != nil {
		log.Fatal(err)
	}
	var accounts []repositories.AccountDb
	for rows.Next() {
		a := repositories.AccountDb{}
		err := rows.Scan(&a.Id, &a.OwnerId, &a.Alias, &a.CreatedAt, &a.UpdateAt)
		if err != nil {
			log.Fatal(err)
		}
		accounts = append(accounts, a)
	}

	json.NewEncoder(w).Encode(accounts)
}
