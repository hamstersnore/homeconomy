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
	var request models.CreateAccountRequest
	var id int
	var created_at time.Time
	claims := managers.GetClaims(r)
	json.NewDecoder(r.Body).Decode(&request)
	db := database.OpenDb()
	db.QueryRow("INSERT INTO accounts (owner_id, alias) VALUES $1, $2 RETURNING id, created_at", claims.Id, request.AccountAlias).Scan(&id, &created_at)
	json.NewEncoder(w).Encode(
		repositories.AccountDb{
			Id:        id,
			OwnerId:   claims.Id,
			Alias:     request.AccountAlias,
			CreatedAt: created_at,
			UpdateAt:  nil})
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
