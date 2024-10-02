import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { Konu } from '../../../../contracts/konu/konu';
import { TytSingleList, konularAdDers } from '../../../../contracts/tytDeneme/tytSingleList';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';
import { DenemelerService } from '../../../../services/common/model/denemeler.service';
import { KonularService } from '../../../../services/common/model/konular.service';
import { AytSingleList } from '../../../../contracts/aytDeneme/aytSingleList';
import { UpdateTyt } from '../../../../contracts/tytDeneme/tytUpdate';
import { UpdateAyt } from '../../../../contracts/aytDeneme/aytUpdate';
import { SignalRService } from '../../../../services/common/signalr.service';
import { HubUrls } from '../../../../constants/hub-urls';
import { ReceiveFunctions } from '../../../../constants/receive-functions';
import { SendFunctions } from '../../../../constants/send-functions';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-ayt-deneme',
  templateUrl: './ayt-deneme.component.html',
  styleUrl: './ayt-deneme.component.css'
})
export class AytDenemeComponent extends BaseComponent{
  aytDeneme:AytSingleList;
  id:string;

  matematikBosKonuId:string[];
  fizikBosKonuId:string[];
  kimyaBosKonuId:string[];
  biyolojiBosKonuId:string[];
  edebiyatBosKonuId:string[];
  tarih1BosKonuId:string[];
  cografya1BosKonuId:string[];
  tarih2BosKonuId:string[];
  cografya2BosKonuId:string[];
  dinBosKonuId:string[];
  felsefeBosKonuId:string[];
  dilBosKonuId:string[];

  matematikYanlisKonuId:string[];
  fizikYanlisKonuId:string[];
  kimyaYanlisKonuId:string[];
  biyolojiYanlisKonuId:string[];
  edebiyatYanlisKonuId:string[];
  tarih1YanlisKonuId:string[];
  cografya1YanlisKonuId:string[];
  tarih2YanlisKonuId:string[];
  cografya2YanlisKonuId:string[];
  dinYanlisKonuId:string[];
  felsefeYanlisKonuId:string[];
  dilYanlisKonuId:string[];

  matematikYanlisKonu:konularAdDers[];
  fizikYanlisKonu:konularAdDers[];
  kimyaYanlisKonu:konularAdDers[];
  biyolojiYanlisKonu:konularAdDers[];
  edebiyatYanlisKonu:konularAdDers[];
  tarih1YanlisKonu:konularAdDers[];
  cografya1YanlisKonu:konularAdDers[];
  tarih2YanlisKonu:konularAdDers[];
  cografya2YanlisKonu:konularAdDers[];
  dinYanlisKonu:konularAdDers[];
  felsefeYanlisKonu:konularAdDers[];
  dilYanlisKonu:konularAdDers[];

  matematikBosKonu:konularAdDers[];
  fizikBosKonu:konularAdDers[];
  kimyaBosKonu:konularAdDers[];
  biyolojiBosKonu:konularAdDers[];
  edebiyatBosKonu:konularAdDers[];
  tarih1BosKonu:konularAdDers[];
  cografya1BosKonu:konularAdDers[];
  tarih2BosKonu:konularAdDers[];
  cografya2BosKonu:konularAdDers[];
  dinBosKonu:konularAdDers[];
  felsefeBosKonu:konularAdDers[];
  dilBosKonu:konularAdDers[];


  duzenleAc:boolean=false;
  showAytYanlis:boolean=false;
  showAytBos:boolean=false;

  yanlisKonuAcAyt:boolean=false;
  bosKonuAcAyt:boolean=false;

  yanlisKonuAytMatematik:boolean=false;
  yanlisKonularAytMatematikAc:boolean=false;
  yanlisKonuAytFizik:boolean=false;
  yanlisKonularAytFizikAc:boolean=false;
  yanlisKonuAytKimya:boolean=false;
  yanlisKonularAytKimyaAc:boolean=false;
  yanlisKonuAytBiyoloji:boolean=false;
  yanlisKonularAytBiyolojiAc:boolean=false;

