package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/hamstersnore/homeconomy/database"
	"github.com/hamstersnore/homeconomy/models"
)

func CreateAccount(w http.ResponseWriter, r *http.Request) {
	var request models.CreateAccountRequest
	json.NewDecoder(r.Body).Decode(&request)
	db := database.OpenDb()
	db.QueryRow("INSERT INTO account (owner_id, alias) VALUES $1, $2", request.OwnerId, request.AccountAlias)
}

func GetAccounts(w http.ResponseWriter, r *http.Request) {

}
