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
  @Input() isClickSelected: boolean = false;

  @Output() newsCheked: EventEmitter<News> = new EventEmitter(false);

  isChecked: boolean = false;
  isAdmin: boolean = false;
  isDashboard: boolean = false;
  urlImage: string = "";

  constructor(private authService: AuthService, private newsService: NewsService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.checkAdmin();
    this.isDashboard = this.newsService.getViewDashboard();
  }

  setChecked(news: News): void {
    if (this.isClickSelected) {
      news.isChecked = !news.isChecked;
      if (news.isChecked) {
        const checkBoxId: any = document.getElementById(news.uuid);
        checkBoxId.checked = true;

        this.newsService.setIsNotCheckedNewsLessSelected(news.uuid);    
      }
      else {
        const checkBoxId: any = document.getElementById(news.uuid);
        checkBoxId.checked = false;
      }
      this.newsCheked.emit(this.news);
    }
  }
  

}
