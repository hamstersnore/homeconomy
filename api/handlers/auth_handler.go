package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/hamstersnore/homeconomy/database"
	models "github.com/hamstersnore/homeconomy/models/auth"
)

func SignUpHandler(w http.ResponseWriter, r *http.Request) {
	var request models.SignUpRequest
	json.NewDecoder(r.Body).Decode(&request)
	var id int32
	db := database.OpenDb()
	err := db.QueryRow("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id", &request.Username, &request.Password).Scan(&id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
	} else {
		json.NewEncoder(w).Encode(models.User{
			Id:       id,
			Username: request.Username,
		})
	}
}

func SignInHandler(w http.ResponseWriter, r *http.Request) {

}
