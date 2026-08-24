import { inject, Injectable } from "@angular/core";
import { BaseService } from "../../../services/base.service";
import { GetDashboardDataResponse } from "../models/dashboard.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private baseService = inject(BaseService)

    getDate():Observable<GetDashboardDataResponse>{
        return this.baseService.get<GetDashboardDataResponse>('dashboard/data')
    }
}