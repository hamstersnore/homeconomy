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
		tr := scanTransactionFromRows(queryResult)
		trs = append(trs, tr)
	}
	return trs
}

func scanTransactionFromRows(rows *sql.Rows) TransactionDb {
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

func scanTransactionFromRow(rows *sql.Row) TransactionDb {
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

func GetTransactionById(userId int, trId int) TransactionDb {
	db := database.OpenDb()
	queryResult := db.QueryRow("SELECT * FROM transactions WHERE user_id = $1 AND id = $2", userId, trId)
	if queryResult.Err() != nil {
		log.Println(queryResult.Err().Error())
	}
	return scanTransactionFromRow(queryResult)
}

func UpdateTransaction(t TransactionDb) (*TransactionDb, error) {
	now := time.Now()
	db := database.OpenDb()
	queryResult := db.QueryRow(`UPDATE transactions SET 
	account_id = $1, concept = $2, amount = $3, type = $4, execution_date = $5, 
	category_id = $6, budget_id = $7, updated_at = $8 
	WHERE id = $9 AND user_id = $10;`,
		t.AccountId, t.Concept, t.Amount, t.Type, t.ExecutionDate, t.CategoryId,
		t.BudgetId, now, t.Id, t.UserId)
	if queryResult.Err() != nil {
		log.Println(queryResult.Err().Error())
		return nil, queryResult.Err()
	}
	t.UpdatedAt = &now
	return &t, nil
}
