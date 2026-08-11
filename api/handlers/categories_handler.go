package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/hamstersnore/homeconomy/database"
	"github.com/hamstersnore/homeconomy/models"
)

func GetCategoriesHandler(w http.ResponseWriter, r *http.Request) {
	db := database.OpenDb()
	dbResult, err := db.Query("SELECT * FROM categories")
	if err != nil {
		log.Fatal(err)
	}
	var categories []models.Category
	for dbResult.Next() {
		var category models.Category
		dbResult.Scan(&category.Id, &category.Alias, &category.Description, &category.CreatedAt, &category.UpdatedAt)
		categories = append(categories, category)
	}
	json.NewEncoder(w).Encode(models.GetCategoriesResponse{
		Categories: categories,
	})
}

func CreateCategoryHandler(w http.ResponseWriter, r *http.Request) {
	var createRequest models.CreateCategoryRequest
	json.NewDecoder(r.Body).Decode(&createRequest)
	db := database.OpenDb()
	var newCategoryId int
	var creationTime time.Time
	err := db.QueryRow(
		"INSERT INTO categories (alias, description, created_at) VALUES ($1, $2, $3) RETURNING id, created_at",
		createRequest.Name,
		createRequest.Description,
		time.Now()).Scan(&newCategoryId, &creationTime)

	if err != nil {
		log.Print(err)
	}

	json.NewEncoder(w).Encode(models.CreateCategoryResponse{
		NewCategory: models.Category{
			Id:          newCategoryId,
			Alias:       createRequest.Name,
			Description: createRequest.Description,
			CreatedAt:   creationTime,
			UpdatedAt:   nil,
		},
	})
}