  yanlisKonuAytEdebiyat:boolean=false;
  yanlisKonularAytEdebiyatAc:boolean=false;
  yanlisKonuAytCografya1:boolean=false;
  yanlisKonularAytCografya1Ac:boolean=false;
  yanlisKonuAytTarih1:boolean=false;
  yanlisKonularAytTarih1Ac:boolean=false;
  yanlisKonuAytCografya2:boolean=false;
  yanlisKonularAytCografya2Ac:boolean=false;
  yanlisKonuAytTarih2:boolean=false;
  yanlisKonularAytTarih2Ac:boolean=false;
  yanlisKonuAytDin:boolean=false;
  yanlisKonularAytDinAc:boolean=false;
  yanlisKonuAytFelsefe:boolean=false;
  yanlisKonularAytFelsefeAc:boolean=false;

  yanlisKonuAytDil:boolean=false;
  yanlisKonularAytDilAc:boolean=false;

  bosKonuAytMatematik:boolean=false;
  bosKonularAytMatematikAc:boolean=false;
  bosKonuAytFizik:boolean=false;
  bosKonularAytFizikAc:boolean=false;
  bosKonuAytKimya:boolean=false;
  bosKonularAytKimyaAc:boolean=false;
  bosKonuAytBiyoloji:boolean=false;
  bosKonularAytBiyolojiAc:boolean=false;

  bosKonuAytEdebiyat:boolean=false;
  bosKonularAytEdebiyatAc:boolean=false;
  bosKonuAytCografya1:boolean=false;
  bosKonularAytCografya1Ac:boolean=false;
  bosKonuAytTarih1:boolean=false;
  bosKonularAytTarih1Ac:boolean=false;
  bosKonuAytCografya2:boolean=false;
  bosKonularAytCografya2Ac:boolean=false;
  bosKonuAytTarih2:boolean=false;
  bosKonularAytTarih2Ac:boolean=false;
  bosKonuAytDin:boolean=false;
  bosKonularAytDinAc:boolean=false;
  bosKonuAytFelsefe:boolean=false;
  bosKonularAytFelsefeAc:boolean=false;

  bosKonuAytDil:boolean=false;
  bosKonularAytDilAc:boolean=false;

  aytSelectedYanlisId:string[]=[];
  aytSelectedBosId:string[]=[];
  
  aytKonular:Konu[]=[];
  aytEdebiyatKonular:Konu[]=[];
  aytCografya1Konular:Konu[]=[];
  aytTarih1Konular:Konu[]=[];
  aytCografya2Konular:Konu[]=[];
  aytTarih2Konular:Konu[]=[];
  aytDinKonular:Konu[]=[];
  aytFelsefeKonular:Konu[]=[];
  aytDilKonular:Konu[]=[];
  aytMatematikKonular:Konu[]=[];
  aytFizikKonular:Konu[]=[];
  aytKimyaKonular:Konu[]=[];
  aytBiyolojiKonular:Konu[]=[];
  
  aytButunYanlisKonularId:string[]=[];
  aytButunBosKonularId:string[]=[];

  constructor(spinner:NgxSpinnerService,private denemelerService:DenemelerService,private route:ActivatedRoute
    ,private konularService:KonularService,private toastrService:CustomToastrService,private router:Router,private signalRService:SignalRService,private changeDetectorRef: ChangeDetectorRef) {
    super(spinner);
    signalRService.start(HubUrls.AytHub)
    
  }
  
  async ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id') as string;
    await this.getAyt(this.id);
    this.signalRService.on(HubUrls.AytHub,ReceiveFunctions.AytUpdatedMessage,async message=>{
      await this.getAyt(this.id);
      await this.setYanlisKonular();
      await this.setBosKonular();
      this.changeDetectorRef.detectChanges();
      this.duzenleAc=false;

    });
    await this.setYanlisKonular();
    await this.setBosKonular();
    await this.setKonular();
    // this.matematikBosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Matematik").map(konu=>konu.konuId);
    // this.fizikBosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Fizik").map(konu=>konu.konuId);
    // this.kimyaBosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Kimya").map(konu=>konu.konuId);
    // this.biyolojiBosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Biyoloji").map(konu=>konu.konuId);
    // this.edebiyatBosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Edebiyat").map(konu=>konu.konuId);
    // this.tarih1BosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Tarih1").map(konu=>konu.konuId);
    // this.cografya1BosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Coğrafya1").map(konu=>konu.konuId);
    // this.tarih2BosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Tarih2").map(konu=>konu.konuId);
    // this.cografya2BosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Coğrafya2").map(konu=>konu.konuId);
    // this.felsefeBosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Felsefe").map(konu=>konu.konuId);
    // this.dinBosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Din").map(konu=>konu.konuId);
    // this.dilBosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Dil").map(konu=>konu.konuId);


