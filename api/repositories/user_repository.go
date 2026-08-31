package repositories

import (
	"log"

	"github.com/hamstersnore/homeconomy/database"
)

func GetUser(id int) UserDb {
	db := database.OpenDb()
	queryResult := db.QueryRow("SELECT * FROM users WHERE id = $1;", id)
	if queryResult.Err() != nil {
		log.Println(queryResult.Err().Error())
	}
	var user UserDb
	err := queryResult.Scan(&user.Id, &user.Username, &user.Hashed_pwd, &user.Created_at, &user.Updated_at)
	if err != nil {
		log.Println(err.Error())
	}
	return user
}
