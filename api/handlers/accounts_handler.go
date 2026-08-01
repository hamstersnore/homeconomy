package handlers

import (
	"net/http"

	"github.com/hamstersnore/homeconomy/database"
)

func CreateAccount(w http.ResponseWriter, r *http.Request) {
	db := database.OpenDb()
	db.QueryRow("")
}

func GetAccounts(w http.ResponseWriter, r *http.Request) {

}
