import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
//Components
import { SigninComponent } from './components/signin/signin.component';
import { SingupComponent } from './components/singup/singup.component';

//Module
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SingupComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: []
})
export class AuthModule { }
