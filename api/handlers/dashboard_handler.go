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

func GetDashboardDataHandler(w http.ResponseWriter, r *http.Request) {
	userId := managers.GetClaims(r).Id

	db := database.OpenDb()
	queryResult, err := db.Query("SELECT * FROM transactions WHERE user_id = $1", userId)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}

	var dbTransactions []repositories.TransactionDb

	for queryResult.Next() {
		var tr repositories.TransactionDb
		err = queryResult.Scan(
			&tr.Id, &tr.AccountId, &tr.UserId, &tr.Concept,
			&tr.Amount, &tr.Type, &tr.ExecutionDate, &tr.CategoryId, &tr.BudgetId,
			&tr.CreatedAt, &tr.UpdatedAt)

		if err != nil {
			log.Println(err.Error())
		}

		dbTransactions = append(dbTransactions, tr)
	}

	var balance float32

	for _, tr := range dbTransactions {
		balance += getSignedAmount(tr)
	}

	categories := repositories.GetCategories()
	var categoriesBalance []models.CategoryBalance
	for _, c := range categories {
		categoriesBalance = append(categoriesBalance, models.CategoryBalance{
			CategoryId:   c.Id,
			CategoryName: c.Alias,
			Balance:      SumByCategoryId(dbTransactions, c.Id),
		})
	}

	json.NewEncoder(w).Encode(models.GetDashboardDataResponse{
		Balance:         balance,
		CategoryBalance: categoriesBalance,
	})
}

func SumByCategoryId(dbTransactions []repositories.TransactionDb, i int) float32 {
	var b float32
	for _, tr := range dbTransactions {
		if tr.CategoryId == i {
			b += getSignedAmount(tr)
		}
	}
	return b
}

func getSignedAmount(r repositories.TransactionDb) float32 {
	if r.Type == "expense" {
		return (-1) * r.Amount
	}
	return r.Amount
}
