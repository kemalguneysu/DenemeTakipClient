import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Konu } from '../../../../contracts/konu/konu';
import { KonularService } from '../../../../services/common/model/konular.service';
import { DenemelerService } from '../../../../services/common/model/denemeler.service';
import { CreateTyt } from '../../../../contracts/tytDeneme/tytDenemeCreate';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';
import { Router } from '@angular/router';
import { SignalRService } from '../../../../services/common/signalr.service';
import { HubUrls } from '../../../../constants/hub-urls';
import { ReceiveFunctions } from '../../../../constants/receive-functions';
import { SendFunctions } from '../../../../constants/send-functions';

@Component({
  selector: 'app-tyt-create',
  templateUrl: './tyt-create.component.html',
  styleUrl: './tyt-create.component.css'
})
export class TytCreateComponent extends BaseComponent{
  constructor(spinner:NgxSpinnerService,private konularService:KonularService
    ,private denemelerService:DenemelerService,private toastrService:CustomToastrService
    ,private router:Router,private signalRService:SignalRService) {
    super(spinner);
    signalRService.start(HubUrls.TytHub)

  }
  tytSelectedYanlisId:string[]=[];
  tytSelectedBosId:string[]=[];

  tytKonular:Konu[]=[];
  tytTurkceKonular:Konu[]=[];
  tytMatematikKonular:Konu[]=[];
  tytFenKonular:Konu[]=[];
  tytSosyalKonular:Konu[]=[];
  showTytYanlis:boolean=false;
  showTytBos:boolean=false;
  yanlisKonuAcTyt:boolean=false;

  yanlisKonuTytTurkce:boolean=false;
  yanlisKonularTytTurkceAc:boolean=false;

  yanlisKonuTytMatematik:boolean=false;
  yanlisKonularTytMatematikAc:boolean=false;

  yanlisKonuTytFen:boolean=false;
  yanlisKonularTytFenAc:boolean=false;

  yanlisKonuTytSosyal:boolean=false;
  yanlisKonularTytSosyalAc:boolean=false;

  bosKonuAcTyt:boolean=false;

  bosKonuTytTurkce:boolean=false;
  bosKonularTytTurkceAc:boolean=false;

  bosKonuTytMatematik:boolean=false;
  bosKonularTytMatematikAc:boolean=false;

  bosKonuTytFen:boolean=false;
  bosKonularTytFenAc:boolean=false;

  bosKonuTytSosyal:boolean=false;
  bosKonularTytSosyalAc:boolean=false;

  @ViewChild('txtTurkceDogru') txtTurkceDogru: ElementRef;
  @ViewChild('txtTurkceYanlis') txtTurkceYanlis: ElementRef;
  @ViewChild('txtMatematikDogru') txtMatematikDogru: ElementRef;
  @ViewChild('txtMatematikYanlis') txtMatematikYanlis: ElementRef;
  @ViewChild('txtFenDogru') txtFenDogru: ElementRef;
  @ViewChild('txtFenYanlis') txtFenYanlis: ElementRef;
  @ViewChild('txtSosyalDogru') txtSosyalDogru: ElementRef;
  @ViewChild('txtSosyalYanlis') txtSosyalYanlis: ElementRef;
  async ngOnInit(){
    var butunKonular=await this.konularService.getAllKonu();
    this.tytKonular=butunKonular.filter(konu=>konu.isTyt===true);
    this.tytTurkceKonular=this.tytKonular.filter(konu=>konu.dersAdi=="Türkçe");
    this.tytMatematikKonular=this.tytKonular.filter(konu=>konu.dersAdi=="Matematik");
    this.tytFenKonular=this.tytKonular.filter(konu=>konu.dersAdi=="Fen");
    this.tytSosyalKonular=this.tytKonular.filter(konu=>konu.dersAdi=="Sosyal");
    
  }

