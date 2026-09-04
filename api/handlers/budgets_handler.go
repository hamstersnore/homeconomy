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

func GetBudgetsHandler(w http.ResponseWriter, r *http.Request) {
	db := database.OpenDb()
	queryResult, err := db.Query("SELECT b.id, b.alias FROM budgets AS b JOIN budget_members AS bm ON b.id = bm.budget_id WHERE bm.user_id = $1;", managers.GetClaims(r).Id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}
	var budgets []models.BudgetDto
	for queryResult.Next() {
		b := models.BudgetDto{}
		queryResult.Scan(&b.Id, &b.Alias)
		budgets = append(budgets, b)
	}
	json.NewEncoder(w).Encode(models.GetBudgetsResponse{
		Budgets: budgets,
	})
}
