import { Component, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { CustomToastrService } from '../../../../services/common/custom-toastr.service';
import { DenemelerService } from '../../../../services/common/model/denemeler.service';

@Component({
  selector: 'app-ayt-analiz',
  templateUrl: './ayt-analiz.component.html',
  styleUrl: './ayt-analiz.component.css'
})
export class AytAnalizComponent extends BaseComponent{
  constructor(spinner:NgxSpinnerService,private denemelerService:DenemelerService,private toastrService:CustomToastrService) {
    super(spinner); 
    this.view = [innerWidth / 1.3, 400];
    this.dersAdi="Genel";
    this.alanAdi="Sayısal Netler";

  }

  async ngOnInit(){
    this.aytDenemeler=(await this.denemelerService.getAytDenemes(this.page,this.tableSize)).aytDenemes.sort((a, b) => new Date(a.tarih).getTime() - new Date(b.tarih).getTime());;
    
    this.aytDenemeNetler = [{
      name: 'aytDenemeler',
      series: this.aytDenemeler.map(aytDeneme => ({
        name: aytDeneme.tarih,
        value: aytDeneme.sayisalNet,
        extra:{
          matematikNet:aytDeneme.matematikNet,
          fizikNet:aytDeneme.fizikNet,
          biyolojiNet:aytDeneme.biyolojiNet,
          kimyaNet:aytDeneme.kimyaNet,
          sayisalNet:aytDeneme.sayisalNet
        }
      }
    ))
    }];
    
  }
  public dateTickFormatting(val: any): string {
    return new Date(val).toLocaleDateString();
  }
  onResize(event:any) {
    this.view = [event.target.innerWidth / 1.35, 400];
  } 
  async onTableSizeChange(event:any){
    this.tableSize=event.target.value;
    this.page=1;
    this.aytDenemeler=(await this.denemelerService.getAytDenemes(this.page,this.tableSize)).aytDenemes.sort((a, b) => new Date(a.tarih).getTime() - new Date(b.tarih).getTime());;
    if(this.alanAdi=="Eşit Ağırlık Netler" && this.dersAdi=="Genel"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.esitAgirlikNet,
          extra:{
            edebiyatNet:aytDeneme.edebiyatNet,
            matematikNet:aytDeneme.matematikNet,
            cografya1Net:aytDeneme.cografya1Net,
            tarih1Net:aytDeneme.tarih1Net,
            toplamNet:aytDeneme.esitAgirlikNet
          }
        }
      ))
      }];
    }
    else if(this.alanAdi=="Eşit Ağırlık Netler" && this.dersAdi=="Edebiyat"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.edebiyatNet,
          extra:{
            edebiyatDogru:aytDeneme.edebiyatDogru,
            edebiyatYanlis:aytDeneme.edebiyatYanlis,
            edebiyatNet:aytDeneme.edebiyatNet
          }
        }
      ))
      }];
    }
    else if(this.alanAdi=="Eşit Ağırlık Netler" && this.dersAdi=="Matematik"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.matematikNet,
          extra:{
            matematikDogru:aytDeneme.matematikDogru,
            matematikYanlis:aytDeneme.matematikYanlis,
            matematikNet:aytDeneme.matematikNet
          }
        }
      ))
      }];
    }
    else if(this.alanAdi=="Eşit Ağırlık Netler" && this.dersAdi=="Tarih-1"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.tarih1Net,
          extra:{
            tarih1Dogru:aytDeneme.tarih1Dogru,
            tarih1Yanlis:aytDeneme.tarih1Yanlis,
            tarih1Net:aytDeneme.tarih1Net
          }
        }
      ))
      }];
    }
    else if(this.alanAdi=="Eşit Ağırlık Netler" && this.dersAdi=="Coğrafya-1"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.cografya1Net,
          extra:{
            cografya1Dogru:aytDeneme.cografya1Dogru,
            cografya1Yanlis:aytDeneme.cografya1Yanlis,
            cografya1Net:aytDeneme.cografya1Net
          }
        }
      ))
      }];
    }

    //Sayısal Ders ve Netler 

    else if(this.alanAdi=="Sayısal Netler" && this.dersAdi=="Genel"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.sayisalNet,
          extra:{
            matematikNet:aytDeneme.matematikNet,
            fizikNet:aytDeneme.fizikNet,
            biyolojiNet:aytDeneme.biyolojiNet,
            kimyaNet:aytDeneme.kimyaNet,
            sayisalNet:aytDeneme.sayisalNet
          }
        }
      ))
      }];
    }
    else if(this.alanAdi=="Sayısal Netler" && this.dersAdi=="Matematik"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.matematikNet,
          extra:{
            matematikDogru:aytDeneme.matematikDogru,
            matematikYanlis:aytDeneme.matematikYanlis,
            matematikNet:aytDeneme.matematikNet
          }
        }
      ))
      }];
    }
    else if(this.alanAdi=="Sayısal Netler" && this.dersAdi=="Fizik"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.fizikNet,
          extra:{
            fizikDogru:aytDeneme.fizikDogru,
            fizikYanlis:aytDeneme.fizikYanlis,
            fizikNet:aytDeneme.fizikNet
          }
        }
      ))
      }];
    }
    else if(this.alanAdi=="Sayısal Netler" && this.dersAdi=="Kimya"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.kimyaNet,
          extra:{
            kimyaDogru:aytDeneme.kimyaDogru,
            kimyaYanlis:aytDeneme.kimyaYanlis,
            kimyaNet:aytDeneme.kimyaNet
          }
        }
      ))
      }];
    }
    else if(this.alanAdi=="Sayısal Netler" && this.dersAdi=="Biyoloji"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.biyolojiNet,
          extra:{
            biyolojiDogru:aytDeneme.biyolojiDogru,
            biyolojiYanlis:aytDeneme.biyolojiYanlis,
            biyolojiNet:aytDeneme.biyolojiNet
          }
        }
      ))
      }];
    }
    
    //Sözel Alan ve Dersler
    else if(this.alanAdi=="Sözel Netler" && this.dersAdi=="Genel"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.sozelNet,
          extra:{
            edebiyatNet:aytDeneme.edebiyatNet,
            cografya1Net:aytDeneme.cografya1Net,
            tarih1Net:aytDeneme.tarih1Net,
            dinNet:aytDeneme.dinNet,
            felsefeNet:aytDeneme.felsefeNet,
            cografya2Net:aytDeneme.cografya2Net,
            tarih2Net:aytDeneme.tarih2Net,
            toplamNet:aytDeneme.sozelNet
          }
        }
      ))
      }];
    }
    else if(this.alanAdi=="Sözel Netler" && this.dersAdi=="Edebiyat"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.edebiyatNet,
          extra:{
            edebiyatDogru:aytDeneme.edebiyatDogru,
            edebiyatYanlis:aytDeneme.edebiyatYanlis,
            edebiyatNet:aytDeneme.edebiyatNet
          }
        }
      ))
      }];
    }
    else if(this.alanAdi=="Sözel Netler" && this.dersAdi=="Tarih-1"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.tarih1Net,
          extra:{
            tarih1Dogru:aytDeneme.tarih1Dogru,
            tarih1Yanlis:aytDeneme.tarih1Yanlis,
            tarih1Net:aytDeneme.tarih1Net
          }
        }
      ))
      }];
    }
    else if(this.alanAdi=="Sözel Netler" && this.dersAdi=="Tarih-2"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.tarih2Net,
          extra:{
            tarih2Dogru:aytDeneme.tarih2Dogru,
            tarih2Yanlis:aytDeneme.tarih2Yanlis,
            tarih2Net:aytDeneme.tarih2Net
          }
        }
      ))
      }];
    }
    else if(this.alanAdi=="Sözel Netler" && this.dersAdi=="Coğrafya-1"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.cografya1Net,
          extra:{
            cografya1Dogru:aytDeneme.cografya1Dogru,
            cografya1Yanlis:aytDeneme.cografya1Yanlis,
            cografya1Net:aytDeneme.cografya1Net
          }
        }
      ))
      }];
    }
    else if(this.alanAdi=="Sözel Netler" && this.dersAdi=="Coğrafya-2"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.cografya2Net,
          extra:{
            cografya2Dogru:aytDeneme.cografya2Dogru,
            cografya2Yanlis:aytDeneme.cografya2Yanlis,
            cografya2Net:aytDeneme.cografya2Net
          }
        }
      ))
      }];
    }
    else if(this.alanAdi=="Sözel Netler" && this.dersAdi=="Felsefe"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.felsefeNet,
          extra:{
            felsefeDogru:aytDeneme.felsefeDogru,
            felsefeYanlis:aytDeneme.felsefeYanlis,
            felsefeNet:aytDeneme.felsefeNet
          }
        }
      ))
      }];
    }
    else if(this.alanAdi=="Sözel Netler" && this.dersAdi=="Din"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.dinNet,
          extra:{
            dinDogru:aytDeneme.dinDogru,
            dinYanlis:aytDeneme.dinYanlis,
            dinNet:aytDeneme.dinNet
          }
        }
      ))
      }];
    }
    else if(this.alanAdi=="Dil Netler"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.dilNet,
          extra:{
            dilDogru:aytDeneme.dilDogru,
            dilYanlis:aytDeneme.dilYanlis,
            toplamNet:aytDeneme.dilNet
          }
        }
      ))
      }];
    }
    
  } 
  async onAlanChange(event:any){
    this.alanAdi=event.target.value;
    this.dersAdi="Genel";
    if(this.alanAdi=="Eşit Ağırlık Netler"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.esitAgirlikNet,
          extra:{
            edebiyatNet:aytDeneme.edebiyatNet,
            matematikNet:aytDeneme.matematikNet,
            cografya1Net:aytDeneme.cografya1Net,
            tarih1Net:aytDeneme.tarih1Net,
            toplamNet:aytDeneme.esitAgirlikNet
          }
        }
      ))
      }];
    }
    else if(this.alanAdi=="Sayısal Netler"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.sayisalNet,
          extra:{
            matematikNet:aytDeneme.matematikNet,
            fizikNet:aytDeneme.fizikNet,
            biyolojiNet:aytDeneme.biyolojiNet,
            kimyaNet:aytDeneme.kimyaNet,
            sayisalNet:aytDeneme.sayisalNet
          }
        }
      ))
      }];
    }
    else if(this.alanAdi=="Sözel Netler"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.sozelNet,
          extra:{
            edebiyatNet:aytDeneme.edebiyatNet,
            cografya1Net:aytDeneme.cografya1Net,
            tarih1Net:aytDeneme.tarih1Net,
            dinNet:aytDeneme.dinNet,
            felsefeNet:aytDeneme.felsefeNet,
            cografya2Net:aytDeneme.cografya2Net,
            tarih2Net:aytDeneme.tarih2Net,
            toplamNet:aytDeneme.sozelNet
          }
        }
      ))
      }];
    }
    else if(this.alanAdi=="Dil Netler"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.dilNet,
          extra:{
            dilDogru:aytDeneme.dilDogru,
            dilYanlis:aytDeneme.dilYanlis,
            toplamNet:aytDeneme.dilNet
          }
        }
      ))
      }];
    }
  }
  async onDersChange(event:any){
    this.dersAdi=event.target.value;


    //Sayısal Dersler
    
    if(this.dersAdi=="Matematik" && this.alanAdi=="Sayısal Netler" ){
      console.log("a");
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.matematikNet,
          extra:{
            matematikDogru:aytDeneme.matematikDogru,
            matematikYanlis:aytDeneme.matematikYanlis,
            matematikNet:aytDeneme.matematikNet
          }
        }
      ))
      }];
    }
    
    else if(this.dersAdi=="Fizik" && this.alanAdi=="Sayısal Netler"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.fizikNet,
          extra:{
            fizikDogru:aytDeneme.fizikDogru,
            fizikYanlis:aytDeneme.fizikYanlis,
            fizikNet:aytDeneme.fizikNet
          }
        }
      ))
      }];
    }
    else if(this.dersAdi=="Kimya" && this.alanAdi=="Sayısal Netler"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.kimyaNet,
          extra:{
            kimyaDogru:aytDeneme.kimyaDogru,
            kimyaYanlis:aytDeneme.kimyaYanlis,
            kimyaNet:aytDeneme.kimyaNet
          }
        }
      ))
      }];
    }
    else if(this.dersAdi=="Biyoloji" && this.alanAdi=="Sayısal Netler"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.biyolojiNet,
          extra:{
            biyolojiDogru:aytDeneme.biyolojiDogru,
            biyolojiYanlis:aytDeneme.biyolojiYanlis,
            biyolojiNet:aytDeneme.biyolojiNet
          }
        }
      ))
      }];
    }
    else if(this.dersAdi=="Genel" && this.alanAdi=="Sayısal Netler"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.sayisalNet,
          extra:{
            matematikNet:aytDeneme.matematikNet,
            fizikNet:aytDeneme.fizikNet,
            biyolojiNet:aytDeneme.biyolojiNet,
            kimyaNet:aytDeneme.kimyaNet,
            sayisalNet:aytDeneme.sayisalNet
          }
        }
      ))
      }];
    }

    //Eşit Ağırlık Dersler
    else if(this.dersAdi=="Genel" && this.alanAdi=="Eşit Ağırlık Netler"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.esitAgirlikNet,
          extra:{
            edebiyatNet:aytDeneme.edebiyatNet,
            matematikNet:aytDeneme.matematikNet,
            cografya1Net:aytDeneme.cografya1Net,
            tarih1Net:aytDeneme.tarih1Net,
            toplamNet:aytDeneme.esitAgirlikNet
          }
        }
      ))
      }];
    }
    else if(this.dersAdi=="Edebiyat"  && this.alanAdi=="Eşit Ağırlık Netler"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.edebiyatNet,
          extra:{
            edebiyatDogru:aytDeneme.edebiyatDogru,
            edebiyatYanlis:aytDeneme.edebiyatYanlis,
            edebiyatNet:aytDeneme.edebiyatNet
          }
        }
      ))
      }];
    }
    else if(this.dersAdi=="Matematik"  && this.alanAdi=="Eşit Ağırlık Netler"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.matematikNet,
          extra:{
            matematikDogru:aytDeneme.matematikDogru,
            matematikYanlis:aytDeneme.matematikYanlis,
            matematikNet:aytDeneme.matematikNet
          }
        }
      ))
      }];
    }
    else if(this.dersAdi=="Tarih-1"  && this.alanAdi=="Eşit Ağırlık Netler"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.tarih1Net,
          extra:{
            tarih1Dogru:aytDeneme.tarih1Dogru,
            tarih1Yanlis:aytDeneme.tarih1Yanlis,
            tarih1Net:aytDeneme.tarih1Net
          }
        }
      ))
      }];
    }
    else if(this.dersAdi=="Coğrafya-1"  && this.alanAdi=="Eşit Ağırlık Netler"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.cografya1Net,
          extra:{
            cografya1Dogru:aytDeneme.cografya1Dogru,
            cografya1Yanlis:aytDeneme.cografya1Yanlis,
            cografya1Net:aytDeneme.cografya1Net
          }
        }
      ))
      }];
    }
    //Sözel Dersler
    else if(this.dersAdi=="Genel" && this.alanAdi=="Sözel Netler"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.sozelNet,
          extra:{
            edebiyatNet:aytDeneme.edebiyatNet,
            cografya1Net:aytDeneme.cografya1Net,
            tarih1Net:aytDeneme.tarih1Net,
            dinNet:aytDeneme.dinNet,
            felsefeNet:aytDeneme.felsefeNet,
            cografya2Net:aytDeneme.cografya2Net,
            tarih2Net:aytDeneme.tarih2Net,
            toplamNet:aytDeneme.sozelNet
          }
        }
      ))
      }];
    }
    else if(this.dersAdi=="Edebiyat"  && this.alanAdi=="Sözel Netler"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.edebiyatNet,
          extra:{
            edebiyatDogru:aytDeneme.edebiyatDogru,
            edebiyatYanlis:aytDeneme.edebiyatYanlis,
            edebiyatNet:aytDeneme.edebiyatNet
          }
        }
      ))
      }];
    }
    else if(this.dersAdi=="Tarih-1"  && this.alanAdi=="Sözel Netler"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.tarih1Net,
          extra:{
            tarih1Dogru:aytDeneme.tarih1Dogru,
            tarih1Yanlis:aytDeneme.tarih1Yanlis,
            tarih1Net:aytDeneme.tarih1Net
          }
        }
      ))
      }];
    }
    else if(this.dersAdi=="Coğrafya-1"  && this.alanAdi=="Sözel Netler"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.cografya1Net,
          extra:{
            cografya1Dogru:aytDeneme.cografya1Dogru,
            cografya1Yanlis:aytDeneme.cografya1Yanlis,
            cografya1Net:aytDeneme.cografya1Net
          }
        }
      ))
      }];
    }
    else if(this.dersAdi=="Tarih-2" && this.alanAdi=="Sözel Netler"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.tarih2Net,
          extra:{
            tarih2Dogru:aytDeneme.tarih2Dogru,
            tarih2Yanlis:aytDeneme.tarih2Yanlis,
            tarih2Net:aytDeneme.tarih2Net
          }
        }
      ))
      }];
    }
    else if(this.dersAdi=="Coğrafya-2" && this.alanAdi=="Sözel Netler"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.cografya2Net,
          extra:{
            cografya2Dogru:aytDeneme.cografya2Dogru,
            cografya2Yanlis:aytDeneme.cografya2Yanlis,
            cografya2Net:aytDeneme.cografya2Net
          }
        }
      ))
      }];
    }
    else if(this.dersAdi=="Felsefe" && this.alanAdi=="Sözel Netler"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.felsefeNet,
          extra:{
            felsefeDogru:aytDeneme.felsefeDogru,
            felsefeYanlis:aytDeneme.felsefeYanlis,
            felsefeNet:aytDeneme.felsefeNet
          }
        }
      ))
      }];
    }
    else if(this.dersAdi=="Din" && this.alanAdi=="Sözel Netler"){
      this.aytDenemeNetler = [{
        name: 'aytDenemeler',
        series: this.aytDenemeler.map(aytDeneme => ({
          name: aytDeneme.tarih,
          value: aytDeneme.dinNet,
          extra:{
            dinDogru:aytDeneme.dinDogru,
            dinYanlis:aytDeneme.dinYanlis,
            dinNet:aytDeneme.dinNet
          }
        }
      ))
      }];
    }
  }
  alanAdi:string="Sayısal Netler";
  dersAdi:string="Genel";
  title='pagination';
  aytDenemeler:any[];
  page:number=1;
  count:number=0;
  tableSize:number=5;
  tableSizes:any=[5,10,15,20,30,50];
  aytDenemeNetler:any[];
  alanlar:any=["Sayısal Netler","Eşit Ağırlık Netler","Sözel Netler","Dil Netler"];
  aytDerslerSayisal:any=["Genel","Matematik","Fizik","Kimya","Biyoloji"];
  aytDerslerSozel:any=["Genel","Edebiyat","Tarih-1","Coğrafya-1","Tarih-2","Coğrafya-2","Felsefe","Din"];
  aytDerslerEsitAgirlik:any=["Genel","Edebiyat","Matematik","Tarih-1","Coğrafya-1"];

  multi: any[];
  view:any;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Deneme Tarihi';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Toplam Net';
  private viewContainerRef: ViewContainerRef;
  showGridLines:boolean=false;

  colorScheme: Color = { 
    domain: ['var(--text-color)', 'var(--background-color)'], 
    group: ScaleType.Ordinal, 
    selectable: true, 
    name: 'Customer Usage', 
  };

}
