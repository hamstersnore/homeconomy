package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/hamstersnore/homeconomy/database"
	"github.com/hamstersnore/homeconomy/managers"
	"github.com/hamstersnore/homeconomy/models"
	repositories "github.com/hamstersnore/homeconomy/repositories/models"
)

func CreateAccount(w http.ResponseWriter, r *http.Request) {
	var request models.CreateAccountRequest
	claims := managers.GetClaims(r)
	json.NewDecoder(r.Body).Decode(&request)
	db := database.OpenDb()
	db.QueryRow("INSERT INTO accounts (owner_id, alias) VALUES $1, $2", claims.Id, request.AccountAlias)
}

func GetAccounts(w http.ResponseWriter, r *http.Request) []repositories.AccountDb {
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
	return accounts
}
