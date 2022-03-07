import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { AuthResponse, User, UserloginRequest, UserloginResponse, UserRegisterReq } from '../models/user';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: UserRegisterReq): Observable<any> {
    return this.http.post<any>(environment.singUpApi, user).pipe(
      take(1)
    );
  }

  loginUser(user: UserloginRequest): Observable<UserloginResponse> {
    return this.http.post<any>(environment.singInApi, user).pipe(
      take(1)
    );
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // resetPasswordUser(email): any {
  //   return this.http.post<any>(environment., email);
  // }

  


  public getToken(): any {
    return localStorage.getItem('token');
  }

  public removeToken(): void {
    localStorage.removeItem('token');
  }

  redirectToHome(): void {
    this.router.navigate(['home']);
  }
  
}
