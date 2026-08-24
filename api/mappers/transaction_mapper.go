package mappers

import (
	"github.com/hamstersnore/homeconomy/models"
	"github.com/hamstersnore/homeconomy/repositories"
)

func ToTransactionDto(db repositories.TransactionDb) models.TransactionDto {
	return models.TransactionDto{
		Id:            db.Id,
		AccountId:     db.AccountId,
		UserId:        db.UserId,
		Concept:       db.Concept,
		Amount:        db.Amount,
		Type:          db.Type,
		ExecutionDate: db.ExecutionDate,
		CategoryId:    db.CategoryId,
		BudgetId:      db.BudgetId,
		CreatedAt:     db.CreatedAt,
		UpdatedAt:     db.UpdatedAt,
	}
}
