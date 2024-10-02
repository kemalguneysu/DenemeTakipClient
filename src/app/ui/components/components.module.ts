import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { DenemelerModule } from './denemeler/denemeler.module';
import { AnalizlerModule } from './analizler/analizler.module';
import { AboutModule } from './about/about.module';
import { QuestionsModule } from './questions/questions.module';
import { RegisterModule } from './register/register.module';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordUpdateComponent } from './password-update/password-update.component';
import { PasswordUpdateModule } from './password-update/password-update.module';
import { PasswordResetModule } from './password-reset/password-reset.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeModule,
    DenemelerModule,
    AnalizlerModule,
    AboutModule,
    QuestionsModule,
    RegisterModule,
    PasswordResetModule,
    PasswordUpdateModule,
  ]
})
export class ComponentsModule { }
