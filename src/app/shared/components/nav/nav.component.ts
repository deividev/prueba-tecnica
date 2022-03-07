import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() userObject: any;

  role: string;

  constructor() { 
    this.role = this.userObject.role;
    debugger
   }

  ngOnInit(): void {
  }

}
