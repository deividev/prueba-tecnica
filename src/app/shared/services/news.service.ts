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

  private currentListNews$ = new Subject<News[]>();
  listNews: News[] = [];

  constructor(private http: HttpClient) { }

  setViewDashboard(isView: boolean): void {
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
        this.setCurrentListNewsSubject(list.news);
        return list
      })
    )
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
      })
    )
  }

  deleteNews(uuidNews: string): Observable<any> {
    const urlDeleteNews = `${environment.allNewsApi}/${uuidNews}`;
    return this.http.delete<any>(urlDeleteNews).pipe(
      take(1),
      map((res: any) => {
        this.filterListNewsDelete(res.uuid);
        return res.uuid
      })
    )
  }

  filterListNewsDelete(uuid: string): void {
    const listNewsClean: News[] =this.listNews.filter(news => news.uuid !== uuid)
    this.setCurrentListNewsSubject(listNewsClean);
  }


}
