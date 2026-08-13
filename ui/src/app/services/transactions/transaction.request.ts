export interface TransactionRequest {
    AccountId:number
    BudgetId:number | null
    Amount:number
    Concept:string
    CategoryId:number
    ExecutionDate:Date
}