import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CardNewsComponent } from './components/card-news/card-news.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavComponent,
    DashboardComponent,
    CardNewsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    NavComponent, 
    DashboardComponent,
    CardNewsComponent
  ],
  providers: []
})
export class SharedModule { }
