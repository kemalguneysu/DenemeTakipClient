import { CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/common/custom-toastr.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { _isAuthenticated } from '../../services/common/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const jwtHelper=inject(JwtHelperService);
  const router=inject(Router);
  const toastr=inject(CustomToastrService);
  const spinner=inject(NgxSpinnerService);

  spinner.show(SpinnerType.BallSpinClockwiseFadeRotating);
  if(localStorage.getItem("accessToken")==null){
    router.navigate(["/giris-yap"],{queryParams:{returnUrl:state.url}});
    toastr.message("Yetkiniz yok","Yetkisiz İşlem",{
      messageType:ToastrMessageType.Error,
      position:ToastrPosition.TopRight
    });
  }
    else if(!_isAuthenticated){
      router.navigate(["/giris-yap"],{queryParams:{returnUrl:state.url}});
      toastr.message("Yetkiniz yok","Yetkisiz İşlem",{
        messageType:ToastrMessageType.Error,
        position:ToastrPosition.TopRight
      });
    }    
  // }

  spinner.hide(SpinnerType.BallSpinClockwiseFadeRotating);
  return true;
};
