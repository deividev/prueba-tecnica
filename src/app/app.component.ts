import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'news-aratech';

  constructor(private authService: AuthService) {
    //this.authService.removeToken();
  }

  ngOnInit() {
  }
}
