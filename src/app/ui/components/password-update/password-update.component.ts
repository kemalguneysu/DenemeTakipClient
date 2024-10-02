import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../../../services/common/model/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';
import { UserService } from '../../../services/common/model/user.service';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrl: './password-update.component.css'
})
export class PasswordUpdateComponent extends BaseComponent{

  constructor(spinner:NgxSpinnerService,private userAuthService:UserAuthService,private activatedRoute:ActivatedRoute,
    private toastrService:CustomToastrService,private userService:UserService,private router:Router) {
    super(spinner);
  }
  sifreGor:boolean=false;
  sifreGor2:boolean=false;
  state:any;
  ngOnInit(){
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    this.activatedRoute.params.subscribe({
      next:async params=>{
        const userId=params["userId"];
        const resetToken=params["resetToken"];
        this.state=await this.userAuthService.verifyResetToken(resetToken,userId,()=>{
          this.state=true;
          this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
        })
      }
    })
  }
  updatePassword(password:string,passwordConfirm:string){
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    if(password!=passwordConfirm){
      this.toastrService.message("Şifre ve şifre onay alanı aynı değil.", "Şifre",{
        messageType:ToastrMessageType.Error,
        position:ToastrPosition.TopRight
      })
      return;
    }
    this.activatedRoute.params.subscribe({
      next:async params=>{
        const userId:string=params["userId"];
        const resetToken:string=params["resetToken"];
        await this.userService.updatePassword(userId,resetToken,password,passwordConfirm,()=>{
          this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating)
          this.toastrService.message("Şifre başarıyla yenilenmiştir.","Şifre Yenileme",{
            messageType:ToastrMessageType.Success,
            position:ToastrPosition.TopRight
          })
          this.router.navigate(["/giris-yap"]);
        },error=>{
          this.toastrService.message("Şifre yenilenirken bir hata oluştu.","Şifre Yenileme",{
            messageType:ToastrMessageType.Error,
            position:ToastrPosition.TopRight
          })
        })
        this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating)
      }
    })
  }
  gozAcKapa(){
    this.sifreGor=!this.sifreGor;
    if(this.sifreGor)
      document.getElementById("passwordInput")?.setAttribute("type","text");
    else
      document.getElementById("passwordInput")?.setAttribute("type","password");
  }
  gozAcKapa2(){
    this.sifreGor2=!this.sifreGor2;
    if(this.sifreGor2)
      document.getElementById("passwordInput2")?.setAttribute("type","text");
    else
      document.getElementById("passwordInput2")?.setAttribute("type","password");
  }
}
