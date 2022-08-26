import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map, mergeMap } from 'rxjs';
import { AddProductAdminComponent } from '../component/admin/product/add-product-admin/add-product-admin.component';
const API_URL = 'http://localhost:8080/api/staff/';
const API_URL2 = 'http://localhost:8080/api/admin/';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  dataObject:any;
  constructor(private http:HttpClient) { }
  
  getFiles(): Observable<any> {
    return this.http.get(API_URL2 + 'files');
  }
  getProducts(): Observable<any> {
    return this.http.get(API_URL + 'allProduct');
  }
  getAProduct(id: any) :Observable<any> {
    return this.http.get(API_URL + 'find/' + id);
  }
  removeAProduct(productId:any){
    return this.http.delete(`${API_URL2 + "removeProduct"}/${productId}`).pipe(map((reponse:
      any) => {
        console.log("reponse:" + reponse);
        return reponse;
      }))
  }
  getUpdateProduct(data:any, productId: number){
    return this.http.put(`${API_URL2 +"updateProduct"}/${productId}`, data).pipe(map(
      (reponse: any) =>{
        console.log("có update được ko")
        return reponse;
      }
    ))
  }

  getAddProduct(data:any): Observable<any>{
    let headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('accept', 'application/json');
    this.dataObject = data;
    return this.http.post(API_URL2 + "addProduct", data, {headers: headers}).pipe(map(
      (reponse: any) =>{
        return reponse;
      }
    ))
  
  }
  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    return this.http.post(API_URL2 + 'upload',formData,{
      reportProgress: true,
      responseType: 'json'
    })
  }
}

    // const req = new HttpRequest('POST', `${API_URL2}/upload`, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });
    // const r = this.http.post(API_URL2 + 'upload',formData)
    // return this.http.request(req);