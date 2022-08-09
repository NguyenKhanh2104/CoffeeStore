import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:8080/api/admin/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public cartServiceEvent = new BehaviorSubject({});
  listUser :any = [];

  constructor(private http: HttpClient, private https:TokenStorageService) { 
    // this.getUserID(); 
  }
  getBooks(): Observable<any> {
    return this.http.get(API_URL + 'allBook');
  }
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user');
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getRemoveUser(userId:any){
    return this.http.delete(`${API_URL + "deleteUser"}/${userId}`).pipe(map((reponse:
      any) => {
        console.log("reponse:" + reponse);
        return reponse;
      }))
  }

  getAddUser(data: any): Observable<any>{
    let headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('accept', 'application/json');
    return this.http.post(API_URL + "addUser", data, {headers: headers}).pipe(map(
      (reponse: any) =>{
        return reponse;
      }
    ))
  
  }

  getAUser(id: any) :Observable<any> {
    return this.http.get(API_URL + 'findUserId/' + id);
  }
  getUpdateUser(data:any, userId: number){
    return this.http.put(`${API_URL +"updateUser"}/${userId}`, data).pipe(map(
      (reponse: any) =>{
        console.log("có update được ko")
        return reponse;
      }
    ))
  }
}

