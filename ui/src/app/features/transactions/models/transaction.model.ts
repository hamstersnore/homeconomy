export interface TransactionDto {
    Id:number
    Concept:string
    AccountId:number
    CategoryId:number
    Amount:number
    Type:string
    ExecutionDate:Date
    BudgetId:number|null
}

export interface TransactionRequest {
    AccountId:number
    BudgetId:number | null
    Amount:number
    Type:string
    Concept:string
    CategoryId:number
    ExecutionDate:Date
}

export interface TransactionResponse {
    Id:number
}

export interface UpdateTransactionRequest {
    AccountId:number
    BudgetId:number | null
    Amount:number
    Type:string
    Concept:string
    CategoryId:number
    ExecutionDate:Date
}

export interface GetTransactionResponse {
    Transaction: TransactionDto
}

