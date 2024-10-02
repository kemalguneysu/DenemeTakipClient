import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { group } from '@angular/animations';
import { UserCreate } from '../../../contracts/user/userCreate';
import { UserService } from '../../../services/common/model/user.service';
import { User } from '../../../contracts/entities/user';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { UserAuthService } from '../../../services/common/model/user-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends BaseComponent{
  sifreGor:boolean=false;
  sifreGor2:boolean=false;
  frm:FormGroup;
  authService: any;
  constructor(spinner:NgxSpinnerService,private socialAuthService: SocialAuthService,private userAuthService:UserAuthService,private toastrService:CustomToastrService,private formBuilder:FormBuilder,private userService:UserService,private router:Router) {
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
  async ngOnInit(){
    this.frm=this.formBuilder.group({
      username:["",[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(35)
      ]],
      email:["",[
        Validators.required,
        Validators.email
      ]],
      password:["",[
        Validators.required,
        Validators.minLength(6)
      ]],
      passwordConfirm:["",[
        Validators.required

      ]]
    },{
      validators: (group: AbstractControl): ValidationErrors | null => {
        let sifre = group.get("password")?.value;  
        let sifreTekrar = group.get("passwordConfirm")?.value;
        return sifre === sifreTekrar ? null : { notSame: true };
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
  async onSubmit(user:User){
    this.submitted=true;
    if(this.frm.invalid)
      return;
    const result:UserCreate=await this.userService.create(user);
    if(result.succeeded){
      this.toastrService.message(result.message,"Kullanıcı başarıyla oluşturuldu.",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      });
      this.router.navigate(["/giris-yap"])
    }
    else{
      this.toastrService.message(result.message,"Kullanıcı oluşturulamadı.",{
        messageType:ToastrMessageType.Error,
        position:ToastrPosition.TopRight
      })
    }

  }
  submitted:boolean=false;
  get component(){
    return this.frm.controls;
  }
}
