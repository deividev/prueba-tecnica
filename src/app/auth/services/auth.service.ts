import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { AuthResponse, User, UserloginRequest, UserloginResponse, UserRegisterReq, UserStorage } from '../models/user';
import { Router } from '@angular/router';
import { catchError, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: UserRegisterReq): Observable<any> {
    return this.http.post<UserRegisterReq>(environment.singUpApi, user).pipe(
      take(1),
    );
  }

  loginUser(user: UserloginRequest): Observable<any> {
    return this.http.post<any>(environment.singInApi, user).pipe(
      take(1),
      map((res: UserloginResponse) => {
        debugger
        this.saveLocalStorage(res.user);
        this.addToken(res.token)
        return user;
      }),
      catchError((err) => {return err})
    );
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // resetPasswordUser(email): any {
  //   return this.http.post<any>(environment., email);
  // }

  


  public getToken(): String | null {
    return localStorage.getItem('token');
  }

  public getUser(): String  {
    let userStorage: any = localStorage.getItem('user') !== null ? localStorage.getItem('user') : "";
    debugger
    return JSON.parse(userStorage);
  }

  private saveLocalStorage(resUser: UserStorage): void {
    const userStorage: UserStorage = {name: resUser.name, role: resUser.role}
    localStorage.setItem('user', JSON.stringify(userStorage));
  }

  public addToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public removeToken(): void {
    localStorage.removeItem('token');
  }

  redirectToHome(): void {
    this.router.navigate(['home']);
  }
  
}