    // this.matematikYanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Matematik").map(konu=>konu.konuId);
    // this.fizikYanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Fizik").map(konu=>konu.konuId);
    // this.kimyaYanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Kimya").map(konu=>konu.konuId);
    // this.biyolojiYanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Biyoloji").map(konu=>konu.konuId);
    // this.edebiyatYanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Edebiyat").map(konu=>konu.konuId);
    // this.tarih1YanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Tarih1").map(konu=>konu.konuId);
    // this.cografya1YanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Coğrafya1").map(konu=>konu.konuId);
    // this.tarih2YanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Tarih2").map(konu=>konu.konuId);
    // this.cografya2YanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Coğrafya2").map(konu=>konu.konuId);
    // this.felsefeYanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Felsefe").map(konu=>konu.konuId);
    // this.dinYanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Din").map(konu=>konu.konuId);
    // this.dilYanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Dil").map(konu=>konu.konuId);

    // this.matematikBosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Matematik");
    // this.fizikBosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Fizik");
    // this.kimyaBosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Kimya");
    // this.biyolojiBosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Biyoloji");
    // this.edebiyatBosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Edebiyat");
    // this.tarih1BosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Tarih-1");
    // this.cografya1BosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Coğrafya1");
    // this.tarih2BosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Tarih2");
    // this.cografya2BosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Coğrafya2");
    // this.felsefeBosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Felsefe");
    // this.dinBosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Din");
    // this.dilBosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Dil");

    // this.matematikYanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Matematik");
    // this.fizikYanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Fizik");
    // this.kimyaYanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Kimya");
    // this.biyolojiYanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Biyoloji");
    // this.edebiyatYanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Edebiyat");
    // this.tarih1YanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Tarih1");
    // this.cografya1YanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Coğrafya1");
    // this.tarih2YanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Tarih2");
    // this.cografya2YanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Coğrafya2");
    // this.felsefeYanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Felsefe");
    // this.dinYanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Din");
    // this.dilYanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Dil");

    // this.aytButunYanlisKonularId=this.aytButunYanlisKonularId.concat(this.matematikYanlisKonuId,this.fizikYanlisKonuId,this.kimyaYanlisKonuId,this.biyolojiYanlisKonuId,this.edebiyatYanlisKonuId,this.tarih1YanlisKonuId,this.tarih2YanlisKonuId,this.cografya1YanlisKonuId,this.cografya2YanlisKonuId,this.dinYanlisKonuId,this.felsefeYanlisKonuId,this.dilYanlisKonuId);
    // this.aytButunBosKonularId=this.aytButunBosKonularId.concat(this.matematikBosKonuId,this.fizikBosKonuId,this.kimyaBosKonuId,this.biyolojiBosKonuId,this.edebiyatBosKonuId,this.tarih1BosKonuId,this.tarih2BosKonuId,this.cografya1BosKonuId,this.cografya2BosKonuId,this.dinBosKonuId,this.felsefeBosKonuId,this.dilBosKonuId);
    
    // var butunKonular=await this.konularService.getAllKonu();
    // this.aytKonular=butunKonular.filter(konu=>konu.isTyt===false);
    // this.aytMatematikKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Matematik");
    // this.aytKimyaKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Kimya");
    // this.aytBiyolojiKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Biyoloji");
    // this.aytFizikKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Fizik");
    // this.aytEdebiyatKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Edebiyat");
    // this.aytTarih1Konular=this.aytKonular.filter(konu=>konu.dersAdi=="Tarih1");
    // this.aytCografya1Konular=this.aytKonular.filter(konu=>konu.dersAdi=="Coğrafya1");
    // this.aytTarih2Konular=this.aytKonular.filter(konu=>konu.dersAdi=="Tarih2");
    // this.aytCografya2Konular=this.aytKonular.filter(konu=>konu.dersAdi=="Coğrafya2");
    // this.aytFelsefeKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Felsefe");
    // this.aytDinKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Din");
    // this.aytDilKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Dil");

