import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../auth/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currenUserSubject: BehaviorSubject<User> = new BehaviorSubject({} as User);
  public readonly currentUser: Observable<User> = this.currenUserSubject.asObservable();

  constructor() {}


  setCurrentUser(currentUser: User): void {
    debugger
    this.currenUserSubject.next(currentUser);
  }
  // private user: User
  // constructor() { 
  //   this.user = new User(
  //     "",
  //     "",
  //     "",
  //     "",
  //   );
  // ;
  //  }

  // setUser(userResponse: User): void {
  //   this.user = new User(
  //     userResponse.name,
  //     userResponse.email,
  //     userResponse.role,
  //     userResponse.uuid,
  //   );
  // }

  // getUser(): User{
  //   return this.user;
  // }
}
