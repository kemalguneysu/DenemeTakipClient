import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';
import { HttpClientService } from '../../../services/common/http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { UserAuthService } from '../../../services/common/model/user-auth.service';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent extends BaseComponent{
  constructor(spinner:NgxSpinnerService,private toastrService:CustomToastrService,private httpClient:HttpClientService,
  private userAuthService:UserAuthService,private authService:AuthService,private activatedRoute: ActivatedRoute,private router: Router,private socialAuthService: SocialAuthService) {
    super(spinner);
    this.socialAuthService.authState.subscribe(async(user: SocialUser) => {
      this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
      switch (user.provider) {
        case "GOOGLE":
          await userAuthService.googleLogin(user, () => {
            this.authService.identityCheck();
            this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
          })
          break;
      }
    });
  }
  sifreGor:boolean=false;

  async ngOnInit(){

    
  }
  async girisYap(usernameoremail:string,password:string):Promise<any>{
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    try {
      await this.userAuthService.login(usernameoremail, password, () => {
        this.authService.identityCheck();
        this.activatedRoute.queryParams.subscribe(params => {
          const returnUrl: string = params["returnUrl"];
          if (returnUrl) {
            this.router.navigate([returnUrl]);
          }
        });
      this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating);

      });

    }
    catch(error){
      this.toastrService.message("Kullanıcı adı veya şifre hatalı", "Giriş Yapılamadı",{
        messageType:ToastrMessageType.Error,
        position:ToastrPosition.TopRight
      })
      this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating);

    }
  }
  gozAcKapa(){
    this.sifreGor=!this.sifreGor;
    if(this.sifreGor)
      document.getElementById("passwordInput")?.setAttribute("type","text");
    else
      document.getElementById("passwordInput")?.setAttribute("type","password");
  }
}
