import { ChangeDetectorRef, Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreateTyt } from '../../../../contracts/tytDeneme/tytDenemeCreate';
import { DenemelerService } from '../../../../services/common/model/denemeler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TytSingleList, konularAdDers } from '../../../../contracts/tytDeneme/tytSingleList';
import { KonularService } from '../../../../services/common/model/konular.service';
import { Konu } from '../../../../contracts/konu/konu';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';
import { UpdateTyt } from '../../../../contracts/tytDeneme/tytUpdate';
import { SignalRService } from '../../../../services/common/signalr.service';
import { ReceiveFunctions } from '../../../../constants/receive-functions';
import { HubUrls } from '../../../../constants/hub-urls';
import { SendFunctions } from '../../../../constants/send-functions';

@Component({
  selector: 'app-deneme',
  templateUrl: './deneme.component.html',
  styleUrl: './deneme.component.css'
})
export class DenemeComponent extends BaseComponent{
  tytDeneme:TytSingleList;
  fenBosKonuId:string[];
  sosyalBosKonuId:string[];
  matematikBosKonuId:string[];
  turkceBosKonuId:string[];
  fenYanlisKonuId:string[];
  sosyalYanlisKonuId:string[];
  matematikYanlisKonuId:string[];
  turkceYanlisKonuId:string[];
  id:string;

  fenBosKonu:konularAdDers[];
  sosyalBosKonu:konularAdDers[];
  matematikBosKonu:konularAdDers[];
  turkceBosKonu:konularAdDers[];
  fenYanlisKonu:konularAdDers[];
  sosyalYanlisKonu:konularAdDers[];
  matematikYanlisKonu:konularAdDers[];
  turkceYanlisKonu:konularAdDers[];

  duzenleAc:boolean=false;

  showTytYanlis:boolean=false;
  showTytBos:boolean=false;

  yanlisKonuAcTyt:boolean=false;
  bosKonuAcTyt:boolean=false;

  yanlisKonuTytTurkce:boolean=false;
  yanlisKonularTytTurkceAc:boolean=false;

  yanlisKonuTytMatematik:boolean=false;
  yanlisKonularTytMatematikAc:boolean=false;

  yanlisKonuTytFen:boolean=false;
  yanlisKonularTytFenAc:boolean=false;

  yanlisKonuTytSosyal:boolean=false;
  yanlisKonularTytSosyalAc:boolean=false;

  bosKonuTytTurkce:boolean=false;
  bosKonularTytTurkceAc:boolean=false;

  bosKonuTytMatematik:boolean=false;
  bosKonularTytMatematikAc:boolean=false;

  bosKonuTytFen:boolean=false;
  bosKonularTytFenAc:boolean=false;

  bosKonuTytSosyal:boolean=false;
  bosKonularTytSosyalAc:boolean=false;

  tytSelectedYanlisId:string[]=[];
  tytSelectedBosId:string[]=[];
  
  tytKonular:Konu[]=[];
  tytTurkceKonular:Konu[]=[];
  tytMatematikKonular:Konu[]=[];
  tytFenKonular:Konu[]=[];
  tytSosyalKonular:Konu[]=[];
  
  tytButunYanlisKonularId:string[]=[];
  tytButunBosKonularId:string[]=[];

  constructor(spinner:NgxSpinnerService,private denemelerService:DenemelerService,
    private route:ActivatedRoute,private konularService:KonularService,private toastrService:CustomToastrService,
    private router:Router,private signalRService:SignalRService,private changeDetectorRef: ChangeDetectorRef) {
    super(spinner);
    signalRService.start(HubUrls.TytHub)
    
  }

