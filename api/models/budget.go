package models

import "time"

type BudgetDto struct {
	Id        int
	CreatorId int
	Alias     string
	CreatedAt time.Time
	UpdateAt  *time.Time
}

type CreateBudgetRequest struct {
	Alias string
}

type CreateBudgetResponse struct {
	NewBudget BudgetDto
}

type GetBudgetsResponse struct {
	Budgets []BudgetDto
}
