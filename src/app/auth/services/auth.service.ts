import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { User, UserloginRequest, UserRegisterReq } from '../models/user';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: UserRegisterReq): any {
    return this.http.post<any>(environment.singUpApi, user).pipe(
      take(1)
    );
  }

  loginUser(user: UserloginRequest): any {
    return this.http.post<any>(environment.singInApi, user).pipe(
      take(1)
    );
  }

  loggedIn(): any {
    return !!localStorage.getItem('token');
  }

  // resetPasswordUser(email): any {
  //   return this.http.post<any>(environment., email);
  // }

  getToken(): any {
    return localStorage.getItem('token');
  }

  redirectToHome(): void {
    this.router.navigate(['home']);
  }
  
}
