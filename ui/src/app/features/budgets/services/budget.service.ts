import { inject, Injectable } from "@angular/core";
import { BaseService } from "../../../services/base.service";
import { Observable } from "rxjs";
import { CreateBudgetRequest, CreateBudgetResponse, GetAllBudgetsResponse } from "../models/budget.model";

@Injectable({
    providedIn: 'root'
})
export class BudgetService {
    baseService = inject(BaseService)

    readonly URL_BUDGET_CREATE = "budgets"
    readonly URL_BUDGET_GET_ALL = "budgets"
    
    CreateBudget(request:CreateBudgetRequest):Observable<CreateBudgetResponse>{
        return this.baseService.post(this.URL_BUDGET_CREATE, request)
    }

    GetBudgets():Observable<GetAllBudgetsResponse>{
        return this.baseService.get(this.URL_BUDGET_GET_ALL)
    }
}