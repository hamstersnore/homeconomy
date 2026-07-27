import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseApiResponse } from '../shared/base-api-response.model';
import { SignUpRequest } from './sign-up-request.model';
import { environment } from '../../../environments/environment.development';

const SIGN_UP_URL = "auth/sign-up";
const SIGN_IN_URL = "auth/sign-in";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly AUTH_TOKEN_KEY = 'homeconomy-authToken'

  private http = inject(HttpClient)

  signUp(username:string, password:string):boolean{
    
    var req:SignUpRequest = {
      Username: username,
      Password: password
    }

    this.http.post<BaseApiResponse>(environment.apiBaseUrl + SIGN_UP_URL, req)
    .subscribe({
      next: (response) => {
        return response.IsError
      },
      error: (error) => {
        console.log(error)
      }
    })

    return true;
  }
  
  getToken():string{
    var authToken = localStorage.getItem(this.AUTH_TOKEN_KEY)
    if (authToken === null){
      throw new Error('Auth token not found')
    }
    return authToken
  }
}

