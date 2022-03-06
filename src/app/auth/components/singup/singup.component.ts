import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponse, UserRegisterReq } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {

  formSingUp: FormGroup;
  error: string;

  constructor(private authService: AuthService) { 
    this.formSingUp = this.createForm();
    this.error = "";
  }

  ngOnInit(): void {
  }

  createForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(9)]),
      uuid: new FormControl('', [Validators.required,]),
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

      },
      (error: HttpErrorResponse) => {
        debugger
        this.error = error.error.error
      }
    );
  }


}
