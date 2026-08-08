import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseApiResponse } from '../shared/base-api-response.model';
import { SignUpRequest } from './sign-up-request.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { SignInResponse } from './sign-in.response';

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

    var url:string = environment.apiBaseUrl + SIGN_UP_URL

    console.log('Sending to ', url)
    console.log('Is production:', environment.production)
    
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

  signIn(username:string, password:string):Observable<SignInResponse>{
    
    var url:string = environment.apiBaseUrl + SIGN_IN_URL

    return this.http.post<SignInResponse>(
      url, 
      {
        username:username,
        password:password
      });
  }
  
  getToken():string{
    var authToken = localStorage.getItem(this.AUTH_TOKEN_KEY)
    if (authToken === null){
      throw new Error('Auth token not found')
    }
    return authToken
  }

  setToken(token:string){
    localStorage.setItem(this.AUTH_TOKEN_KEY, token)
  }
}

