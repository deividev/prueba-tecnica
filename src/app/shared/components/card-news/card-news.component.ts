import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { News } from '../../models/news';

@Component({
  selector: 'app-card-news',
  templateUrl: './card-news.component.html',
  styleUrls: ['./card-news.component.scss']
})
export class CardNewsComponent implements OnInit {


  @Input() news: any;
  @Output() newsCheked: EventEmitter<News> = new EventEmitter(false);

  isChecked: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  setChecked(news: News): void {
    this.isChecked = !this.isChecked;
    if (this.isChecked) {
      this.newsCheked.emit(this.news);
    }
  }

}
