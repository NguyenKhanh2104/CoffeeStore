import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
const API_URL = 'http://localhost:8080/api/staff/';
const API_URL2 = 'http://localhost:8080/api/admin/';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  getProducts(): Observable<any> {
    return this.http.get(API_URL + 'allProduct');
  }
  getAProduct(id: any) :Observable<any> {
    return this.http.get(API_URL + 'find/' + id);
  }
  removeAProduct(productId:any){
    return this.http.delete(`${API_URL + "removeProduct"}/${productId}`).pipe(map((reponse:
      any) => {
        console.log("reponse:" + reponse);
        return reponse;
      }))
  }
  getUpdateProduct(data:any, productId: number){
    return this.http.put(`${API_URL +"updateProduct"}/${productId}`, data).pipe(map(
      (reponse: any) =>{
        console.log("có update được ko")
        return reponse;
      }
    ))
  }

  getAddProduct(data: any): Observable<any>{
    let headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('accept', 'application/json');
    return this.http.post(API_URL + "addProduct", data, {headers: headers}).pipe(map(
      (reponse: any) =>{
        return reponse;
      }
    ))
  
  }
}
