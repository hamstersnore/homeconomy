import { inject, Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { TransactionRequest } from "./transaction.request";
import { TransactionResponse } from "./transaction.response";

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private baseService = inject(BaseService)
    
    getTransactions(){

    }

    createTransaction(request:TransactionRequest):TransactionResponse{
        return this.baseService.post<TransactionRequest, TransactionResponse>('/transactions', request)
    }

    updateTransaction(){

    }
}