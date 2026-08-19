export interface GetDashboardDataResponse {
    Balance: number
    CategoryBalance: CategoryBalance[]
}

export interface CategoryBalance {
    CategoryId: number
    CategoryName: string
    Balance: number
}