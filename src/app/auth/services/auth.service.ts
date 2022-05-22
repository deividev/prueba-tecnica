import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { User, UserloginRequest, UserloginResponse, UserRegisterReq } from '../models/user';
import { Router } from '@angular/router';
import { catchError, map, take } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currenUserSubject: BehaviorSubject<User> = new BehaviorSubject({} as User);

  role: string = "";
  constructor(private http: HttpClient, private router: Router) { 
  }

  getCurrentUser(): Observable<any> {
    return this.currenUserSubject.asObservable();
  }
  
  setCurrentUser(currentUser: User): void {
    this.currenUserSubject.next(currentUser);
  }

  getRole(): string {
   //this.role = this.currenUserSubject.getValue().role;
    return "";
  }

  postChangeRole(): Observable<any> {
    const urlChangeRoleUser = environment.changeRoleApi + this.currenUserSubject.value.uuid;
    return this.http.post<any>(urlChangeRoleUser, {}).pipe(
      take(1),
      map((res: UserloginResponse) => {
        if (res?.user) {
          this.setCurrentUser(res.user);
        }
        return res?.user;
      }),
      catchError((err) => {return err})
    );
  }

  checkAdmin(): boolean {
    this.role = this.getRole();
    return this.role === "ADMIN_ROLE" ? true : false;
  }

  registerUser(user: UserRegisterReq): Observable<any> {
    return this.http.post<UserRegisterReq>(environment.singUpApi, user).pipe(
      take(1),
      catchError((err) => {
        return err.error.error})
    );
  }

  loginUser(user: UserloginRequest): Observable<any> {
    return this.http.post<any>(environment.singInApi, user).pipe(
      take(1),
      map((res: UserloginResponse) => {
        debugger
        if (res?.token) {
          debugger
          //this.setCurrentUser(res.user);
          this.addToken(res.token); 
        }
        return res?.user;
      }),
      catchError((err) => {return err.error.error})
    );
  }

  loggedIn(): boolean {
    let isLogin = localStorage.getItem('token') ? true : false;
    return isLogin;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.redirectToSingIn();
  }

  cleanCurrentUser(): void {
    this.currenUserSubject.complete();
  }

  public getToken(): String | null {
    return localStorage.getItem('token');
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

  redirectToSingIn(): void {
    this.router.navigate(['auth/signin']);
  }
  
}
