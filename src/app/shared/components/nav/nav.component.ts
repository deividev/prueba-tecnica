import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/user';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() userObject: any;

  role: string = "";
  name: string = "";
  email: string = "";
  isAdmin: boolean = false;

  constructor(private authService: AuthService) { 
    
   }

  ngOnInit(): void {
    this.initData();
    this.isAdmin = this.authService.checkAdmin();
  }

  initData(): void{
    this.role = this.userObject.role ? this.userObject.role : "role";
    this.name = this.userObject.name ? this.userObject.name : "name";
  }

}
