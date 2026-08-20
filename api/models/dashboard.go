package models

type GetDashboardDataResponse struct {
	Balance          float32
	CategoryBalance  []CategoryBalance
	BalanceThisMonth float32
}

type CategoryBalance struct {
	CategoryId   int
	CategoryName string
	Balance      float32
}
