import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _HttpClient :HttpClient) { }

  getBrands():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands`)
  }
}
