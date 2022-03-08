import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CreateNews, News } from '../models/news';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  isViewDashboard: boolean = false;
  newsSelected$ = new Subject<News>();

  private currentListNews$ = new Subject<News[]>();
  listNews: News[] = [];

  constructor(private http: HttpClient) { }

  setViewDashboard(isView: boolean): void {
    debugger
    this.isViewDashboard = isView;
  }

  getViewDashboard(): boolean {
    return this.isViewDashboard;
  }

  setCurrentListNewsSubject(currentListNews: News[]): void {
    this.listNews = currentListNews;
    this.currentListNews$.next(currentListNews);
  }

  setCurrentNewsSubject(currentAddNews: News): void {
    this.listNews.push(currentAddNews);
    this.setCurrentListNewsSubject(this.listNews);
  }

  getListNews$(): Observable<News[]> {
    return this.currentListNews$.asObservable();
  }

  getListNews(): Observable<any> {
    return this.http.get<any>(environment.allNewsApi).pipe(
      take(1),
      map((list: any) => {
        list = this.setIsNotCheckedNews(list);
        this.setCurrentListNewsSubject(list);
        return list
      }),
      catchError((err) => {
        return err.error.error}),
    )
  }

  // setNewsSelected(news: News): void {
  //   debugger
  //   this.newsSelected$.next(news);
  // }
  // getNewsAfterSelected$(): Observable<News> {
  //   debugger
  //   return this.newsSelected$.asObservable();
  // }

  // checkPreviousNews(news: News): void {
  //   debugger
  //   let newsAfterSelected!: News;
  //   this.getNewsAfterSelected$().subscribe(res => {newsAfterSelected = res});
  //   if ( newsAfterSelected.uuid !== news.uuid) {
  //     debugger
  //     let listNewsIsNotChecked = this.setIsNotCheckedNews(this.getListNews$);
  //     this.setCurrentListNewsSubject(listNewsIsNotChecked);
  //   }
  // }

  setIsNotCheckedNews(list: any): any {
    debugger
    list.news.map((news: News) => {
      news.isChecked = false;
    });
    return list.news;
  }
  setIsNotCheckedNewsLessSelected(uuid: string): any {
    debugger
    this.listNews.map((news: News) => {
      debugger
      if (uuid !== news.uuid) {
        const checkBoxId: any = document.getElementById(news.uuid);
        checkBoxId.checked = false;
        news.isChecked = false;
      }
      
    });
    return this.listNews;
  }

  

  setListNews(list: News[]): void {
    this.listNews = list;
  }

  postCreateNews(news: CreateNews): Observable<any> {
    return this.http.post<any>(environment.allNewsApi, news).pipe(
      take(1),
      map((news: any) => {
        this.setCurrentNewsSubject(news.news);
        return news
      }),
      catchError((err) => {
        return err.error.error}),
    )
  }

  deleteNews(uuidNews: string): Observable<any> {
    const urlDeleteNews = `${environment.allNewsApi}/${uuidNews}`;
    return this.http.delete<any>(urlDeleteNews).pipe(
      take(1),
      map((res: any) => {
        this.filterListNewsDelete(res.uuid);
        return res.uuid
      }),
      catchError((err) => {
        return err.error.error}),
    )
  }

  filterListNewsDelete(uuid: string): void {
    const listNewsClean: News[] =this.listNews.filter(news => news.uuid !== uuid)
    this.setCurrentListNewsSubject(listNewsClean);
  }


  
  updateNews(news: News ,uuidNews: string): Observable<any> {
    const urlDeleteNews = `${environment.allNewsApi}/${uuidNews}`;
    return this.http.put<any>(urlDeleteNews, news).pipe(
      take(1),
      map((res: any) => {
        debugger
        this.filterListNewsDelete(uuidNews);
        this.setCurrentNewsSubject(res.news);
        return res.news;
      }),
      catchError((err) => {
        debugger
        return err.error.error}),
    )
  }


}
