import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './ui/components/home/home.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { authGuard } from './guards/common/auth.guard';
import { adminGuard } from './guards/common/admin-guard.guard';

const routes: Routes = [
  {path:"admin",component:LayoutComponent,children:[
      {path:"",component:DashboardComponent,canActivate:[adminGuard]},
      {path:"dersler",loadChildren:()=>import("./admin/components/dersler/dersler.module").then(module=>module.DerslerModule),canActivate:[adminGuard]},
      {path:"dersler/:id",loadChildren:()=>import("./admin/components/konular/konular.module").then(module=>module.KonularModule),canActivate:[adminGuard]},
      {path:"konular",loadChildren:()=>import("./admin/components/konular/konular.module").then(module=>module.KonularModule),canActivate:[adminGuard]},
      {path:"konular/:id",loadChildren:()=>import("./admin/components/konular/konular.module").then(module=>module.KonularModule),canActivate:[adminGuard]},
      {path:"kullanicilar",loadChildren:()=>import("./admin/components/kullanicilar/kullanicilar.module").then(module=>module.KullanicilarModule),canActivate:[adminGuard]},
      {path:"kullanicilar/:id",loadChildren:()=>import("./admin/components/kullanicilar/kullanicilar.module").then(module=>module.KullanicilarModule),canActivate:[adminGuard]},
    ],canActivate:[adminGuard]
  },
  {path:"",component:HomeComponent},
  {path:"denemeler",loadChildren:()=>import("./ui/components/denemeler/denemeler.module").then(module=>module.DenemelerModule),canActivate:[authGuard]},
  {path:"denemeler/tyt:denemeId",loadChildren:()=>import("./ui/components/denemeler/denemeler.module").then(module=>module.DenemelerModule),canActivate:[authGuard]},
  {path:"denemeler/ayt:denemeId",loadChildren:()=>import("./ui/components/denemeler/denemeler.module").then(module=>module.DenemelerModule),canActivate:[authGuard]},

  {path:"analizler",loadChildren:()=>import("./ui/components/analizler/analizler.module").then(module=>module.AnalizlerModule),canActivate:[authGuard]},
  {path:"hakkimizda",loadChildren:()=>import("./ui/components/about/about.module").then(module=>module.AboutModule)},
  {path:"sikca-sorulan-sorular",loadChildren:()=>import("./ui/components/questions/questions.module").then(module=>module.QuestionsModule)},
  {path:"giris-yap",loadChildren:()=>import("./ui/components/login/login.module").then(module=>module.LoginModule)},
  {path:"uye-ol",loadChildren:()=>import("./ui/components/register/register.module").then(module=>module.RegisterModule)},
  {path:"sifremi-unuttum",loadChildren:()=>import("./ui/components/password-reset/password-reset.module").then(module=>module.PasswordResetModule)},
  {path:"sifreyi-yenile/:userId/:resetToken",loadChildren:()=>import("./ui/components/password-update/password-update.module").then(module=>module.PasswordUpdateModule)},
  

  
  // {path:"",loadChildren:()=>import("./ui/components/").then(module=>module.)},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
