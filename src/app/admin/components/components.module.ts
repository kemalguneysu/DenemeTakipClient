import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { DerslerModule } from './dersler/dersler.module';
import { KonularModule } from './konular/konular.module';
import { KullanicilarModule } from './kullanicilar/kullanicilar.module';




@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DashboardModule,
    DerslerModule,
    KonularModule,
    KullanicilarModule
  ]
})
export class ComponentsModule { }
