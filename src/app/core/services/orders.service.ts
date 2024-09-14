import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
myHeaders:any={token: localStorage.getItem('userToken')}
  constructor(private  _HttpClient :HttpClient) { }

  checkOut(cartId:string | null, shippingDetails:object):Observable<any>{
  return  this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
    {
      "shippingAddress":shippingDetails
    },
    {
      headers:this.myHeaders
    }
  )
  }
}