    // this.aytSelectedBosId=this.aytSelectedBosId.concat(this.aytButunBosKonularId);
    // this.aytSelectedYanlisId=this.aytSelectedBosId.concat(this.aytButunYanlisKonularId);
  }
  async setKonular(){
    var butunKonular=await this.konularService.getAllKonu();
    this.aytKonular=butunKonular.filter(konu=>konu.isTyt===false);
    this.aytMatematikKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Matematik");
    this.aytKimyaKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Kimya");
    this.aytBiyolojiKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Biyoloji");
    this.aytFizikKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Fizik");
    this.aytEdebiyatKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Edebiyat");
    this.aytTarih1Konular=this.aytKonular.filter(konu=>konu.dersAdi=="Tarih1");
    this.aytCografya1Konular=this.aytKonular.filter(konu=>konu.dersAdi=="Coğrafya1");
    this.aytTarih2Konular=this.aytKonular.filter(konu=>konu.dersAdi=="Tarih2");
    this.aytCografya2Konular=this.aytKonular.filter(konu=>konu.dersAdi=="Coğrafya2");
    this.aytFelsefeKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Felsefe");
    this.aytDinKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Din");
    this.aytDilKonular=this.aytKonular.filter(konu=>konu.dersAdi=="Dil");
  }
  async setBosKonular(){
    this.matematikBosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Matematik").map(konu=>konu.konuId);
    this.fizikBosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Fizik").map(konu=>konu.konuId);
    this.kimyaBosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Kimya").map(konu=>konu.konuId);
    this.biyolojiBosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Biyoloji").map(konu=>konu.konuId);
    this.edebiyatBosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Edebiyat").map(konu=>konu.konuId);
    this.tarih1BosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Tarih1").map(konu=>konu.konuId);
    this.cografya1BosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Coğrafya1").map(konu=>konu.konuId);
    this.tarih2BosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Tarih2").map(konu=>konu.konuId);
    this.cografya2BosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Coğrafya2").map(konu=>konu.konuId);
    this.felsefeBosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Felsefe").map(konu=>konu.konuId);
    this.dinBosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Din").map(konu=>konu.konuId);
    this.dilBosKonuId=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Dil").map(konu=>konu.konuId);

    this.matematikBosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Matematik");
    this.fizikBosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Fizik");
    this.kimyaBosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Kimya");
    this.biyolojiBosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Biyoloji");
    this.edebiyatBosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Edebiyat");
    this.tarih1BosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Tarih-1");
    this.cografya1BosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Coğrafya1");
    this.tarih2BosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Tarih2");
    this.cografya2BosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Coğrafya2");
    this.felsefeBosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Felsefe");
    this.dinBosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Din");
    this.dilBosKonu=this.aytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Dil");
    this.aytButunBosKonularId=this.aytButunBosKonularId.concat(this.matematikBosKonuId,this.fizikBosKonuId,this.kimyaBosKonuId,this.biyolojiBosKonuId,this.edebiyatBosKonuId,this.tarih1BosKonuId,this.tarih2BosKonuId,this.cografya1BosKonuId,this.cografya2BosKonuId,this.dinBosKonuId,this.felsefeBosKonuId,this.dilBosKonuId);
    this.aytSelectedBosId=this.aytSelectedBosId.concat(this.aytButunBosKonularId);

  }
  async setYanlisKonular(){
    this.matematikYanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Matematik").map(konu=>konu.konuId);
    this.fizikYanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Fizik").map(konu=>konu.konuId);
    this.kimyaYanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Kimya").map(konu=>konu.konuId);
    this.biyolojiYanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Biyoloji").map(konu=>konu.konuId);
    this.edebiyatYanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Edebiyat").map(konu=>konu.konuId);
    this.tarih1YanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Tarih1").map(konu=>konu.konuId);
    this.cografya1YanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Coğrafya1").map(konu=>konu.konuId);
    this.tarih2YanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Tarih2").map(konu=>konu.konuId);
    this.cografya2YanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Coğrafya2").map(konu=>konu.konuId);
    this.felsefeYanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Felsefe").map(konu=>konu.konuId);
    this.dinYanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Din").map(konu=>konu.konuId);
    this.dilYanlisKonuId=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Dil").map(konu=>konu.konuId);

    this.matematikYanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Matematik");
    this.fizikYanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Fizik");
    this.kimyaYanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Kimya");
    this.biyolojiYanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Biyoloji");
    this.edebiyatYanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Edebiyat");
    this.tarih1YanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Tarih1");
    this.cografya1YanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Coğrafya1");
    this.tarih2YanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Tarih2");
    this.cografya2YanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Coğrafya2");
    this.felsefeYanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Felsefe");
    this.dinYanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Din");
    this.dilYanlisKonu=this.aytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Dil");
    this.aytButunYanlisKonularId=this.aytButunYanlisKonularId.concat(this.matematikYanlisKonuId,this.fizikYanlisKonuId,this.kimyaYanlisKonuId,this.biyolojiYanlisKonuId,this.edebiyatYanlisKonuId,this.tarih1YanlisKonuId,this.tarih2YanlisKonuId,this.cografya1YanlisKonuId,this.cografya2YanlisKonuId,this.dinYanlisKonuId,this.felsefeYanlisKonuId,this.dilYanlisKonuId);
    this.aytSelectedYanlisId=this.aytSelectedBosId.concat(this.aytButunYanlisKonularId);

  }
  async editAyt(matematikDogru:string,matematikYanlis:string,fizikDogru:string,fizikYanlis:string,kimyaDogru:string,kimyaYanlis:string,biyolojiDogru:string,biyolojiYanlis:string,edebiyatDogru:string,edebiyatYanlis:string,tarih1Dogru:string,tarih1Yanlis:string,cografya1Dogru:string,cografya1Yanlis:string,tarih2Dogru:string,tarih2Yanlis:string,cografya2Dogru:string,cografya2Yanlis:string,felsefeDogru:string,felsefeYanlis:string,dinDogru:string,dinYanlis:string,dilDogru:string,dilYanlis:string){
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating)
    const aytDenemeUpdate:UpdateAyt=new UpdateAyt();
    aytDenemeUpdate.matematikDogru=this.parseOrDefault(matematikDogru);
    aytDenemeUpdate.matematikYanlis=this.parseOrDefault(matematikYanlis);
    aytDenemeUpdate.kimyaDogru=this.parseOrDefault(kimyaDogru);
    aytDenemeUpdate.kimyaYanlis=this.parseOrDefault(kimyaYanlis);
    aytDenemeUpdate.biyolojiDogru=this.parseOrDefault(biyolojiDogru);
    aytDenemeUpdate.biyolojiYanlis=this.parseOrDefault(biyolojiYanlis);
    aytDenemeUpdate.fizikDogru=this.parseOrDefault(fizikDogru);
    aytDenemeUpdate.fizikYanlis=this.parseOrDefault(fizikYanlis);
    aytDenemeUpdate.edebiyatDogru=this.parseOrDefault(edebiyatDogru);
    aytDenemeUpdate.edebiyatYanlis=this.parseOrDefault(edebiyatYanlis);
    aytDenemeUpdate.tarih1Dogru=this.parseOrDefault(tarih1Dogru);
    aytDenemeUpdate.tarih1Yanlis=this.parseOrDefault(tarih1Yanlis);
    aytDenemeUpdate.tarih2Dogru=this.parseOrDefault(tarih2Dogru);
    aytDenemeUpdate.tarih2Yanlis=this.parseOrDefault(tarih2Yanlis);
    aytDenemeUpdate.cografya1Dogru=this.parseOrDefault(cografya1Dogru);
    aytDenemeUpdate.cografya1Yanlis=this.parseOrDefault(cografya1Yanlis);
    aytDenemeUpdate.cografya2Dogru=this.parseOrDefault(cografya2Dogru);
    aytDenemeUpdate.cografya2Yanlis=this.parseOrDefault(cografya2Yanlis);
    aytDenemeUpdate.dinDogru=this.parseOrDefault(dinDogru);
    aytDenemeUpdate.dinYanlis=this.parseOrDefault(dinYanlis);
    aytDenemeUpdate.felsefeDogru=this.parseOrDefault(felsefeDogru);
    aytDenemeUpdate.felsefeYanlis=this.parseOrDefault(felsefeYanlis);
    aytDenemeUpdate.dilDogru=this.parseOrDefault(dilDogru);
    aytDenemeUpdate.dilYanlis=this.parseOrDefault(dilYanlis);

    aytDenemeUpdate.yanlisKonular=this.aytSelectedYanlisId;
    aytDenemeUpdate.bosKonular=this.aytSelectedBosId;
    aytDenemeUpdate.aytId=this.id;

    this.denemelerService.editAyt(aytDenemeUpdate,async ()=>{
      this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
      this.toastrService.message("Ayt Denemesi","Ayt denemesi başarıyla güncellendi.",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      });
      this.signalRService.invoke(HubUrls.AytHub,SendFunctions.AytUpdatedMessage,"Ayt denemesi güncellendi.");

    },errorMessage => {
      this.toastrService.message(errorMessage,"Hata oluştu!",{
        messageType:ToastrMessageType.Error,
        position:ToastrPosition.TopRight
      });
    });
  }
  
  async getAyt(id:string){
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    const ayt:AytSingleList=await this.denemelerService.getAytById(id,()=>{
      this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    })
    this.aytDeneme=ayt;
  }
  parseOrDefault(value:any){
    if(isNaN(value) || value==null || value==""){
      return 0;
    }
    else 
      return parseInt(value);
  }
  duzenleFunc(){
    this.duzenleAc=!this.duzenleAc;
  }
  isCheckedYanlis(checkboxId: string): boolean {
    return this.aytButunYanlisKonularId.includes(checkboxId);
  }
  isCheckedBos(checkboxId: string): boolean {
    return this.aytButunBosKonularId.includes(checkboxId);
  }
  bosKonuAc(){
    this.bosKonuAcAyt = !this.bosKonuAcAyt;
    this.showAytBos=!this.showAytBos;
  }
  yanlisKonuAc(){
    this.yanlisKonuAcAyt = !this.yanlisKonuAcAyt;
    this.showAytYanlis=!this.showAytYanlis;
  }
  bosKonuAytMatematikAc(){
    this.bosKonuAytMatematik=!this.bosKonuAytMatematik;
    this.bosKonularAytMatematikAc=!this.bosKonularAytMatematikAc;
  }
  bosKonuAytFizikAc(){
    this.bosKonuAytFizik=!this.bosKonuAytFizik;
    this.bosKonularAytFizikAc=!this.bosKonularAytFizikAc;
  }
  bosKonuAytKimyaAc(){
    this.bosKonuAytKimya=!this.bosKonuAytKimya;
    this.bosKonularAytKimyaAc=!this.bosKonularAytKimyaAc;
  }
  bosKonuAytBiyolojiAc(){
    this.bosKonuAytBiyoloji=!this.bosKonuAytBiyoloji;
    this.bosKonularAytBiyolojiAc=!this.bosKonularAytBiyolojiAc;
  }
  bosKonuAytEdebiyatAc(){
    this.bosKonuAytEdebiyat=!this.bosKonuAytEdebiyat;
    this.bosKonularAytEdebiyatAc=!this.bosKonularAytEdebiyatAc;
  }
  bosKonuAytTarih1Ac(){
    this.bosKonuAytTarih1=!this.bosKonuAytTarih1;
    this.bosKonularAytTarih1Ac=!this.bosKonularAytTarih1Ac;
  }
  bosKonuAytCografya1Ac(){
    this.bosKonuAytCografya1=!this.bosKonuAytCografya1;
    this.bosKonularAytCografya1Ac=!this.bosKonularAytCografya1Ac;
  }
  bosKonuAytTarih2Ac(){
    this.bosKonuAytTarih2=!this.bosKonuAytTarih2;
    this.bosKonularAytTarih2Ac=!this.bosKonularAytTarih2Ac;
  }
  bosKonuAytCografya2Ac(){
    this.bosKonuAytCografya2=!this.bosKonuAytCografya2;
    this.bosKonularAytCografya2Ac=!this.bosKonularAytCografya2Ac;
  }
  bosKonuAytFelsefeAc(){
    this.bosKonuAytFelsefe=!this.bosKonuAytFelsefe;
    this.bosKonularAytFelsefeAc=!this.bosKonularAytFelsefeAc;
  }
  bosKonuAytDinAc(){
    this.bosKonuAytDin=!this.bosKonuAytDin;
    this.bosKonularAytDinAc=!this.bosKonularAytDinAc;
  }
  bosKonuAytDilAc(){
    this.bosKonuAytDil=!this.bosKonuAytDil;
    this.bosKonularAytDilAc=!this.bosKonularAytDilAc;
  }
  yanlisKonuAytMatematikAc(){
    this.yanlisKonuAytMatematik=!this.yanlisKonuAytMatematik;
    this.yanlisKonularAytMatematikAc=!this.yanlisKonularAytMatematikAc;
  }
  yanlisKonuAytFizikAc(){
    this.yanlisKonuAytFizik=!this.yanlisKonuAytFizik;
    this.yanlisKonularAytFizikAc=!this.yanlisKonularAytFizikAc;
  }
  yanlisKonuAytKimyaAc(){
    this.yanlisKonuAytKimya=!this.yanlisKonuAytKimya;
    this.yanlisKonularAytKimyaAc=!this.yanlisKonularAytKimyaAc;
  }
  yanlisKonuAytBiyolojiAc(){
    this.yanlisKonuAytBiyoloji=!this.yanlisKonuAytBiyoloji;
    this.yanlisKonularAytBiyolojiAc=!this.yanlisKonularAytBiyolojiAc;
  }
  yanlisKonuAytEdebiyatAc(){
    this.yanlisKonuAytEdebiyat=!this.yanlisKonuAytEdebiyat;
    this.yanlisKonularAytEdebiyatAc=!this.yanlisKonularAytEdebiyatAc;
  }
  yanlisKonuAytTarih1Ac(){
    this.yanlisKonuAytTarih1=!this.yanlisKonuAytTarih1;
    this.yanlisKonularAytTarih1Ac=!this.yanlisKonularAytTarih1Ac;
  }
  yanlisKonuAytCografya1Ac(){
    this.yanlisKonuAytCografya1=!this.yanlisKonuAytCografya1;
    this.yanlisKonularAytCografya1Ac=!this.yanlisKonularAytCografya1Ac;
  }
  yanlisKonuAytTarih2Ac(){
    this.yanlisKonuAytTarih2=!this.yanlisKonuAytTarih2;
    this.yanlisKonularAytTarih2Ac=!this.yanlisKonularAytTarih2Ac;
  }
  yanlisKonuAytCografya2Ac(){
    this.yanlisKonuAytCografya2=!this.yanlisKonuAytCografya2;
    this.yanlisKonularAytCografya2Ac=!this.yanlisKonularAytCografya2Ac;
  }
  yanlisKonuAytFelsefeAc(){
    this.yanlisKonuAytFelsefe=!this.yanlisKonuAytFelsefe;
    this.yanlisKonularAytFelsefeAc=!this.yanlisKonularAytFelsefeAc;
  }
  yanlisKonuAytDinAc(){
    this.yanlisKonuAytDin=!this.yanlisKonuAytDin;
    this.yanlisKonularAytDinAc=!this.yanlisKonularAytDinAc;
  }
  yanlisKonuAytDilAc(){
    this.yanlisKonuAytDil=!this.yanlisKonuAytDil;
    this.yanlisKonularAytDilAc=!this.yanlisKonularAytDilAc;
  }
  onChangeAytYanlisCheckBox(value:string):void{
    if(this.aytButunYanlisKonularId.includes(value))
      this.aytSelectedYanlisId = this.aytSelectedYanlisId.filter((item) => item !== value); 
    else
      this.aytSelectedYanlisId.push(value);
  }
  onChangeAytBosCheckBox(value:string):void{
    if(this.aytButunBosKonularId.includes(value))
      this.aytSelectedBosId = this.aytSelectedBosId.filter((item) => item !== value); 
    else
      this.aytSelectedBosId.push(value);
  }
}
