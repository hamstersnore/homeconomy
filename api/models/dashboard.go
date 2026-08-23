package models

type GetDashboardDataResponse struct {
	Balance                  Balance
	CategoryBalanceThisMonth []CategoryBalance
	BalanceThisMonth         Balance
}

type CategoryBalance struct {
	CategoryId   int
	CategoryName string
	Balance      float32
}

type Balance struct {
	Balance float32
	Income  float32
	Expense float32
}
