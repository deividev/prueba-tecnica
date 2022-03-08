import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { News } from '../../models/news';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-card-news',
  templateUrl: './card-news.component.html',
  styleUrls: ['./card-news.component.scss']
})
export class CardNewsComponent implements OnInit {


  @Input() news: any;

  @Output() newsCheked: EventEmitter<News> = new EventEmitter(false);

  isChecked: boolean = false;
  isAdmin: boolean = false;
  isDashboard: boolean = false;
  urlImage: string = "";

  constructor(private authService: AuthService, private newsService: NewsService) { }

  ngOnInit(): void {
    debugger
    this.news
    this.isAdmin = this.authService.checkAdmin();
    this.isDashboard = this.newsService.getViewDashboard();
  }

  setChecked(news: News): void {
    debugger
    if (news.isChecked) {
      news.isChecked = !news.isChecked;
      this.isChecked = news.isChecked;
    }
    
    
    this.newsCheked.emit(this.news);
  }

}
