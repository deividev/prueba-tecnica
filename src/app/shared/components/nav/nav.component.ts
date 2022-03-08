import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { global } from 'src/constant';

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
  nameCompany: string = "";
  email: string = "";
  literalBtnRoleAdmin: string = "";
  literalBtnLogout: string = "";
  literalBtnDashboard: string = "";
  literalBtnNews: string = "";
  isAdmin: boolean = false;
  isDashboard: boolean = false;
  error: string = "";

  constructor(private authService: AuthService) { 
    
   }

  ngOnInit(): void {
    this.literalBtnRoleAdmin = global.btnRoleAdmin;
    this.literalBtnLogout = global.btnLogout;
    this.literalBtnDashboard = global.btnDashboard;
    this.literalBtnNews = global.btnNews;
    this.nameCompany = global.nameCompany;
    this.initData();
    this.isAdmin = this.authService.checkAdmin();
  }

  initData(): void{
    this.name = this.userObject.name ? this.userObject.name : "name";
  }

  changeRoleUser(): void {
    this.authService.postChangeRole().subscribe(res => {
      debugger
      this.isAdmin = this.authService.checkAdmin();
      this.isDashboard = !this.isDashboard;
      this.isDashboardEvent.emit(this.isDashboard);
    },
    (error: any) => {
      this.error = error;
    })
  }

  viewDashboard(): void {
    debugger
    this.isDashboard = !this.isDashboard;
    this.isDashboardEvent.emit(this.isDashboard);
  } 

  logout(): void{
    this.authService.logout();
    this.authService.redirectToSingIn();
  } 

}
