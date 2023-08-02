import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserLogin } from '../Models/iuser-login';
import { environment } from 'src/Environments/environment.development';
import { IUserRegister } from '../Models/iuser-register';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ITokenResponse } from '../Models/iresponse-token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedIn:BehaviorSubject<boolean>;
  private http={};
  constructor(private httpClient:HttpClient) {
    this.loggedIn=new BehaviorSubject<boolean>(this.isLoggedIn);
    this.http={
      headers:new HttpHeaders(
        {
            'content-type': 'application/json'
        })
  }
   }
   get isLoggedIn() {
    return (sessionStorage.getItem('token'))?true:false;
  }

   login(user: IUserLogin): Observable<ITokenResponse> {
    return this.httpClient.post<ITokenResponse>(
       environment.BaseApiUrl + "/Account/Login",
       JSON.stringify(user), this.http).pipe(
        tap(() => {
          this.loggedIn.next(this.isLoggedIn);          
        })
      );
   }
   Register(user:IUserRegister):Observable<IUserRegister> {
     return this.httpClient.post<IUserRegister>(environment.BaseApiUrl + "/Account/Register",
     JSON.stringify(user), this.http);
   }
   LogOut() {
     return this.httpClient.get(environment.BaseApiUrl + "/Account/LogOut").pipe(
      tap(() => {
        this.loggedIn.next(this.isLoggedIn);
      })
    );
   }
}
