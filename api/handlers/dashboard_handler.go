package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

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

	now := time.Now()

	var response models.GetDashboardDataResponse = models.GetDashboardDataResponse{
		Balance:          models.Balance{},
		CategoryBalance:  []models.CategoryBalance{},
		BalanceThisMonth: models.Balance{},
	}

	for _, tr := range dbTransactions {
		computeBalance(tr, &response.Balance)
		if tr.ExecutionDate.Month() == now.Month() {
			computeBalance(tr, &response.BalanceThisMonth)
		}
	}

	categories := repositories.GetCategories()

	for _, c := range categories {
		catBalance := SumByCategoryId(dbTransactions, c.Id)
		// Getting categories with expenses
		response.CategoryBalance = append(response.CategoryBalance, models.CategoryBalance{
			CategoryId:   c.Id,
			CategoryName: c.Alias,
			Balance:      catBalance,
		})
	}

	json.NewEncoder(w).Encode(response)
}

func SumByCategoryId(dbTransactions []repositories.TransactionDb, i int) float32 {
	var b float32
	for _, tr := range dbTransactions {
		if tr.CategoryId == i {
			b += tr.Amount
		}
	}
	return b
}

func computeBalance(tr repositories.TransactionDb, balance *models.Balance) {
	switch tr.Type {
	case "expense":
		balance.Expense += tr.Amount
		balance.Balance -= tr.Amount
	case "income":
		balance.Income += tr.Amount
		balance.Balance += tr.Amount
	}
}
