package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/hamstersnore/homeconomy/database"
	"github.com/hamstersnore/homeconomy/managers"
	"github.com/hamstersnore/homeconomy/models"
	"github.com/hamstersnore/homeconomy/repositories"
)

func SignUpHandler(w http.ResponseWriter, r *http.Request) {
	var request models.SignUpRequest
	json.NewDecoder(r.Body).Decode(&request)
	var id int32
	db := database.OpenDb()
	err := db.QueryRow("INSERT INTO users (username, hashed_pwd, created_at ) VALUES ($1, $2, current_timestamp) RETURNING id", &request.Username, string(managers.HashPassword(request.Password))).Scan(&id)
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
	var request models.SignInRequest
	json.NewDecoder(r.Body).Decode(&request)
	db := database.OpenDb()
	row := db.QueryRow("SELECT * FROM users WHERE username = $1", &request.Username)
	var dbUser repositories.UserDb
	err := row.Scan(&dbUser.Id, &dbUser.Username, &dbUser.Hashed_pwd, &dbUser.Created_at, &dbUser.Updated_at)
	if err != nil {
		log.Print(err.Error())
		w.WriteHeader(http.StatusBadRequest)
	}
	var token string
	if managers.CheckPassword(request.Password, dbUser.Hashed_pwd) {
		token = managers.GenerateJwt(dbUser.Id, dbUser.Username)
	}
	json.NewEncoder(w).Encode(models.SignInResponse{
		AuthToken: token,
	})
}

func GetAuthenticatedUserHandler(w http.ResponseWriter, r *http.Request) {
	dbUser := repositories.GetUser(managers.GetClaims(r).Id)
	json.NewEncoder(w).Encode(models.GetAuthenticatedUserResponse{
		User: models.User{
			Id:        int32(dbUser.Id),
			Username:  dbUser.Username,
			CreatedAt: dbUser.Created_at,
		},
	})
}
