import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserloginRequest } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { global } from 'src/constant';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  formSingIn: FormGroup;
  loginUserReq: UserloginRequest;
  literalTitle: string = "";
  literalLabelEmail: string = "";
  literalLabelPass: string = "";
  literalMessgQuestion: string = "";
  literalLinkSignUp: string = "";
  literalBtnLogin: string = "";

  constructor(
    private authService: AuthService) {
      this.formSingIn = this.createForm();
      this.loginUserReq = {email: "", password: ""};
     }

  ngOnInit(): void {
    this.literalTitle = global.titleSignIn;
    this.literalLabelEmail = global.labelEmail;
    this.literalLabelPass = global.labelPassword;
    this.literalMessgQuestion = global.messQuestion;
    this.literalLinkSignUp = global.linkSignup;
    this.literalBtnLogin = global.btnLogin;
  }

  createForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }


  loginUser(): void {
    debugger
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
  validateForm(): boolean {
    return this.formSingIn.invalid ? true : false;
  }

}
