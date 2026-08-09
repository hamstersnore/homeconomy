import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { AuthService } from "./auth/auth-service";
import { Observable } from "rxjs";

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
                headers: new HttpHeaders({"Authorization": this.authService.getToken()})
            }
        )
    }

    get<TResponse>(url:string):Observable<TResponse>{
        url = this.basePath + url
        console.log('Sending to ', url)
        return this.http.get<TResponse>(
            url,
            {
                headers: new HttpHeaders({
                    "Authorization": this.authService.getToken()})
                
            }
        )
    }
}