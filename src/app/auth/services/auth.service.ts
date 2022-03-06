import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { User, UserloginRequest, UserRegisterReq } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(user: UserRegisterReq): any {
    return this.http.post<any>(environment.singUpApi, user);
  }

  loginUser(user: UserloginRequest): any {
    return this.http.post<any>(environment.singInApi, user);
  }

  loggedIn(): any {
    return !!localStorage.getItem('token');
  }

  // resetPasswordUser(email): any {
  //   return this.http.post<any>(environment., email);
  // }

  // getToken(): any {
  //   return localStorage.getItem('token');
  // }
  
}
