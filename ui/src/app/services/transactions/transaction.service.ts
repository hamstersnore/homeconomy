import { inject, Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { TransactionRequest } from "./transaction.request";
import { TransactionResponse } from "./transaction.response";
import { TransactionDto } from "./transaction.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private baseService = inject(BaseService)
    
    getTransactions():Observable<GetTransactionsResponse>{
        return this.baseService.get<GetTransactionsResponse>('transactions')
    }

    createTransaction(request:TransactionRequest):Observable<TransactionResponse>{
        return this.baseService.post<TransactionRequest, TransactionResponse>('transactions', request)
    }

    updateTransaction(){

    }
}

export interface GetTransactionsResponse {
	Transactions:TransactionDto[]
}