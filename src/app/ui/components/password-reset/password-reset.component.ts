import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../../../services/common/model/user-auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent extends BaseComponent{

  constructor(spinner:NgxSpinnerService,private userAuthService:UserAuthService,private toastrService:CustomToastrService) {
    super(spinner);
  }
  passwordReset(emailOrUserName:string){
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating)
    this.userAuthService.passwordReset(emailOrUserName,()=>{
      this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
      this.toastrService.message("Şifre talebi için mail gönderilmiştir.","Şifre Talebi",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      })
    })
  }

}
