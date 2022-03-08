import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { News } from 'src/app/shared/models/news';
import { NewsService } from 'src/app/shared/services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLogin: boolean = false;
  user: Observable<any> = new Observable();
  isDashboard: boolean = false;
  listNews: News[] = [];
  listNews$!: Observable<News[]>;
  constructor(private authService: AuthService, private newsService: NewsService) { }

  ngOnInit(): void {
    this.isLogin = this.authService.loggedIn();
    this.authService.getCurrentUser().subscribe(res => {
      this.user = res;
    });
    this.getListNews()
    this.getListNewsObservable();
  }

  setViewDashboard($event: boolean): void {
    this.isDashboard = $event;
    this.newsService.setViewDashboard(this.isDashboard);
  }

  getListNewsObservable(): void {
    this.listNews$ = this.newsService.getListNews$();
    this.listNews$.subscribe(news => {
      this.listNews = news;
    });
  }

  getListNews(): void {
    this.newsService.getListNews().subscribe(res=> {
    })
  }

}
