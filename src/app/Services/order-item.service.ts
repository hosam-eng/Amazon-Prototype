import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrderItem } from '../Models/iorder-item';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
  private http={};
  constructor(private httpclient:HttpClient) {
    this.http={
      headers:new HttpHeaders(
        {
            'content-type': 'application/json'
        })
  }
}
  addOrderItem(OrderItem:IOrderItem):Observable<IOrderItem>{
    return this.httpclient.post<IOrderItem>(`${environment.BaseApiUrl}/OrderItem/CreateItem`,
    JSON.stringify(OrderItem),this.http);
  }
  GetAllOrderItemsByOrderId(id:number):Observable<IOrderItem[]>{
    return this.httpclient.get<IOrderItem[]>(`${environment.BaseApiUrl}/OrderItem/AllItemsByOrderId=${id}`);
  }



  DeleteOrderItem(id:number):Observable<IOrderItem>{
    return this.httpclient.delete<IOrderItem>(`${environment.BaseApiUrl}/OrderItem/DeleteItem/${id}`,this.http);
  }

  EditOrderItem(OrderItem:IOrderItem,id:number):Observable<IOrderItem>{
    return this.httpclient.put<IOrderItem>(`${environment.BaseApiUrl}/OrderItem/UpdateItem/${id}`
    ,JSON.stringify(OrderItem),this.http);
  }
}
