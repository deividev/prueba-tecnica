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

  user: User; 
  role: string = "";
  constructor(private http: HttpClient, private router: Router) { 
    this.user = new User("", "", "", "" )
  }

  getCurrentUser(): Observable<any> {
    return this.currenUserSubject.asObservable();
  }
  
  setCurrentUser(currentUser: any): void {
    this.currenUserSubject.next(currentUser);
  }

  getRole(): string {
   this.role = this.currenUserSubject.getValue().role;
    return this.role;
  }

  checkAdmin(): boolean {
    return this.role === "ADMIN_ROLE" ? true : false;
  }

  registerUser(user: UserRegisterReq): Observable<any> {
    return this.http.post<UserRegisterReq>(environment.singUpApi, user).pipe(
      take(1),
    );
  }

  loginUser(user: UserloginRequest): Observable<any> {
    return this.http.post<any>(environment.singInApi, user).pipe(
      take(1),
      map((res: UserloginResponse) => {
        if (res?.user && res?.token) {
          this.setCurrentUser(res.user);
          this.addToken(res.token); 
        }
        return this.user;
      }),
      catchError((err) => {return err})
    );
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
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
  
}
