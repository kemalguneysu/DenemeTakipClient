import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from './questions.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    QuestionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:QuestionsComponent}
    ]),
  ]
})
export class QuestionsModule { }
