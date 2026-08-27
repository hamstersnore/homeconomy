import { inject, Injectable } from "@angular/core";
import { BaseService } from "../../../services/base.service";
import { TransactionDto, TransactionRequest, TransactionResponse, UpdateTransactionRequest, GetTransactionResponse } from "../models/transaction.model";
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

    updateTransaction(trId:number, request:UpdateTransactionRequest):Observable<any>{
        return this.baseService.post<UpdateTransactionRequest, any>('transactions/'+trId+'/update', request)
    }

    deleteTransaction(id:number):Observable<any>{
        return this.baseService.delete('transactions/' + id)
    }

    getTransactionById(id:number):Observable<GetTransactionResponse>{
        return this.baseService.get('transactions/' + id)
    }
}

export interface GetTransactionsResponse {
	Transactions:TransactionDto[]
}