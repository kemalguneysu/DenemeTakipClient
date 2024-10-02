import { Component } from '@angular/core';
import AOS from 'aos';
import { BaseComponent } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';
import { AuthService } from '../../../../services/common/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent extends BaseComponent{
  theme: string;
  isLight:boolean=true;
  isChecked: boolean = false;  
  constructor(spinner:NgxSpinnerService,private toastrService:CustomToastrService,public authService:AuthService,private router:Router) {
    super(spinner);
    authService.identityCheck();
    this.theme = localStorage.getItem('theme') || 'light-theme';
  }
  ngOnInit(){
    AOS.init();
    if (this.theme === 'dark-theme') {
      this.isChecked = true; // Checkbox'lar işaretli olsun
      (document.getElementById('themeToggle') as HTMLInputElement).checked = true;
      (document.getElementById('themeToggleMini') as HTMLInputElement).checked = true;
    } else {
      this.isChecked = false; // Checkbox'lar işaretlenmemiş olsun
      (document.getElementById('themeToggle') as HTMLInputElement).checked = false;
      (document.getElementById('themeToggleMini') as HTMLInputElement).checked = false;
    }
    this.applyTheme(this.theme);
  }
  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("Çıkış yapılmıştır","Çıkış",{
      messageType:ToastrMessageType.Warning,
      position:ToastrPosition.TopRight
    });

  }
  changeTheme(event:any){
    const isChecked = event.target.checked;

    (document.getElementById('themeToggle') as HTMLInputElement).checked = isChecked;
    (document.getElementById('themeToggleMini') as HTMLInputElement).checked = isChecked;

    if (isChecked) {
      this.theme = 'dark-theme';
    } else {
      this.theme = 'light-theme';
    }
    localStorage.setItem('theme', this.theme);

    // Temayı uygula
    this.applyTheme(this.theme);

  }
  applyTheme(theme: string): void {
    if (theme === 'dark-theme') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }
}
