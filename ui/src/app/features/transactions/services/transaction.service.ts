import { inject, Injectable } from "@angular/core";
import { BaseService } from "../../../services/base.service";
import { TransactionDto, TransactionRequest, TransactionResponse } from "../models/transaction.model";
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