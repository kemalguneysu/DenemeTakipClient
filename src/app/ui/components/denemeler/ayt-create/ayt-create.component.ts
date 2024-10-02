import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { KonularService } from '../../../../services/common/model/konular.service';
import { DenemelerService } from '../../../../services/common/model/denemeler.service';
import { Konu } from '../../../../contracts/konu/konu';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';
import { CreateAyt } from '../../../../contracts/aytDeneme/CreateAyt';
import { Router } from '@angular/router';
import { HubUrls } from '../../../../constants/hub-urls';
import { SendFunctions } from '../../../../constants/send-functions';
import { SignalRService } from '../../../../services/common/signalr.service';

@Component({
  selector: 'app-ayt-create',
  templateUrl: './ayt-create.component.html',
  styleUrl: './ayt-create.component.css'
})
export class AytCreateComponent extends BaseComponent {
  constructor(spinner:NgxSpinnerService,private konularService:KonularService,private denemelerService:DenemelerService,
    private toastrService:CustomToastrService,private router:Router,private signalRService:SignalRService) {
    super(spinner);
    signalRService.start(HubUrls.AytHub)

  }
  @ViewChild('txtMatematikDogru') txtMatematikDogru: ElementRef;
  @ViewChild('txtMatematikYanlis') txtMatematikYanlis: ElementRef;
  @ViewChild('txtFizikDogru') txtFizikDogru: ElementRef;
  @ViewChild('txtFizikYanlis') txtFizikYanlis: ElementRef;
  @ViewChild('txtKimyaDogru') txtKimyaDogru: ElementRef;
  @ViewChild('txtKimyaYanlis') txtKimyaYanlis: ElementRef;
  @ViewChild('txtBiyolojiDogru') txtBiyolojiDogru: ElementRef;
  @ViewChild('txtBiyolojiYanlis') txtBiyolojiYanlis: ElementRef;
  @ViewChild('txtEdebiyatDogru') txtEdebiyatDogru: ElementRef;
  @ViewChild('txtEdebiyatYanlis') txtEdebiyatYanlis: ElementRef;
  @ViewChild('txtTarih1Dogru') txtTarih1Dogru: ElementRef;
  @ViewChild('txtTarih1Yanlis') txtTarih1Yanlis: ElementRef;
  @ViewChild('txtCografya1Dogru') txtCografya1Dogru: ElementRef;
  @ViewChild('txtCografya1Yanlis') txtCografya1Yanlis: ElementRef;
  @ViewChild('txtTarih2Dogru') txtTarih2Dogru: ElementRef;
  @ViewChild('txtTarih2Yanlis') txtTarih2Yanlis: ElementRef;
  @ViewChild('txtCografya2Dogru') txtCografya2Dogru: ElementRef;
  @ViewChild('txtCografya2Yanlis') txtCografya2Yanlis: ElementRef;
  @ViewChild('txtFelsefeDogru') txtFelsefeDogru: ElementRef;
  @ViewChild('txtFelsefeYanlis') txtFelsefeYanlis: ElementRef;
  @ViewChild('txtDinDogru') txtDinDogru: ElementRef;
  @ViewChild('txtDinYanlis') txtDinYanlis: ElementRef;
  @ViewChild('txtDilDogru') txtDilDogru: ElementRef;
  @ViewChild('txtDilYanlis') txtDilYanlis: ElementRef;
  aytSelectedYanlisId:string[]=[];
  aytSelectedBosId:string[]=[];

  aytKonular:Konu[]=[];
  aytMatematikKonular:Konu[]=[];
  aytFizikKonular:Konu[]=[];
  aytKimyaKonular:Konu[]=[];
  aytBiyolojiKonular:Konu[]=[];
  aytEdebiyatKonular:Konu[]=[];
  aytTarih1Konular:Konu[]=[];
  aytCografya1Konular:Konu[]=[];
  aytTarih2Konular:Konu[]=[];
  aytCografya2Konular:Konu[]=[];
  aytDinKonular:Konu[]=[];
  aytFelsefeKonular:Konu[]=[];
  aytDilKonular:Konu[]=[];

