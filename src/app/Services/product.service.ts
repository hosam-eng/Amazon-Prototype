import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/Environments/environment.development';
import { Observable } from 'rxjs';
import { PriceVM } from '../ViewModel/price-vm';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http={};
  constructor(private httpclient:HttpClient) {
    this.http={
      headers:new HttpHeaders(
        {
            'content-type': 'application/json',
            'accept-language':sessionStorage.getItem('lang')||'en'
        })
  }
}
  GetAllProducts():Observable<IProduct[]>{
    return this.httpclient.get<IProduct[]>(`${environment.BaseApiUrl}/Product/AllProducts`,this.http);
  }
  GetProductsPaginated(pagenumber:number,items:number):Observable<IProduct[]>{
    return this.httpclient.get<IProduct[]>(`${environment.BaseApiUrl}/Product/ProductsPagination?pagenumber=${pagenumber}&items=${items}`,this.http);
  }
  GetProductById(id:number):Observable<IProduct>{
    return this.httpclient.get<IProduct>(`${environment.BaseApiUrl}/Product/GetProdById?id=${id}`,this.http);
  }
  GetProductByCategoryId(id:number):Observable<IProduct[]>{
    return this.httpclient.get<IProduct[]>(`${environment.BaseApiUrl}/Product/GetProductsByCategory?categoryid=${id}`,this.http);
  }
  GetProductsbyPrice(catid:number,min:number,max:number):Observable<IProduct[]>{
    return this.httpclient.get<IProduct[]>(`${environment.BaseApiUrl}/Product/FillterByPrice?catid=${catid}&minprice=${min}&maxprice=${max}`,this.http);
  }

  GetProductsbyPriceMax(catid:number,max:number):Observable<IProduct[]>{
    return this.httpclient.get<IProduct[]>(`${environment.BaseApiUrl}/Product/FillterByPriceMax?catid=${catid}&maxprice=${max}`,this.http);
  }

  GetProductsByName(name:string):Observable<IProduct[]>{
    return this.httpclient.get<IProduct[]>(`${environment.BaseApiUrl}/Product/SerchByName?name=${name}`,this.http);
  }
}
