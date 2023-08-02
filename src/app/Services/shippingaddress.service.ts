import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icity } from '../Models/icity';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment.development';
import { Icountry } from '../Models/icountry';
import { Ishippingaddress } from '../Models/ishippingaddress';
import { Igetshippingaddress } from '../Models/igetshippingaddress';

@Injectable({
  providedIn: 'root'
})
export class ShippingaddressService {

  private http={};
  constructor(private httpclient:HttpClient) {
    this.http={
      headers:new HttpHeaders(
        {
            'content-type': 'application/json'
        })
  }
}
GetAllCitiesByCountryId(id:number):Observable<Icity[]>{
  return this.httpclient.get<Icity[]>(`${environment.BaseApiUrl}/ShippingAddress/AllCitiesByCountryId?id=${id}`);
}
GetAllCountries():Observable<Icountry[]>{
  return this.httpclient.get<Icountry[]>(`${environment.BaseApiUrl}/ShippingAddress/AllCountries`);
}
AddShippingAddress(ShippingAddress:Ishippingaddress):Observable<Ishippingaddress>{
  return this.httpclient.post<Ishippingaddress>(`${environment.BaseApiUrl}/ShippingAddress/CreateShippingAddress`,
  JSON.stringify(ShippingAddress),this.http);
}
GetShippingAddress(userid:string):Observable<Igetshippingaddress>{
  return this.httpclient.get<Igetshippingaddress>(`${environment.BaseApiUrl}/ShippingAddress/GetAddressByUserId?id=${userid}`);

}

}

