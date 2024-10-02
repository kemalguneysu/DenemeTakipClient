import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DerslerComponent } from './dersler.component';
import { RouterModule } from '@angular/router';
import { DersCreateComponent } from './ders-create/ders-create.component';
import { DersListComponent } from './ders-list/ders-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeleteDirective3 } from '../../../directives/admin/delete3.directive';
import { SingleDersComponent } from './single-ders/single-ders.component';



@NgModule({
  declarations: [
    DerslerComponent,
    DersCreateComponent,
    DeleteDirective3,
    DersListComponent,
    SingleDersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:DerslerComponent},
      {path:":id",component:SingleDersComponent},
    ]),
    NgxPaginationModule

  ]
})
export class DerslerModule { }
