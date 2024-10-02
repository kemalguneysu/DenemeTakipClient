import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { KonuCreate } from '../../../../contracts/konu/konuCreate';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';
import { KonularService } from '../../../../services/common/model/konular.service';
import { Ders } from '../../../../contracts/ders/ders';
import { DerslerService } from '../../../../services/common/model/dersler.service';
import { SignalRService } from '../../../../services/common/signalr.service';
import { HubUrls } from '../../../../constants/hub-urls';
import { SendFunctions } from '../../../../constants/send-functions';

@Component({
  selector: 'app-konu-create',
  templateUrl: './konu-create.component.html',
  styleUrl: './konu-create.component.css'
})
export class KonuCreateComponent  extends BaseComponent{
  isAytOrTytToggle:boolean=true;
  dersId:string="";
  tytDersler:Ders[]=[];
  aytDersler:Ders[]=[];
  dersler:Ders[]=[];
  tytKonuShow:boolean=true;
  
  constructor(spinner:NgxSpinnerService,private toastrService:CustomToastrService,private konularService:KonularService
    ,private derslerService:DerslerService,private signalRService:SignalRService) {
    super(spinner);
    signalRService.start(HubUrls.KonuHub);
  }

  async ngOnInit(){
    this.dersler=(await this.derslerService.getAllDers()).dersler;
    this.tytDersler=this.dersler.filter(u=>u.isTyt===true);
    this.aytDersler=this.dersler.filter(u=>u.isTyt===false);

  }
  isAytOrTyt(){
    this.isAytOrTytToggle = !this.isAytOrTytToggle;
    this.tytKonuShow=!this.tytKonuShow;
  }
  async konuEkle(konuAdi:string){
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    const konuCreate=new KonuCreate();
    konuCreate.dersId=this.dersId;
    konuCreate.konuAdi=konuAdi;
    konuCreate.isTyt=this.isAytOrTytToggle;
    this.konularService.konuEkle(konuCreate,()=>{
      this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
      this.toastrService.message("Konu Eklendi","Konu başarıyla eklendi.",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      });
    this.signalRService.invoke(HubUrls.KonuHub,SendFunctions.KonuAddedMessage,`${konuAdi} isimli yeni bir konu eklendi.`)
    },errorMessage => {
      this.toastrService.message(errorMessage,"Hata oluştu!",{
        messageType:ToastrMessageType.Error,
        position:ToastrPosition.TopRight
      });
    });
    
  }
  async findDersId(dersId:string){
    this.dersId=dersId;
    const checkboxes = document.querySelectorAll('.konuCheckBox');
        checkboxes.forEach(checkbox => {
            if (checkbox.id !== dersId) {
                (checkbox as HTMLInputElement).checked=false;
            }
        });
  }
}
