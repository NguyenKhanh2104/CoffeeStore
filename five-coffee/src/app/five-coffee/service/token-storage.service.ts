import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs'
import { map, filter, scan,catchError,tap } from 'rxjs/operators';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  url = "http://localhost:8080/";
  userid!: string;
  constructor(private http: HttpClient) { }

  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any {
    return localStorage.getItem(TOKEN_KEY);
  }
  postRequestWithToken(url:string,param:any){
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':'Bearer '+this.getToken()
      })
    };
    const user = this.getUser(); 
    this.userid = user.id;
    param['userId'] = this.userid;
    return this.http.post(this.url+url,param,httpOptionsWithToken)
    .pipe(
      // catchError(this.handleError.bind) // then handle the error
    );
  }
  
  public saveUser(user:any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(localStorage.getItem(USER_KEY)||'{}');
  }
  // public  handleError(error: any) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //    return  throwError(() => new Error('Something went wrong..while connecting with server'))
  //   }
  // }
}
