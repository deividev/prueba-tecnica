import { Injectable } from '@angular/core';
import { User } from '../../auth/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User
  constructor() { 
    this.user = new User(
      "",
      "",
      "",
      "",
      ""
    );
  ;
   }

  setUser(userResponse: User, tokenResponse: string): void {
    this.user = new User(
      userResponse.name,
      userResponse.email,
      userResponse.role,
      userResponse.uuid,
      tokenResponse
    );
  }

  getUser(): User{
    return this.user;
  }
}
