import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { NewsService } from './shared/services/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'news-aratech';

  isLogin: boolean = false;
  user: Observable<any> = new Observable();
  isDashboard: boolean = false;
  isAdmin: boolean = false;
  constructor(private authService: AuthService, 
    private newsService: NewsService, 
    private router: Router,  
  ) {
    this.authService.removeToken();
    this.router.events.subscribe((res: any )=> {
      this.isLogin = this.authService.loggedIn();
    })
  }

  ngOnInit() {
    this.isLogin = this.authService.loggedIn();
    this.authService.getCurrentUser().subscribe(res => {
      this.user = res;
      this.isAdmin = this.authService.checkAdmin();
    });
  }

  setViewDashboard($event: boolean): void {
    this.isDashboard = $event;
    this.newsService.setViewDashboard(this.isDashboard);
  }
}
