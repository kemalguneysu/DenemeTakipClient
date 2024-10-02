import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KullanicilarComponent } from './kullanicilar.component';
import { KullaniciListComponent } from './kullanici-list/kullanici-list.component';
import { KullaniciSingleComponent } from './kullanici-single/kullanici-single.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { KonularComponent } from '../konular/konular.component';
import { SingleKonuComponent } from '../konular/single-konu/single-konu.component';



@NgModule({
  declarations: [
    KullanicilarComponent,
    KullaniciListComponent,
    KullaniciSingleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:KullanicilarComponent},
      {path:":id",component:KullaniciSingleComponent},
    ]),
    NgxPaginationModule
  ]
})
export class KullanicilarModule { }
