import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { AuthService } from "../features/sign-in/services/auth-service";

export interface BaseApiResponse {
    IsError:boolean
    ErrorMessage:string
}

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    private http = inject(HttpClient)
    private authService = inject(AuthService)

    private basePath = environment.apiBaseUrl

    post<TRequest,TResponse>(url:string, body:TRequest):Observable<TResponse>{
        return this.http.post<TResponse>(
            this.basePath + url,
            body,
            {
                headers: this.buildHeaders()
            }
        )
    }

    get<TResponse>(url:string):Observable<TResponse>{
        url = this.basePath + url
        return this.http.get<TResponse>(
            url,
            {
                headers: this.buildHeaders()
                
            }
        )
    }

    delete(url:string):Observable<any>{
        url = this.basePath + url
        return this.http.delete(
            url,
            {
                headers: this.buildHeaders() 
            }
        )
    }

    private buildHeaders():HttpHeaders{
        return new HttpHeaders({
                    "Authorization": this.authService.getToken()
                })
    }
}