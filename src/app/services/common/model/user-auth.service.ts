import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../custom-toastr.service';
import { Observable, firstValueFrom } from 'rxjs';
import { TokenResponse } from '../../../contracts/token/tokenResponse';
import { Router } from '@angular/router';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService:HttpClientService,private toastrService:CustomToastrService,private router:Router) { }
  
  async login(userNameOrEmail: string, password: string, callBackFunction?:any): Promise<any>{
    const observable:Observable<any| TokenResponse>=this.httpClientService.post<any|TokenResponse>({
      controller:"auth",
      action:"login"
    },{userNameOrEmail,password});
    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);

      this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır.", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
      this.router.navigate(["/"]);
    }

    callBackFunction();
  }

  async refreshTokenLogin(refreshToken: string, callBackFunction?: (state:any) => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post({
      controller: "auth",
      action: "refreshtokenlogin",
    }, { refreshToken: refreshToken });

    try {
      const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

      if (tokenResponse) {
        localStorage.setItem("accessToken", tokenResponse.token.accessToken);
        localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      }

    } catch {}
  }
  async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      action: "google-login",
      controller: "auth"
    }, user);

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);

      this.toastrService.message("Google üzerinden giriş başarıyla sağlanmıştır.", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }
    if(callBackFunction!=null)
      callBackFunction();
  }
  async passwordReset(emailOrUserName:string,callBackFunction?:()=>void){
    const observable:Observable<any>=this.httpClientService.post({
      controller:"auth",
      action:"PasswordReset"
    },{emailOrUserName:emailOrUserName});
    await firstValueFrom(observable);
    if(callBackFunction)
      callBackFunction();
  }
  async verifyResetToken(resetToken:string,userId:string,callBackFunction?:()=>void):Promise<boolean>{
    const observable:Observable<any>=this.httpClientService.post({
      controller:"auth",
      action:"VerifyResetToken"
    },{resetToken:resetToken,userId:userId})
    const state:boolean=await firstValueFrom(observable);
    if(callBackFunction)
      callBackFunction();
    return state;
  }
}
