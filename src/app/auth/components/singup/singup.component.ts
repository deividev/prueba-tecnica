import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponse, User, UserRegisterReq } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { global } from 'src/constant';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {

  formSingUp: FormGroup;
  error: string;
  literalTitle: string ="";
  literalLabelName: string ="";
  literalLabelEmail: string ="";
  literalLabelPass: string ="";
  literalMessgQuestSignUp: string ="";
  literalLinSignIn: string ="";
  literalBtnSignUp: string ="";

  constructor(
    private authService: AuthService) { 
    this.formSingUp = this.createForm();
    this.error = "";
  }

  ngOnInit(): void {
    this.literalTitle = global.titleSignUp;
    this.literalLabelName = global.labelName;
    this.literalLabelEmail = global.labelEmail;
    this.literalLabelPass = global.labelPassword;
    this.literalMessgQuestSignUp = global.messQuestionSignUp
    this.literalLinSignIn = global.linkSignIn;
    this.literalBtnSignUp = global.btnSignUp;
  }

  createForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,]),
    });
  }

  registerUser(): void {
    const generateId = () => Math.random().toString(36).substr(2, 18);
    this.formSingUp.controls['uuid'].setValue(generateId());
    let registerUserData: UserRegisterReq = {
      email: this.formSingUp.controls['email'].value,
      name: this.formSingUp.controls['name'].value,
      password: this.formSingUp.controls['password'].value,
      uuid: this.formSingUp.controls['uuid'].value,
    }
    this.authService.registerUser(registerUserData)
    .subscribe(
      (res: AuthResponse) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        let user: User = {...registerUserData, role: 'USER_ROLE'}
        this.authService.setCurrentUser(user);
        this.authService.redirectToHome();
      },
      (error: any) => {
        this.error = error;
      }
    );
  }

  validateForm(): boolean {
    return this.formSingUp.invalid ? true : false;
  }


}
