export interface TransactionDto {
    Id:number
    Concept:string
    AccountId:number
    CategoryId:number
    Amount:number
    Type:string
    ExecutionDate:Date
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

