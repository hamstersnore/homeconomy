export interface GetDashboardDataResponse {
    Balance: Balance
    CategoryBalanceThisMonth: CategoryBalance[]
    BalanceThisMonth: Balance
}

export interface CategoryBalance {
    CategoryId: number
    CategoryName: string
    Balance: number
}

export interface Balance {
    Balance: number
    Expense: number
    Income: number
}