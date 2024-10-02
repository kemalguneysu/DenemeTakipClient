import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KonularComponent } from './konular.component';
import { RouterModule } from '@angular/router';
import { KonuCreateComponent } from './konu-create/konu-create.component';
import { KonuListComponent } from './konu-list/konu-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeleteDirective2 } from '../../../directives/admin/delete2.directive';
import { SingleKonuComponent } from './single-konu/single-konu.component';



@NgModule({
  declarations: [
    KonularComponent,
    KonuCreateComponent,
    KonuListComponent,
    DeleteDirective2,
    SingleKonuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:KonularComponent},
      {path:":id",component:SingleKonuComponent},
    ]),
    NgxPaginationModule

  ]
})
export class KonularModule { }