  createTyt(turkceDogru:string,turkceYanlis:string,matematikDogru:string,matematikYanlis:string,fenDogru:string,fenYanlis:string,sosyalDogru:string,sosyalYanlis:string){
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating)
    const tytDenemeCreate:CreateTyt=new CreateTyt();
    tytDenemeCreate.turkceDogru=this.parseOrDefault(turkceDogru);
    tytDenemeCreate.turkceYanlis=this.parseOrDefault(turkceYanlis);
    tytDenemeCreate.matematikDogru=this.parseOrDefault(matematikDogru);
    tytDenemeCreate.matematikYanlis=this.parseOrDefault(matematikYanlis);
    tytDenemeCreate.fenDogru=this.parseOrDefault(fenDogru);
    tytDenemeCreate.fenYanlis=this.parseOrDefault(fenYanlis);
    tytDenemeCreate.sosyalDogru=this.parseOrDefault(sosyalDogru);
    tytDenemeCreate.sosyalYanlis=this.parseOrDefault(sosyalYanlis);
    tytDenemeCreate.yanlisKonularId=this.tytSelectedYanlisId
    tytDenemeCreate.bosKonularId=this.tytSelectedBosId;
    this.denemelerService.createTyt(tytDenemeCreate,()=>{
      this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
      this.toastrService.message("Tyt Denemesi","Tyt denemesi başarıyla eklendi.",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      });
      this.signalRService.invoke(HubUrls.TytHub, SendFunctions.TytAddedMessage, "Tyt denemesi eklendi.");
      // const currentUrl = this.router.url;
      // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      //   this.router.navigate([currentUrl]);
      // });
    this.txtTurkceDogru.nativeElement.value = '';
    this.txtTurkceYanlis.nativeElement.value = '';
    this.txtMatematikDogru.nativeElement.value = '';
    this.txtMatematikYanlis.nativeElement.value = '';
    this.txtFenDogru.nativeElement.value = '';
    this.txtFenYanlis.nativeElement.value = '';
    this.txtSosyalDogru.nativeElement.value = '';
    this.txtSosyalYanlis.nativeElement.value = '';
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

  onChangeTytYanlisCheckBox(value:string):void{
    if(this.tytSelectedYanlisId.includes(value))
      this.tytSelectedYanlisId = this.tytSelectedYanlisId.filter((item) => item !== value); 
    else
      this.tytSelectedYanlisId.push(value);

  }
  onChangeTytBosCheckBox(value:string):void{
    if(this.tytSelectedBosId.includes(value))
      this.tytSelectedBosId = this.tytSelectedBosId.filter((item) => item !== value); 
    else
      this.tytSelectedBosId.push(value);
  }
  yanlisKonuAc(){
    this.yanlisKonuAcTyt = !this.yanlisKonuAcTyt;
    this.showTytYanlis=!this.showTytYanlis;
  }
  yanlisKonuTytTurkceAc(){
    this.yanlisKonuTytTurkce=!this.yanlisKonuTytTurkce;
    this.yanlisKonularTytTurkceAc=!this.yanlisKonularTytTurkceAc;
  }
  yanlisKonuTytMatematikAc(){
    this.yanlisKonuTytMatematik=!this.yanlisKonuTytMatematik;
    this.yanlisKonularTytMatematikAc=!this.yanlisKonularTytMatematikAc;
  }
  yanlisKonuTytFenAc(){
    this.yanlisKonuTytFen=!this.yanlisKonuTytFen;
    this.yanlisKonularTytFenAc=!this.yanlisKonularTytFenAc;
  }
  yanlisKonuTytSosyalAc(){
    this.yanlisKonuTytSosyal=!this.yanlisKonuTytSosyal;
    this.yanlisKonularTytSosyalAc=!this.yanlisKonularTytSosyalAc;
  }

  bosKonuAc(){
    this.bosKonuAcTyt = !this.bosKonuAcTyt;
    this.showTytBos=!this.showTytBos;
  }
  bosKonuTytTurkceAc(){
    this.bosKonuTytTurkce=!this.bosKonuTytTurkce;
    this.bosKonularTytTurkceAc=!this.bosKonularTytTurkceAc;
  }
  bosKonuTytMatematikAc(){
    this.bosKonuTytMatematik=!this.bosKonuTytMatematik;
    this.bosKonularTytMatematikAc=!this.bosKonularTytMatematikAc;
  }
  bosKonuTytFenAc(){
    this.bosKonuTytFen=!this.bosKonuTytFen;
    this.bosKonularTytFenAc=!this.bosKonularTytFenAc;
  }
  bosKonuTytSosyalAc(){
    this.bosKonuTytSosyal=!this.bosKonuTytSosyal;
    this.bosKonularTytSosyalAc=!this.bosKonularTytSosyalAc;
  }
}
