import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateNews, News } from '../../models/news';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input() listNews: any;

  news!: CreateNews;
  formNews: FormGroup;

  newsSelected!: News;

  constructor(private newsService: NewsService) {
    this.formNews = this.createForm();
   }

  ngOnInit(): void {
    
  }

  createForm(): FormGroup {
    return new FormGroup({
      title: new FormControl('', [Validators.required, ]),
      description: new FormControl('', [Validators.required, ]),
    });
  }

  createNews(): void {
    const generateId = () => Math.random().toString(36).substr(2, 18);
    this.news = {
      title: this.formNews.controls['title'].value,
      description: this.formNews.controls['description'].value,
      newsUuid: generateId(),
    }
    this.newsService.postCreateNews(this.news).subscribe(news => {
    });
  }

  setNewsSelected(news: News): void {
    this.newsSelected = news;
    this.formNews.controls['title'].setValue(news.title);
    this.formNews.controls['description'].setValue(news.description);
  }

  deleteNewsSelected(): void {
    this.newsService.deleteNews(this.newsSelected.uuid).subscribe();
  }

}
