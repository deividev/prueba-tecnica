
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CreateNews, News } from '../../shared/models/news';
import { NewsService } from '../../shared/services/news.service';
import { global } from 'src/constant';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  listNews: any[] = [];
  listNews$!: Observable<News[]>;

  news!: CreateNews;
  formNews: FormGroup;

  newsSelected!: News;
  error: string = "";
  afterNewsSelected$!: Observable<News>;
  literalLabelTitle: string = "";
  literalLabelDescription: string = "";
  literalBtnCreate: string = "";
  literalBtnUpdate: string = "";
  literalBtnDelete: string = "";
  constructor(private newsService: NewsService) {
    this.formNews = this.createForm();
    
   }

  ngOnInit(): void {
    this.literalLabelTitle = global.labelTitleNews;
    this.literalLabelDescription = global.labelDescriptionNews;
    this.literalBtnCreate =  global.btnCreate;
    this.literalBtnUpdate = global.btnUpdate;
    this.literalBtnDelete = global.btnDelete;
    //this.getListNews()
    //this.getListNewsObservable();
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
      isChecked: false,
    }
    this.newsService.postCreateNews(this.news).subscribe(
      (res) => {
        this.formNews.reset();
      },
      (error: string) => {
        this.error = error;
      }
    );
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

  setNewsSelected(news: News): void {
    this.newsSelected = news;
    this.formNews.controls['title'].setValue(news.title);
    this.formNews.controls['description'].setValue(news.description);
    if (!this.newsSelected.isChecked) {
      this.formNews.reset();
    }
  }

  deleteNewsSelected(): void {
    this.newsService.deleteNews(this.newsSelected.uuid).subscribe(
      (res) => {
        this.formNews.reset();
      },
      (error: string) => {
        this.error = error;
      }
    );
  }

  updateNewsSelected(): void {
    this.newsSelected.title = this.formNews.controls['title'].value;
    this.newsSelected.description =  this.formNews.controls['description'].value;
    this.newsService.updateNews(this.newsSelected, this.newsSelected.uuid).subscribe(
      (res) => {
        this.formNews.reset();
      },
      (error: string) => {
        this.error = error;
      }
    );
  }

}