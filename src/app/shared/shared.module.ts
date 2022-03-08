import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { CardNewsComponent } from './components/card-news/card-news.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CardNewsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CardNewsComponent
  ],
  providers: []
})
export class SharedModule { }
