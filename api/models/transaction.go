package models

import "time"

type TransactionDto struct {
	Id            int
	AccountId     int
	UserId        int
	Concept       string
	Amount        float32
	ExecutionDate time.Time
	CategoryId    int
	BudgetId      *int
	CreatedAt     time.Time
	UpdatedAt     *time.Time
}

type CreateTransactionRequest struct {
	AccountId     int
	Amount        float32
	Concept       string
	CategoryId    int
	ExecutionDate time.Time
	BudgetId      *int
}

type CreateTransactionResponse struct {
	CreatedTransaction TransactionDto
}

type GetTransactionsResponse struct {
	Transactions []TransactionDto
}
