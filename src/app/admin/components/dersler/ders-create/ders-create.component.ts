import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Ders } from '../../../../contracts/ders/ders';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { Konu } from '../../../../contracts/konu/konu';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';
import { DerslerService } from '../../../../services/common/model/dersler.service';
import { KonularService } from '../../../../services/common/model/konular.service';
import { DersCreate } from '../../../../contracts/ders/dersCreate';
import { SignalRService } from '../../../../services/common/signalr.service';
import { HubUrls } from '../../../../constants/hub-urls';
import { SendFunctions } from '../../../../constants/send-functions';

@Component({
  selector: 'app-ders-create',
  templateUrl: './ders-create.component.html',
  styleUrl: './ders-create.component.css'
})
export class DersCreateComponent extends BaseComponent{
  isAytOrTytToggle:boolean=true;
  dersler:Ders[]=[];
  konular:Konu[]=[];
  constructor(spinner:NgxSpinnerService,private toastrService:CustomToastrService,private derslerService:DerslerService
    ,private konularService:KonularService,private signalRService:SignalRService) {
    super(spinner);
    signalRService.start(HubUrls.DersHub);
  }

  async ngOnInit(){
    await this.getAllDersler();
  }
  isAytOrTyt(){
    this.isAytOrTytToggle = !this.isAytOrTytToggle;
  }
  async getAllDersler(){
    this.derslerService.getAllDers(undefined,undefined,undefined,undefined,()=>this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating),errorMessage=>this.toastrService.message(errorMessage,"Hata",{
      messageType: ToastrMessageType.Error,
      position:ToastrPosition.TopRight,
    }));
  }
  async dersEkle(dersAdi:string){
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    const dersCreate=new DersCreate();
    dersCreate.dersAdi=dersAdi,
    dersCreate.isTyt=this.isAytOrTytToggle;
    this.derslerService.dersEkle(dersCreate,()=>{
      this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
      this.toastrService.message("Ders Eklendi","Ders başarıyla eklendi.",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      });
      this.signalRService.invoke(HubUrls.DersHub, SendFunctions.DersAddedMessage,`${dersAdi} adında yeni bir ders eklendi.`);

    },errorMessage => {
      this.toastrService.message(errorMessage,"Hata oluştu!",{
        messageType:ToastrMessageType.Error,
        position:ToastrPosition.TopRight
      });
    });
    
  }
}