  showAytYanlis:boolean=false;
  showAytBos:boolean=false;

  yanlisKonuAcAyt:boolean=false;
  yanlisKonuAytMatematik:boolean=false;
  yanlisKonularAytMatematikAc:boolean=false;
  yanlisKonuAytFizik:boolean=false;
  yanlisKonularAytFizikAc:boolean=false;
  yanlisKonuAytBiyoloji:boolean=false;
  yanlisKonularAytBiyolojiAc:boolean=false;
  yanlisKonuAytKimya:boolean=false;
  yanlisKonularAytKimyaAc:boolean=false;
  yanlisKonuAytEdebiyat:boolean=false;
  yanlisKonularAytEdebiyatAc:boolean=false;
  yanlisKonuAytTarih1:boolean=false;
  yanlisKonularAytTarih1Ac:boolean=false;
  yanlisKonuAytTarih2:boolean=false;
  yanlisKonularAytTarih2Ac:boolean=false;
  yanlisKonuAytCografya1:boolean=false;
  yanlisKonularAytCografya1Ac:boolean=false;
  yanlisKonuAytCografya2:boolean=false;
  yanlisKonularAytCografya2Ac:boolean=false;
  yanlisKonuAytDin:boolean=false;
  yanlisKonularAytDinAc:boolean=false;
  yanlisKonuAytFelsefe:boolean=false;
  yanlisKonularAytFelsefeAc:boolean=false;
  yanlisKonuAytDil:boolean=false;
  yanlisKonularAytDilAc:boolean=false;

  bosKonuAcAyt:boolean=false;
  bosKonuAytMatematik:boolean=false;
  bosKonularAytMatematikAc:boolean=false;
  bosKonuAytFizik:boolean=false;
  bosKonularAytFizikAc:boolean=false;
  bosKonuAytBiyoloji:boolean=false;
  bosKonularAytBiyolojiAc:boolean=false;
  bosKonuAytKimya:boolean=false;
  bosKonularAytKimyaAc:boolean=false;
  bosKonuAytEdebiyat:boolean=false;
  bosKonularAytEdebiyatAc:boolean=false;
  bosKonuAytTarih1:boolean=false;
  bosKonularAytTarih1Ac:boolean=false;
  bosKonuAytTarih2:boolean=false;
  bosKonularAytTarih2Ac:boolean=false;
  bosKonuAytCografya1:boolean=false;
  bosKonularAytCografya1Ac:boolean=false;
  bosKonuAytCografya2:boolean=false;
  bosKonularAytCografya2Ac:boolean=false;
  bosKonuAytDin:boolean=false;
  bosKonularAytDinAc:boolean=false;
  bosKonuAytFelsefe:boolean=false;
  bosKonularAytFelsefeAc:boolean=false;
  bosKonuAytDil:boolean=false;
  bosKonularAytDilAc:boolean=false;

  async ngOnInit(){
    var butunKonular=await this.konularService.getAllKonu();
    this.aytKonular=butunKonular.filter(konu=>konu.isTyt===false)
    this.aytMatematikKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Matematik");
    this.aytBiyolojiKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Biyoloji");
    this.aytFizikKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Fizik");
    this.aytKimyaKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Kimya");
    this.aytEdebiyatKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Edebiyat");
    this.aytTarih1Konular=this.aytKonular.filter(konu=>konu.dersAdi=="Tarih1");
    this.aytCografya1Konular=this.aytKonular.filter(konu=>konu.dersAdi=="Coğrafya1");
    this.aytTarih2Konular=this.aytKonular.filter(konu=>konu.dersAdi=="Tarih2");
    this.aytCografya2Konular=this.aytKonular.filter(konu=>konu.dersAdi=="Coğrafya2");
    this.aytDinKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Din");
    this.aytFelsefeKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Felsefe");
    this.aytDilKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Dil");
  }

