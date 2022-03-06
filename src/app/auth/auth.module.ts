import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
//Components
import { SigninComponent } from './components/signin/signin.component';
import { SingupComponent } from './components/singup/singup.component';

//Services
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';


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
  ],
  providers: [AuthService, UserService]
})
export class AuthModule { }
