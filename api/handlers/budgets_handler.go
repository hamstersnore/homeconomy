package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/hamstersnore/homeconomy/database"
	"github.com/hamstersnore/homeconomy/managers"
	"github.com/hamstersnore/homeconomy/models"
)

func CreateBudgetHandler(w http.ResponseWriter, r *http.Request) {
	var request models.CreateBudgetRequest
	json.NewDecoder(r.Body).Decode(&request)
	var newBudgetId int
	ownerId := managers.GetClaims(r).Id
	now := time.Now()
	db := database.OpenDb()
	err := db.QueryRow("INSERT INTO budgets (creator_id, alias, created_at) VALUES ($1, $2, $3) RETURNING id", ownerId, request.Alias, now).
		Scan(&newBudgetId)
	if err != nil {
		log.Printf("Error creating budget -> %s", err.Error())
	}
	json.NewEncoder(w).Encode(models.CreateBudgetResponse{
		NewBudget: models.BudgetDto{
			Id:        newBudgetId,
			CreatorId: ownerId,
			Alias:     request.Alias,
			CreatedAt: now,
			UpdateAt:  nil,
		},
	})

}