  async createAyt(matematikDogru:string,matematikYanlis:string,fizikDogru:string,fizikYanlis:string,biyolojiDogru:string,biyolojiYanlis:string,kimyaDogru:string,kimyaYanlis:string,edebiyatDogru:string,edebiyatYanlis:string,cografya1Dogru:string,cografya1Yanlis:string,
    tarih1Dogru:string,tarih1Yanlis:string,cografya2Dogru:string,cografya2Yanlis:string,tarih2Dogru:string,tarih2Yanlis:string,dinDogru:string,dinYanlis:string,felsefeDogru:string,felsefeYanlis:string,dilDogru:string,dilYanlis:string)
  {
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating)
    const aytDenemeCreate:CreateAyt=new CreateAyt();
    aytDenemeCreate.matematikDogru=this.parseOrDefault(matematikDogru);
    aytDenemeCreate.matematikYanlis=this.parseOrDefault(matematikYanlis);
    aytDenemeCreate.kimyaDogru=this.parseOrDefault(kimyaDogru);
    aytDenemeCreate.kimyaYanlis=this.parseOrDefault(kimyaYanlis);
    aytDenemeCreate.fizikDogru=this.parseOrDefault(fizikDogru);
    aytDenemeCreate.fizikYanlis=this.parseOrDefault(fizikYanlis);
    aytDenemeCreate.biyolojiDogru=this.parseOrDefault(biyolojiDogru);
    aytDenemeCreate.biyolojiYanlis=this.parseOrDefault(biyolojiYanlis);
    aytDenemeCreate.edebiyatDogru=this.parseOrDefault(edebiyatDogru);
    aytDenemeCreate.edebiyatYanlis=this.parseOrDefault(edebiyatYanlis);
    aytDenemeCreate.tarih1Dogru=this.parseOrDefault(tarih1Dogru);
    aytDenemeCreate.tarih1Yanlis=this.parseOrDefault(tarih1Yanlis);
    aytDenemeCreate.cografya1Dogru=this.parseOrDefault(cografya1Dogru);
    aytDenemeCreate.cografya1Yanlis=this.parseOrDefault(cografya1Yanlis);
    aytDenemeCreate.tarih2Dogru=this.parseOrDefault(tarih2Dogru);
    aytDenemeCreate.tarih2Yanlis=this.parseOrDefault(tarih2Yanlis);
    aytDenemeCreate.cografya2Dogru=this.parseOrDefault(cografya2Dogru);
    aytDenemeCreate.cografya2Yanlis=this.parseOrDefault(cografya2Yanlis);
    aytDenemeCreate.dinDogru=this.parseOrDefault(dinDogru);
    aytDenemeCreate.dinYanlis=this.parseOrDefault(dinYanlis);
    aytDenemeCreate.felsefeDogru=this.parseOrDefault(felsefeDogru);
    aytDenemeCreate.felsefeYanlis=this.parseOrDefault(felsefeYanlis);
    aytDenemeCreate.dilDogru=this.parseOrDefault(dilDogru);
    aytDenemeCreate.dilYanlis=this.parseOrDefault(dilYanlis);
    aytDenemeCreate.yanlisKonularId=this.aytSelectedYanlisId
    aytDenemeCreate.bosKonularId=this.aytSelectedBosId;
    this.denemelerService.createAyt(aytDenemeCreate,()=>{
      this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
      this.toastrService.message("Ayt Denemesi","Ayt denemesi başarıyla eklendi.",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      });
      this.signalRService.invoke(HubUrls.AytHub, SendFunctions.AytAddedMessage, "Ayt denemesi eklendi.");
      this.txtMatematikDogru.nativeElement.value = '';
      this.txtMatematikYanlis.nativeElement.value = '';
      this.txtFizikDogru.nativeElement.value = '';
      this.txtFizikYanlis.nativeElement.value = '';
      this.txtKimyaDogru.nativeElement.value = '';
      this.txtKimyaYanlis.nativeElement.value = '';
      this.txtBiyolojiDogru.nativeElement.value = '';
      this.txtBiyolojiYanlis.nativeElement.value = '';
      this.txtEdebiyatDogru.nativeElement.value = '';
      this.txtEdebiyatYanlis.nativeElement.value = '';
      this.txtTarih1Dogru.nativeElement.value = '';
      this.txtTarih1Yanlis.nativeElement.value = '';
      this.txtCografya1Dogru.nativeElement.value = '';
      this.txtCografya1Yanlis.nativeElement.value = '';
      this.txtTarih2Dogru.nativeElement.value = '';
      this.txtTarih2Yanlis.nativeElement.value = '';
      this.txtCografya2Dogru.nativeElement.value = '';
      this.txtCografya2Yanlis.nativeElement.value = '';
      this.txtFelsefeDogru.nativeElement.value = '';
      this.txtFelsefeYanlis.nativeElement.value = '';
      this.txtDinDogru.nativeElement.value = '';
      this.txtDinYanlis.nativeElement.value = '';
      this.txtDilDogru.nativeElement.value = '';
      this.txtDilYanlis.nativeElement.value = '';
      // const currentUrl = this.router.url;
      // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      //   this.router.navigate([currentUrl]);
      // });

    },errorMessage => {
      this.toastrService.message(errorMessage,"Hata oluştu!",{
        messageType:ToastrMessageType.Error,
        position:ToastrPosition.TopRight
      });
    });
  }

  parseOrDefault(value:any){
    if(isNaN(value) || value==null || value==""){
      return 0;
    }
    else 
      return parseInt(value);
  }

  onChangeAytYanlisCheckBox(value:string):void{
    if(this.aytSelectedYanlisId.includes(value))
      this.aytSelectedYanlisId = this.aytSelectedYanlisId.filter((item) => item !== value); 
    else
      this.aytSelectedYanlisId.push(value);
  }
  onChangeAytBosCheckBox(value:string):void{
    if(this.aytSelectedBosId.includes(value))
      this.aytSelectedBosId = this.aytSelectedYanlisId.filter((item) => item !== value); 
    else
      this.aytSelectedBosId.push(value);
  }
  yanlisKonuAc(){
    this.yanlisKonuAcAyt = !this.yanlisKonuAcAyt;
    this.showAytYanlis=!this.showAytYanlis;
  }
  yanlisKonuAytMatematikAc(){
    this.yanlisKonuAytMatematik=!this.yanlisKonuAytMatematik;
    this.yanlisKonularAytMatematikAc=!this.yanlisKonularAytMatematikAc;
  }
  yanlisKonuAytFizikAc(){
    this.yanlisKonuAytFizik=!this.yanlisKonuAytFizik;
    this.yanlisKonularAytFizikAc=!this.yanlisKonularAytFizikAc;
  }
  yanlisKonuAytBiyolojiAc(){
    this.yanlisKonuAytBiyoloji=!this.yanlisKonuAytBiyoloji;
    this.yanlisKonularAytBiyolojiAc=!this.yanlisKonularAytBiyolojiAc;
  }
  yanlisKonuAytKimyaAc(){
    this.yanlisKonuAytKimya=!this.yanlisKonuAytKimya;
    this.yanlisKonularAytKimyaAc=!this.yanlisKonularAytKimyaAc;
  }
  yanlisKonuAytEdebiyatAc(){
    this.yanlisKonuAytEdebiyat=!this.yanlisKonuAytEdebiyat;
    this.yanlisKonularAytEdebiyatAc=!this.yanlisKonularAytEdebiyatAc;
  }
  yanlisKonuAytTarih1Ac(){
    this.yanlisKonuAytTarih1=!this.yanlisKonuAytTarih1;
    this.yanlisKonularAytTarih1Ac=!this.yanlisKonularAytTarih1Ac;
  }
  yanlisKonuAytTarih2Ac(){
    this.yanlisKonuAytTarih2=!this.yanlisKonuAytTarih2;
    this.yanlisKonularAytTarih2Ac=!this.yanlisKonularAytTarih2Ac;
  }
  yanlisKonuAytCografya1Ac(){
    this.yanlisKonuAytCografya1=!this.yanlisKonuAytCografya1;
    this.yanlisKonularAytCografya1Ac=!this.yanlisKonularAytCografya1Ac;
  }
  yanlisKonuAytCografya2Ac(){
    this.yanlisKonuAytCografya2=!this.yanlisKonuAytCografya2;
    this.yanlisKonularAytCografya2Ac=!this.yanlisKonularAytCografya2Ac;
  }
  yanlisKonuAytDinAc(){
    this.yanlisKonuAytDin=!this.yanlisKonuAytDin;
    this.yanlisKonularAytDinAc=!this.yanlisKonularAytDinAc;
  }
  yanlisKonuAytFelsefeAc(){
    this.yanlisKonuAytFelsefe=!this.yanlisKonuAytFelsefe;
    this.yanlisKonularAytFelsefeAc=!this.yanlisKonularAytFelsefeAc;
  }
  yanlisKonuAytDilAc(){
    this.yanlisKonuAytDil=!this.yanlisKonuAytDil;
    this.yanlisKonularAytDilAc=!this.yanlisKonularAytDilAc;
  }
  
  bosKonuAc(){
    this.bosKonuAcAyt = !this.bosKonuAcAyt;
    this.showAytBos=!this.showAytBos;
  }
  bosKonuAytMatematikAc(){
    this.bosKonuAytMatematik=!this.bosKonuAytMatematik;
    this.bosKonularAytMatematikAc=!this.bosKonularAytMatematikAc;
  }
  bosKonuAytFizikAc(){
    this.bosKonuAytFizik=!this.bosKonuAytFizik;
    this.bosKonularAytFizikAc=!this.bosKonularAytFizikAc;
  }
  bosKonuAytBiyolojiAc(){
    this.bosKonuAytBiyoloji=!this.bosKonuAytBiyoloji;
    this.bosKonularAytBiyolojiAc=!this.bosKonularAytBiyolojiAc;
  }
  bosKonuAytKimyaAc(){
    this.bosKonuAytKimya=!this.bosKonuAytKimya;
    this.bosKonularAytKimyaAc=!this.bosKonularAytKimyaAc;
  }
  bosKonuAytEdebiyatAc(){
    this.bosKonuAytEdebiyat=!this.bosKonuAytEdebiyat;
    this.bosKonularAytEdebiyatAc=!this.bosKonularAytEdebiyatAc;
  }
  bosKonuAytTarih1Ac(){
    this.bosKonuAytTarih1=!this.bosKonuAytTarih1;
    this.bosKonularAytTarih1Ac=!this.bosKonularAytTarih1Ac;
  }
  bosKonuAytTarih2Ac(){
    this.bosKonuAytTarih2=!this.bosKonuAytTarih2;
    this.bosKonularAytTarih2Ac=!this.bosKonularAytTarih2Ac;
  }
  bosKonuAytCografya1Ac(){
    this.bosKonuAytCografya1=!this.bosKonuAytCografya1;
    this.bosKonularAytCografya1Ac=!this.bosKonularAytCografya1Ac;
  }
  bosKonuAytCografya2Ac(){
    this.bosKonuAytCografya2=!this.bosKonuAytCografya2;
    this.bosKonularAytCografya2Ac=!this.bosKonularAytCografya2Ac;
  }
  bosKonuAytDinAc(){
    this.bosKonuAytDin=!this.bosKonuAytDin;
    this.bosKonularAytDinAc=!this.bosKonularAytDinAc;
  }
  bosKonuAytFelsefeAc(){
    this.bosKonuAytFelsefe=!this.bosKonuAytFelsefe;
    this.bosKonularAytFelsefeAc=!this.bosKonularAytFelsefeAc;
  }
  bosKonuAytDilAc(){
    this.bosKonuAytDil=!this.bosKonuAytDil;
    this.bosKonularAytDilAc=!this.bosKonularAytDilAc;
  }

}
