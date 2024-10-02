import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Ders } from '../../../../contracts/ders/ders';
import { DerslerService } from '../../../../services/common/model/dersler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KonularService } from '../../../../services/common/model/konular.service';
import { Konu } from '../../../../contracts/konu/konu';
import { ListAllKonu } from '../../../../contracts/konu/listAllKonu';
import { UpdateKonu } from '../../../../contracts/konu/konuUpdate';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';
import { SignalRService } from '../../../../services/common/signalr.service';
import { HubUrls } from '../../../../constants/hub-urls';
import { SendFunctions } from '../../../../constants/send-functions';
import { ReceiveFunctions } from '../../../../constants/receive-functions';

@Component({
  selector: 'app-single-konu',
  templateUrl: './single-konu.component.html',
  styleUrl: './single-konu.component.css'
})
export class SingleKonuComponent extends BaseComponent{
  isAytOrTytToggle:boolean=true;
  tytDersler:Ders[]=[];
  aytDersler:Ders[]=[];
  dersler:Ders[]=[];
  dersId:string;
  konuId:string;
  konu:ListAllKonu;
  konuAdi:string;
  tytKonuShow:boolean=true;
  selectedDersId:string;
  @ViewChild('txtKonuAdi') txtKonuAdi: ElementRef;
  constructor(spinner:NgxSpinnerService,private derslerService:DerslerService,
    private route:ActivatedRoute,private konularService:KonularService,
    private toastrService:CustomToastrService,private router:Router,private signalRService:SignalRService){
    super(spinner);
    signalRService.start(HubUrls.KonuHub)
  }
  async ngOnInit(){
    this.konuId=this.route.snapshot.paramMap.get('id') as string;
    this.konu=await this.konularService.getKonuById(this.konuId);
    this.konuAdi=this.konu.konuAdi;
    this.signalRService.on(HubUrls.KonuHub,ReceiveFunctions.KonuUpdatedMessage,async message=>{
      this.konu=await this.konularService.getKonuById(this.konuId);
      this.txtKonuAdi.nativeElement.value=this.konu.konuAdi;
      this.toastrService.message(message,"Bir Konu Güncellendi",{
        messageType:ToastrMessageType.Warning,
        position:ToastrPosition.TopRight
      })
    })
    this.dersler=(await this.derslerService.getAllDers()).dersler;
    this.tytDersler=this.dersler.filter(u=>u.isTyt===true);
    this.aytDersler=this.dersler.filter(u=>u.isTyt===false);
    this.dersId=this.konu.dersId;
    this.selectedDersId=this.konu.dersId;
  }
  isAytOrTyt(){
    this.isAytOrTytToggle = !this.isAytOrTytToggle;
    this.tytKonuShow=!this.tytKonuShow;
  }
  async findDersId(dersId:string){
    this.dersId=dersId;
    this.selectedDersId=dersId;
    const checkboxes = document.querySelectorAll('.konuCheckBox');
        checkboxes.forEach(checkbox => {
            if (checkbox.id !== dersId) {
                (checkbox as HTMLInputElement).checked=false;
            }
        });
  }
  async editKonu(konuAdi:string){
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating)
    const konuUpdate:UpdateKonu=new UpdateKonu();
    konuUpdate.konuAdi=konuAdi;
    konuUpdate.konuId=this.konuId;
    konuUpdate.dersId=this.selectedDersId;
    this.konularService.editKonu(konuUpdate,()=>{
      this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
      // this.toastrService.message("Konu","Konu başarıyla güncellendi.",{
      //   messageType:ToastrMessageType.Success,
      //   position:ToastrPosition.TopRight
      // });
      this.signalRService.invoke(HubUrls.KonuHub,SendFunctions.KonuUpdatedMessage,`${konuAdi} isimli konu güncellendi.`);
    },errorMessage => {
      this.toastrService.message(errorMessage,"Hata oluştu!",{
        messageType:ToastrMessageType.Error,
        position:ToastrPosition.TopRight
      });
    });
  }
}
