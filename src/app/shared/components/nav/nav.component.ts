import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { global } from 'src/constant';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() userObject: any;
  @Input() isUserAdmin: boolean = false;
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
  showMenuUser: boolean = false;
  showMenuHeader: boolean = false;

  constructor(private authService: AuthService, private router: Router) { 
    
   }

  ngOnInit(): void {
    this.literalBtnRoleAdmin = global.btnRoleAdmin;
    this.literalBtnLogout = global.btnLogout;
    this.literalBtnDashboard = global.btnDashboard;
    this.literalBtnNews = global.btnNews;
    this.nameCompany = global.nameCompany;
    //this.initData();
  }

  initData(): void{
    this.name = this.userObject.name ? this.userObject.name : "name";
  }

  openMenuUser(): void {
    this.showMenuUser = !this.showMenuUser;
  }

  openMenuHeader(): void {
    this.showMenuHeader = !this.showMenuHeader; 
  }

  changeRoleUser(): void {
    this.authService.postChangeRole().subscribe(res => {
      this.isDashboard = !this.isDashboard;
      this.isDashboardEvent.emit(this.isDashboard);
    },
    (error: any) => {
      this.error = error;
    })
  }

  viewDashboard(): void {
    this.isDashboard = true;
    this.isDashboardEvent.emit(this.isDashboard);
    this.router.navigate(['dashboard']);
  } 

  viewNews(): void {
    this.isDashboard = false;
    this.isDashboardEvent.emit(this.isDashboard);
    this.router.navigate(['home']);
  }

  logout(): void{
    this.authService.logout();
    this.authService.redirectToSingIn();
  } 

}
