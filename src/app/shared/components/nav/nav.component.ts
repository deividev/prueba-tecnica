import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/auth/models/user';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() userObject: any;
  @Output() isDashboardEvent: EventEmitter<boolean> = new EventEmitter(false);


  role: string = "";
  name: string = "";
  email: string = "";
  isAdmin: boolean = false;
  isDashboard: boolean = false;

  constructor(private authService: AuthService, private newsService: NewsService) { 
    
   }

  ngOnInit(): void {
    this.initData();
    this.isAdmin = this.authService.checkAdmin();
  }

  initData(): void{
    this.name = this.userObject.name ? this.userObject.name : "name";
  }

  changeRoleUser(): void {
    this.authService.postChangeRole().subscribe(res => {
      this.isAdmin = this.authService.checkAdmin();
    })
  }

  viewDashboard(): void {
    this.isDashboard = !this.isDashboard
    this.isDashboardEvent.emit(this.isDashboard);
  } 

  logout(): void{
    this.authService.logout();
    this.authService.redirectToSingIn();
  } 

}
