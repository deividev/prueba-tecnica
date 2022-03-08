import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserloginRequest, UserloginResponse } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  formSingIn: FormGroup;
  loginUserReq: UserloginRequest;
  constructor(
    private authService: AuthService) {
      this.formSingIn = this.createForm();
      this.loginUserReq = {email: "", password: ""};
     }

  ngOnInit(): void {
  }

  createForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(9)]),
    });
  }


  loginUser(): void {
    this.loginUserReq.email = this.formSingIn.controls['email'].value;
    this.loginUserReq.password = this.formSingIn.controls['password'].value;
    this.authService.loginUser(this.loginUserReq)
      .subscribe(
        (res: User) => {
          this.authService.setCurrentUser(res);
          this.authService.redirectToHome();
        },
        (error: Error) => console.log(error)
      )
  }

}
