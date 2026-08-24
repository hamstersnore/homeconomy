package repositories

import (
	"database/sql"
	"log"
	"time"

	"github.com/hamstersnore/homeconomy/database"
)

func GetTransactionsByUserAndMonth(userId int, month time.Month) []TransactionDb {
	var trs []TransactionDb

	db := database.OpenDb()
	query := "SELECT * FROM transactions WHERE user_id = $1 AND (SELECT EXTRACT(MONTH from execution_date) = $2);"
	queryResult, err := db.Query(query, userId, month)
	if err != nil {
		log.Print(err.Error())
		return trs
	}
	for queryResult.Next() {
		tr := scanTransaction(queryResult)
		trs = append(trs, tr)
	}
	return trs
}

func scanTransaction(rows *sql.Rows) TransactionDb {
	t := TransactionDb{}
	err := rows.Scan(
		&t.Id,
		&t.AccountId,
		&t.UserId,
		&t.Concept,
		&t.Amount,
		&t.Type,
		&t.ExecutionDate,
		&t.CategoryId,
		&t.BudgetId,
		&t.CreatedAt,
		&t.UpdatedAt,
	)
	if err != nil {
		log.Print(err.Error())
	}
	return t
}
