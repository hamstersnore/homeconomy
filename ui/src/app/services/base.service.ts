import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { AuthService } from "./auth/auth-service";

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    private http = inject(HttpClient)
    private authService = inject(AuthService)

    private basePath = environment.apiBaseUrl

    post<TRequest,TResponse>(url:string, body:TRequest):TResponse{
        this.http.post<TResponse>(
            this.basePath + url,
            body,
            {
                headers: new HttpHeaders({"Authorization": 'Bearer ' + this.authService.getToken()})
            }
        )
        .subscribe({
            next: (response) => {
                return response
            },
            error: (errorResult) => {
                throw new Error("Error sending request")
            }
        })

        throw new Error("Error [POST]")
    }

    get<TResponse>(url:string):TResponse{

        url = this.basePath + url

        console.log('Sending to ', url)
        
        this.http.get<TResponse>(
            url,
            {
                headers: new HttpHeaders({
                    "Authorization": "Bearer " + this.authService.getToken()})
                
            }
        ).subscribe(
            {
                next: (response) => {
                    return response
                },
                error: (error) => {
                    console.log(error)
                    throw new Error("Error sending request to " + url)
                }
            }
        )

        throw new Error("Error sending request to " + url)

    }
}