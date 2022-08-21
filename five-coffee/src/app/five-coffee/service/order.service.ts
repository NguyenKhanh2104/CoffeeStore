import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable,map } from 'rxjs';
const API_URL = 'http://localhost:8080/api/staff/';
const API_URL2 = 'http://localhost:8080/api/admin/';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  getBill(): Observable<any> {
    return this.http.get(API_URL + 'lastOrder');
  }
  getBillItem(): Observable<any> {
    return this.http.get(API_URL + 'lastOrderItem');
  }
  get(): Observable<any> {
    return this.http.get( API_URL+ 'lastOrder');
  }
  getAllOrder(): Observable<any> {
    return this.http.get(API_URL2 + 'allOrder');
  }
  getUpdateProduct(data:any, orderId: any){
    return this.http.put(`${API_URL2 +"updateOrder"}/${orderId}`, data).pipe(map(
      (reponse: any) =>{
        console.log("có update được ko")
        return reponse;
      }
    ))
  }
  removeAOrder(orderId:any){
    return this.http.delete(`${API_URL2 + "removeOrder"}/${orderId}`).pipe(map((reponse:
      any) => {
        console.log("reponse:" + reponse);
        return reponse;
      }))
  }
  getOrderItem(orderItemId:any){
    return this.http.get(`${API_URL2 + "getOrderItem"}/${orderItemId}`).pipe(map((reponse:
      any) => {
        console.log("reponse:" + reponse);
        return reponse;
      }))
  }
}
