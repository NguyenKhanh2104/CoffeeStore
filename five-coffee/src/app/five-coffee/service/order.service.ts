import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable,map } from 'rxjs';
const API_URL = '';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  getBill(): Observable<any> {
    return this.http.get('http://localhost:8080/api/staff/lastOrder');
  }
  
}
