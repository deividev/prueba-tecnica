import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { NewsService } from './shared/services/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'news-aratech';

  isLogin: boolean = false;
  user: Observable<any> = new Observable();
  isDashboard: boolean = false;
  isAdmin: boolean = false;
  constructor(private authService: AuthService, 
    private newsService: NewsService, 
    private router: Router,  
    private activatedRoute: ActivatedRoute) {
    this.authService.removeToken();
    this.router.events.subscribe((res: any )=> {
      debugger
      this.isLogin = this.authService.loggedIn();
    })
  }

  ngOnInit() {
    debugger
    this.isLogin = this.authService.loggedIn();
    this.authService.getCurrentUser().subscribe(res => {
      this.user = res;
      this.isAdmin = this.authService.checkAdmin();

    });
  }

  ngOnChanges(changes: SimpleChanges) {
    debugger
    this.isLogin = this.authService.loggedIn();
  }

  setViewDashboard($event: boolean): void {
    debugger
    this.isDashboard = $event;
    this.newsService.setViewDashboard(this.isDashboard);
  }
}