  async ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id') as string;
    await this.getTyt(this.id);
    this.signalRService.on(HubUrls.TytHub,ReceiveFunctions.TytUpdatedMessage,async message=>{
      await this.getTyt(this.id);
      await this.setYanlisKonular();
      await this.setBosKonular();
      this.changeDetectorRef.detectChanges();
      this.duzenleAc=false;

    });
    await this.setBosKonular();
    await this.setYanlisKonular();
    await this.setKonular();
    // this.turkceBosKonuId= this.tytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Türkçe").map(konu=>konu.konuId);
    // this.matematikBosKonuId=this.tytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Matematik").map(konu=>konu.konuId);
    // this.fenBosKonuId=this.tytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Fen").map(konu=>konu.konuId);
    // this.sosyalBosKonuId=this.tytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Sosyal").map(konu=>konu.konuId);
    // this.turkceYanlisKonuId=this.tytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Türkçe").map(konu=>konu.konuId);
    // this.matematikYanlisKonuId=this.tytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Matematik").map(konu=>konu.konuId);
    // this.fenYanlisKonuId=this.tytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Fen").map(konu=>konu.konuId);
    // this.sosyalYanlisKonuId=this.tytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Sosyal").map(konu=>konu.konuId);
    // this.turkceBosKonu= this.tytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Türkçe");
    // this.matematikBosKonu=this.tytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Matematik");
    // this.fenBosKonu=this.tytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Fen");
    // this.sosyalBosKonu=this.tytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Sosyal");
    // this.turkceYanlisKonu=this.tytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Türkçe");
    // this.matematikYanlisKonu=this.tytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Matematik");
    // this.fenYanlisKonu=this.tytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Fen");
    // this.sosyalYanlisKonu=this.tytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Sosyal");
    // this.tytButunYanlisKonularId=this.tytButunYanlisKonularId.concat(this.matematikYanlisKonuId,this.turkceYanlisKonuId,this.fenYanlisKonuId,this.sosyalYanlisKonuId);
    // this.tytButunBosKonularId=this.tytButunBosKonularId.concat(this.matematikBosKonuId,this.turkceBosKonuId,this.fenBosKonuId,this.sosyalBosKonuId);
    // var butunKonular=await this.konularService.getAllKonu();
    // this.tytKonular=butunKonular.filter(konu=>konu.isTyt===true);
    // this.tytTurkceKonular=this.tytKonular.filter(konu=>konu.dersAdi=="Türkçe");
    // this.tytMatematikKonular=this.tytKonular.filter(konu=>konu.dersAdi=="Matematik");
    // this.tytFenKonular=this.tytKonular.filter(konu=>konu.dersAdi=="Fen");
    // this.tytSosyalKonular=this.tytKonular.filter(konu=>konu.dersAdi=="Sosyal");
    // this.tytSelectedBosId=this.tytSelectedBosId.concat(this.tytButunBosKonularId);
    // this.tytSelectedYanlisId=this.tytSelectedYanlisId.concat(this.tytButunYanlisKonularId);
    
  }
  
  async getTyt(id:string){
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    const tyt:TytSingleList=await this.denemelerService.getTytById(id,()=>{
      this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    })
    this.tytDeneme=tyt;
  }
  async setKonular(){
    var butunKonular=await this.konularService.getAllKonu();
    this.tytKonular=butunKonular.filter(konu=>konu.isTyt===true);
    this.tytTurkceKonular=this.tytKonular.filter(konu=>konu.dersAdi=="Türkçe");
    this.tytMatematikKonular=this.tytKonular.filter(konu=>konu.dersAdi=="Matematik");
    this.tytFenKonular=this.tytKonular.filter(konu=>konu.dersAdi=="Fen");
    this.tytSosyalKonular=this.tytKonular.filter(konu=>konu.dersAdi=="Sosyal");
  }
  async setBosKonular(){
    this.turkceBosKonuId= this.tytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Türkçe").map(konu=>konu.konuId);
    this.matematikBosKonuId=this.tytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Matematik").map(konu=>konu.konuId);
    this.fenBosKonuId=this.tytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Fen").map(konu=>konu.konuId);
    this.sosyalBosKonuId=this.tytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Sosyal").map(konu=>konu.konuId);
    
    this.turkceBosKonu= this.tytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Türkçe");
    this.matematikBosKonu=this.tytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Matematik");
    this.fenBosKonu=this.tytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Fen");
    this.sosyalBosKonu=this.tytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Sosyal");

    this.tytButunBosKonularId=this.tytButunBosKonularId.concat(this.matematikBosKonuId,this.turkceBosKonuId,this.fenBosKonuId,this.sosyalBosKonuId);
    this.tytSelectedBosId=this.tytSelectedBosId.concat(this.tytButunBosKonularId);

  }
  async setYanlisKonular(){
    this.turkceYanlisKonuId=this.tytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Türkçe").map(konu=>konu.konuId);
    this.matematikYanlisKonuId=this.tytDeneme.bosKonularAdDers.filter(u=>u.dersAdi=="Matematik").map(konu=>konu.konuId);
    this.fenYanlisKonuId=this.tytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Fen").map(konu=>konu.konuId);
    this.sosyalYanlisKonuId=this.tytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Sosyal").map(konu=>konu.konuId);

    this.turkceYanlisKonu=this.tytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Türkçe");
    this.matematikYanlisKonu=this.tytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Matematik");
    this.fenYanlisKonu=this.tytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Fen");
    this.sosyalYanlisKonu=this.tytDeneme.yanlisKonularAdDers.filter(u=>u.dersAdi=="Sosyal");

    this.tytButunYanlisKonularId=this.tytButunYanlisKonularId.concat(this.matematikYanlisKonuId,this.turkceYanlisKonuId,this.fenYanlisKonuId,this.sosyalYanlisKonuId);
    this.tytSelectedYanlisId=this.tytSelectedYanlisId.concat(this.tytButunYanlisKonularId);

  }
  async editTyt(turkceDogru:string,turkceYanlis:string,matematikDogru:string,matematikYanlis:string,fenDogru:string,fenYanlis:string,sosyalDogru:string,sosyalYanlis:string){
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating)
    const tytDenemeUpdate:UpdateTyt=new UpdateTyt();
    tytDenemeUpdate.turkceDogru=this.parseOrDefault(turkceDogru);
    tytDenemeUpdate.turkceYanlis=this.parseOrDefault(turkceYanlis);
    tytDenemeUpdate.matematikDogru=this.parseOrDefault(matematikDogru);
    tytDenemeUpdate.matematikYanlis=this.parseOrDefault(matematikYanlis);
    tytDenemeUpdate.fenDogru=this.parseOrDefault(fenDogru);
    tytDenemeUpdate.fenYanlis=this.parseOrDefault(fenYanlis);
    tytDenemeUpdate.sosyalDogru=this.parseOrDefault(sosyalDogru);
    tytDenemeUpdate.sosyalYanlis=this.parseOrDefault(sosyalYanlis);
    tytDenemeUpdate.yanlisKonular=this.tytSelectedYanlisId;
    tytDenemeUpdate.bosKonular=this.tytSelectedBosId;
    tytDenemeUpdate.tytId=this.id;
    this.denemelerService.editTyt(tytDenemeUpdate,async ()=>{
      this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
      this.toastrService.message("Tyt Denemesi","Tyt denemesi başarıyla güncellendi.",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      });
      this.signalRService.invoke(HubUrls.TytHub,SendFunctions.TytUpdatedMessage,"Tyt denemesi güncellendi.");

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
  duzenleFunc(){
    this.duzenleAc=!this.duzenleAc;
  }
  isCheckedYanlis(checkboxId: string): boolean {
    return this.tytButunYanlisKonularId.includes(checkboxId);
  }
  isCheckedBos(checkboxId: string): boolean {
    return this.tytButunBosKonularId.includes(checkboxId);
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
  yanlisKonuAc(){
    this.yanlisKonuAcTyt = !this.yanlisKonuAcTyt;
    this.showTytYanlis=!this.showTytYanlis;
  }
  onChangeTytYanlisCheckBox(value:string):void{
    if(this.tytSelectedYanlisId.includes(value) || this.tytButunYanlisKonularId.includes(value))
      this.tytSelectedYanlisId = this.tytSelectedYanlisId.filter((item) => item !== value); 
    else
      this.tytSelectedYanlisId.push(value);

  }
  onChangeTytBosCheckBox(value:string):void{
    if(this.tytSelectedBosId.includes(value) || this.tytButunBosKonularId.includes(value))
      this.tytSelectedBosId = this.tytSelectedBosId.filter((item) => item !== value); 
    else
      this.tytSelectedBosId.push(value);
  }
}
