import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLogin: boolean = false;
  user: Observable<any> = new Observable();
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLogin = this.authService.loggedIn();
    this.authService.getCurrentUser().subscribe(res => {
      this.user = res;
    });
  }

}
