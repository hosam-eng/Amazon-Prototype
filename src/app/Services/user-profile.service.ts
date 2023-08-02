import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserProfile } from '../Models/iuser-profile';
import { environment } from 'src/Environments/environment.development';
import { Observable } from 'rxjs';
import { IChangePassword } from '../Models/ichange-password';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private http={};
  constructor(private httpClient:HttpClient) {
    this.http={
      headers:new HttpHeaders(
        {
            'content-type': 'application/json'
        })
  }
}

   getUserById(id:string): Observable<IUserProfile> {
    return this.httpClient.get<IUserProfile>(`${environment.BaseApiUrl}/User/getUserById?id=${id}`,this.http)
   }

   updateUser(id:string , user:IUserProfile):Observable<IUserProfile> {
     return this.httpClient.put<IUserProfile>(`${environment.BaseApiUrl}/User/updateUser?id=${id}`,
     JSON.stringify(user), this.http);
   }
   ChangePassword(changePassword:IChangePassword):Observable<IChangePassword> {
    return this.httpClient.post<IChangePassword>(`${environment.BaseApiUrl}/User/changePassword`,
    JSON.stringify(changePassword) ,this.http);
  }

}
