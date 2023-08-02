import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from '../Models/iorder';
import { environment } from 'src/Environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http={};
  constructor(private httpclient:HttpClient) {
    this.http={
      headers:new HttpHeaders(
        {
            'content-type': 'application/json'
        })
  }
}

  CreateOrder(newOrder:IOrder):Observable<IOrder>{
    return this.httpclient.post<IOrder>(`${environment.BaseApiUrl}/Order/CreateOrder`,
    JSON.stringify(newOrder),this.http);
  }
  GetAllOrdersByUserId(id:string):Observable<IOrder[]>{
    return this.httpclient.get<IOrder[]>(`${environment.BaseApiUrl}/Order/getOrdersByUserId?id=${id}`);
  }

  GetOrderById(id:number):Observable<IOrder>{
    return this.httpclient.get<IOrder>(`${environment.BaseApiUrl}/Order/getOrderById?id=${id}`);
  }

  DeleteOrder(id:number):Observable<IOrder>{
    return this.httpclient.delete<IOrder>(`${environment.BaseApiUrl}/Order/DeleteOrder/${id}`,this.http);
  }

  EditOrder(updatedOrder:IOrder,id:number):Observable<IOrder>{
    return this.httpclient.put<IOrder>(`${environment.BaseApiUrl}/Order/UpdateOrder/${id}`
    ,JSON.stringify(updatedOrder),this.http);
  }
}
