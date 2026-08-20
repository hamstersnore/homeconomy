export interface GetDashboardDataResponse {
    Balance: number
    CategoryBalance: CategoryBalance[]
    BalanceThisMonth: number
}

export interface CategoryBalance {
    CategoryId: number
    CategoryName: string
    Balance: number
}