package repositories

import (
	"log"

	"github.com/hamstersnore/homeconomy/database"
)

func GetCategories() []CategoryDb {
	db := database.OpenDb()
	queryResult, err := db.Query("SELECT * FROM categories")
	if err != nil {
		log.Println(err.Error())
	}
	var categoriesDb []CategoryDb
	for queryResult.Next() {
		var c CategoryDb
		err = queryResult.Scan(
			&c.Id,
			&c.Alias,
			&c.Description,
			&c.CreatedAt,
			&c.UpdatedAt)
		if err != nil {
			log.Println(err.Error())
		}
		categoriesDb = append(categoriesDb, c)
	}
	return categoriesDb
}
