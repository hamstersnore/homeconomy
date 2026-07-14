package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/hamstersnore/homeconomy/database"
)

type request struct {
	Amount        float32   `json:"amount"`
	ExecutionDate time.Time `json:"execution_date"`
}

type response struct {
	IsError bool `json:"isError"`
}

type transaction struct {
	Id            int32     `json:"id"`
	Amount        float32   `json:"amount"`
	ExecutionDate time.Time `json:"execution_date"`
}

func CreateTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	db := database.OpenDb()
	var req request
	json.NewDecoder(r.Body).Decode(&req)
	row := db.QueryRow("INSERT INTO transactions (amount, execution_timestamp) VALUES ($1, $2)", req.Amount, req.ExecutionDate)
	if row.Err() != nil {
		log.Fatal(row.Err().Error())
	}
	res := response{IsError: false}
	log.Printf("Sending response -> %+v", res)
	json.NewEncoder(w).Encode(res)
}

func GetTransactions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var transactions []transaction
	db := database.OpenDb()
	rows, err := db.Query("SELECT * FROM transactions")
	if err != nil {
		log.Printf("Error retrieving data %v", err)
	}
	for rows.Next() {
		var transaction transaction
		if err := rows.Scan(&transaction.Id, &transaction.Amount, &transaction.ExecutionDate); err != nil {
			return
		}
		transactions = append(transactions, transaction)
	}
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"error": "Error getting data"})
	}
	json.NewEncoder(w).Encode(transactions)
}
