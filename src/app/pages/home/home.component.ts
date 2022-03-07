import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/user';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLogin: boolean = false;
  user: User | null = null;
  
  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    debugger
    this.isLogin = this.authService.loggedIn();
    this.user = this.userService.getUser();
  }

}
