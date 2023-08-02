import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRating } from '../Models/irating';
import { environment } from 'src/Environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductRatingService {

  private http={};
  constructor(private httpclient:HttpClient) {
    this.http={
      headers:new HttpHeaders(
        {
            'content-type': 'application/json'
        })
  }
}
  AddRate(newRate:IRating):Observable<IRating>{
    return this.httpclient.post<IRating>(`${environment.BaseApiUrl}/rating/addRate`,
    JSON.stringify(newRate),this.http);
  }
  GetRatingByProductId(id:number):Observable<IRating[]>{
    return this.httpclient.get<IRating[]>(`${environment.BaseApiUrl}/rating/getAllReviews?productId=${id}`);
  }

  CalculateProductRating(id:number):Observable<any>{
    return this.httpclient.get<any>(`${environment.BaseApiUrl}/rating/calculateProductRate?productId=${id}`);
  }
}
