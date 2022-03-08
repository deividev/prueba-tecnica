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


  listNews: News[] = [];
  listNews$!: Observable<News[]>;
  constructor(private authService: AuthService, private newsService: NewsService) { }

  ngOnInit(): void {
    this.getListNews()
    this.getListNewsObservable();
    this.authService.getCurrentUser().subscribe(res => {
    });
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
