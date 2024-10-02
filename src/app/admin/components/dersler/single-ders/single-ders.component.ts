import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { DerslerService } from '../../../../services/common/model/dersler.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';
import { Ders } from '../../../../contracts/ders/ders';
import { UpdateDers } from '../../../../contracts/ders/dersUpdate';
import { SignalRService } from '../../../../services/common/signalr.service';
import { HubUrls } from '../../../../constants/hub-urls';
import { sendMessage } from '@microsoft/signalr/dist/esm/Utils';
import { SendFunctions } from '../../../../constants/send-functions';
import { ReceiveFunctions } from '../../../../constants/receive-functions';

@Component({
  selector: 'app-single-ders',
  templateUrl: './single-ders.component.html',
  styleUrl: './single-ders.component.css'
})
export class SingleDersComponent extends BaseComponent{
  isAytOrTytToggle:boolean=true;
  dersAdi:string;
  isTyt:boolean;
  dersId:string;
  tytKonuShow:boolean=true;
  selectedIsTyt:boolean;
  ders:Ders;
  @ViewChild('txtDersAdi') txtDersAdi: ElementRef;
  constructor(spinner:NgxSpinnerService,private route:ActivatedRoute,private derslerService:DerslerService,private toastrService:CustomToastrService,
    private router:Router,private signalRService:SignalRService) {
    super(spinner);
    
  }
  async ngOnInit(){
    this.dersId=this.route.snapshot.paramMap.get('id') as string;
    this.ders=await this.derslerService.getDersById(this.dersId);
    this.dersAdi=this.ders.dersAdi;
    this.isTyt=this.ders.isTyt;
    this.selectedIsTyt=this.ders.isTyt;
    this.signalRService.start(HubUrls.DersHub);
    this.signalRService.on(HubUrls.DersHub,ReceiveFunctions.DersUpdatedMessage,async message=>{
      this.ders=await this.derslerService.getDersById(this.dersId);
      this.txtDersAdi.nativeElement.value=this.ders.dersAdi;
      // this.toastrService.message(message,"Bir Ders Güncellendi",{
      //   messageType:ToastrMessageType.Warning,
      //   position:ToastrPosition.TopRight
      // })
    })
  }

  async editDers(dersAdi:string){
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating)
    const dersUpdate:UpdateDers=new UpdateDers();
    dersUpdate.dersAdi=dersAdi;
    dersUpdate.isTyt=this.selectedIsTyt;
    dersUpdate.dersId=this.dersId;
    this.derslerService.editDers(dersUpdate,()=>{
      this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
      this.toastrService.message("Konu","Konu başarıyla güncellendi.",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      });
      this.signalRService.invoke(HubUrls.DersHub,SendFunctions.DersUpdatedMessage,`${dersAdi} isimli ders güncellendi.`)
    },errorMessage => {
      this.toastrService.message(errorMessage,"Hata oluştu!",{
        messageType:ToastrMessageType.Error,
        position:ToastrPosition.TopRight
      });
    });
  }
  checkDersTip(event:Event){
    const target = event.target as HTMLInputElement;
    if (target.id === 'tyt') {
      this.isTyt = true;
      this.selectedIsTyt=true;
    } else if (target.id === 'ayt') {
      this.isTyt = false;
      this.selectedIsTyt=false;
    }
  }
}
