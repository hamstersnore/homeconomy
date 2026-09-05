export interface BudgetDto {
    Id: number
    Alias: string
    OwnerId: number
    CreatedAt: Date
    UpdatedAt: Date | null
}

export interface GetAllBudgetsResponse{
    Budgets: BudgetDto[]
}

export interface CreateBudgetRequest {
    Alias: string
}

export interface CreateBudgetResponse {
    BudgetCreated: BudgetDto
}