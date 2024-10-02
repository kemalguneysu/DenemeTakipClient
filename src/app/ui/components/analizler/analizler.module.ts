import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalizlerComponent } from './analizler.component';
import { RouterModule } from '@angular/router';
import { TytAnalizComponent } from './tyt-analiz/tyt-analiz.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AytAnalizComponent } from './ayt-analiz/ayt-analiz.component';
import { TytBosYanlisAnalizComponent } from './tyt-bos-yanlis-analiz/tyt-bos-yanlis-analiz.component';
import { AytBosYanlisAnalizComponent } from './ayt-bos-yanlis-analiz/ayt-bos-yanlis-analiz.component';



@NgModule({
  declarations: [
    AnalizlerComponent,
    TytAnalizComponent,
    AytAnalizComponent,
    TytBosYanlisAnalizComponent,
    AytBosYanlisAnalizComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:AnalizlerComponent},
    ]),
    NgxChartsModule,

  ]
})
export class AnalizlerModule { }
