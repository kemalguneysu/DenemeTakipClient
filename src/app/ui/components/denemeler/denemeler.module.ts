import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DenemelerComponent } from './denemeler.component';
import { RouterModule } from '@angular/router';
import { TytCreateComponent } from './tyt-create/tyt-create.component';
import { AytCreateComponent } from './ayt-create/ayt-create.component';
import { TytListComponent } from './tyt-list/tyt-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DenemeComponent } from './deneme/deneme.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AytListComponent } from './ayt-list/ayt-list.component';
import { AytDenemeComponent } from './ayt-deneme/ayt-deneme.component';
import { DeleteDirective } from '../../../directives/admin/delete.directive';



@NgModule({
  declarations: [
    DenemelerComponent,
    TytCreateComponent,
    AytCreateComponent,
    TytListComponent,
    DeleteDirective,
    DenemeComponent,
    AytListComponent,
    AytDenemeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:DenemelerComponent},
      {path:"denemeler/ayt/:id",component:AytDenemeComponent},
      {path:"denemeler/tyt/:id",component:DenemeComponent}

    ]),
    NgxPaginationModule,
  ]
})
export class DenemelerModule { }
