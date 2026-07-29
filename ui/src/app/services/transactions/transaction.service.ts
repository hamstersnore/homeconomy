import { inject, Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { TransactionRequest } from "./transaction.request";
import { TransactionResponse } from "./transaction.response";
import { TransactionDto } from "./transaction.model";

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private baseService = inject(BaseService)
    
    getTransactions():TransactionDto[]{
        return this.baseService.get<TransactionDto[]>('transactions')
    }

    createTransaction(request:TransactionRequest):TransactionResponse{
        return this.baseService.post<TransactionRequest, TransactionResponse>('/transactions', request)
    }

    updateTransaction(){

    }
}