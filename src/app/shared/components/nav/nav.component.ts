import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/user';

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

  constructor() { 
    
    debugger
   }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void{
    this.role = this.userObject.role;
    this.name = this.userObject.name;
    this.email = this.userObject.email;
  }

}
