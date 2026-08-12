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

func CreateTransaction(w http.ResponseWriter, r *http.Request) {
	var request models.CreateTransactionRequest
	createdTransaction := models.TransactionDto{}

	json.NewDecoder(r.Body).Decode(&request)
	db := database.OpenDb()

	err := db.QueryRow(
		`INSERT INTO transactions 
		(account_id, user_id, concept, amount, execution_date, category_id, budget_id, created_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING id, created_at`,
		request.AccountId,
		managers.GetClaims(r).Id,
		request.Concept,
		request.Amount,
		request.ExecutionDate,
		request.CategoryId,
		request.BudgetId,
		time.Now()).Scan(&createdTransaction.Id, &createdTransaction.CreatedAt)

	if err != nil {
		log.Fatal(err)
	}

	createdTransaction.AccountId = request.AccountId
	createdTransaction.UserId = managers.GetClaims(r).Id
	createdTransaction.Concept = request.Concept
	createdTransaction.Amount = request.Amount
	createdTransaction.ExecutionDate = request.ExecutionDate
	createdTransaction.CategoryId = request.CategoryId
	createdTransaction.BudgetId = request.BudgetId

	log.Printf("Sending response -> %+v", createdTransaction)
	json.NewEncoder(w).Encode(models.CreateTransactionResponse{CreatedTransaction: createdTransaction})
}

func GetTransactions(w http.ResponseWriter, r *http.Request) {
	var transactions []models.TransactionDto
	db := database.OpenDb()
	rows, err := db.Query("SELECT * FROM transactions")
	if err != nil {
		log.Printf("Error retrieving data %v", err)
	}

	for rows.Next() {
		var t models.TransactionDto
		if err := rows.Scan(&t.Id, &t.AccountId, &t.UserId, &t.Concept, &t.Amount, &t.ExecutionDate, &t.CategoryId, &t.BudgetId, &t.CreatedAt, &t.UpdatedAt); err != nil {
			return
		}
		transactions = append(transactions, t)
	}

	json.NewEncoder(w).Encode(
		models.GetTransactionsResponse{
			Transactions: transactions,
		})
}
