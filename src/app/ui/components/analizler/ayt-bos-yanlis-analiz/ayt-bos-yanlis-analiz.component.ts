import { Component, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DenemelerService } from '../../../../services/common/model/denemeler.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { DerslerService } from '../../../../services/common/model/dersler.service';
import { Ders } from '../../../../contracts/ders/ders';

@Component({
  selector: 'app-ayt-bos-yanlis-analiz',
  templateUrl: './ayt-bos-yanlis-analiz.component.html',
  styleUrl: './ayt-bos-yanlis-analiz.component.css'
})
export class AytBosYanlisAnalizComponent extends BaseComponent{
  constructor(spinner:NgxSpinnerService,private denemelerService:DenemelerService,private derslerService:DerslerService){
    super(spinner);
    this.view = [innerWidth / 1.3, 400];

  }
  async ngOnInit(){
    this.dersler=(await this.derslerService.getAllDers()).dersler.filter(u=>u.isTyt==false);
    this.sayisalDersler = this.dersler.filter(
      ders => 
        ders.dersAdi === 'Matematik' ||
        ders.dersAdi === 'Fizik' ||
        ders.dersAdi === 'Kimya' ||
        ders.dersAdi === 'Biyoloji'
    );
    this.esitagirlikDersler = this.dersler.filter(
      ders => 
        ders.dersAdi === 'Matematik' ||
        ders.dersAdi === 'Edebiyat' ||
        ders.dersAdi === 'Tarih1' ||
        ders.dersAdi === 'Coğrafya1'
    );
    this.sozelDersler = this.dersler.filter(
      ders => 
        ders.dersAdi === 'Edebiyat' ||
        ders.dersAdi === 'Tarih1' ||
        ders.dersAdi === 'Coğrafya1' ||
        ders.dersAdi === 'Tarih2' ||
        ders.dersAdi === 'Coğrafya2' ||
        ders.dersAdi === 'Din'||
        ders.dersAdi === 'Felsefe'
    );
  this.dersId=this.dersler.find(u=>u.dersAdi=="Matematik")?.id;
  this.aytYanlis=(await this.denemelerService.getAytYanlisAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeYanlisAnaliz;
  this.aytYanlisBoslar=this.aytYanlis
    .map(item=>({
      name:item.konuAdi,
      value:item.yanlisSayisi
    }));
  }
  onResize(event:any) {
    this.view = [event.target.innerWidth / 1.35, 400];
  } 
  async onTableSizeChange(event:any){
    this.tableSize=event.target.value;
    if(this.konuTur=="Yanlış"){
      this.aytYanlis=(await this.denemelerService.getAytYanlisAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeYanlisAnaliz;
      this.aytYanlisBoslar=this.aytYanlis
        .map(item=>({
          name:item.konuAdi,
          value:item.yanlisSayisi
        }));
    }
    else if(this.konuTur=="Boş"){
      this.aytYanlis=(await this.denemelerService.getAytBosAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeBosAnaliz;
      this.aytYanlisBoslar=this.aytYanlis
        .map(item=>({
          name:item.konuAdi,
          value:item.bosSayisi
        }));
    }
  }
  async onDersChange(event:any){
    this.dersId=event.target.value;
    if(this.konuTur=="Yanlış"){
      this.aytYanlis=(await this.denemelerService.getAytYanlisAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeYanlisAnaliz;
      this.aytYanlisBoslar=this.aytYanlis
        .map(item=>({
          name:item.konuAdi,
          value:item.yanlisSayisi
        }));
    }
    else if(this.konuTur=="Boş"){
      this.aytYanlis=(await this.denemelerService.getAytBosAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeBosAnaliz;
      this.aytYanlisBoslar=this.aytYanlis
        .map(item=>({
          name:item.konuAdi,
          value:item.bosSayisi
        }));
    }

  }
  async onKonuSizeChange(event:any){
    this.konuSize=Number(event.target.value);
    if(this.konuTur=="Yanlış"){
      this.aytYanlis=(await this.denemelerService.getAytYanlisAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeYanlisAnaliz;
      this.aytYanlisBoslar=this.aytYanlis
        .map(item=>({
          name:item.konuAdi,
          value:item.yanlisSayisi
        }));
    }
    else if(this.konuTur=="Boş"){
      this.aytYanlis=(await this.denemelerService.getAytBosAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeBosAnaliz;
      this.aytYanlisBoslar=this.aytYanlis
        .map(item=>({
          name:item.konuAdi,
          value:item.bosSayisi
        }));
    }
   
  }
  async onKonuTurChange(event:any){
    this.konuTur=event.target.value;
    if(this.konuTur=="Yanlış"){
      this.aytYanlis=(await this.denemelerService.getAytYanlisAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeYanlisAnaliz;
      this.aytYanlisBoslar=this.aytYanlis
        .map(item=>({
          name:item.konuAdi,
          value:item.yanlisSayisi
        }));
    }
    else if(this.konuTur=="Boş"){
      this.aytYanlis=(await this.denemelerService.getAytBosAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeBosAnaliz;
      this.aytYanlisBoslar=this.aytYanlis
        .map(item=>({
          name:item.konuAdi,
          value:item.bosSayisi
        }));
    }
    
  }
  async onAlanChange(event:any){
    this.alanTur=event.target.value;
    if(this.alanTur=="Sayısal"){
      this.dersId=this.dersler.find(u=>u.dersAdi=="Matematik")?.id;
      if(this.konuTur=="Yanlış"){
        this.aytYanlis=(await this.denemelerService.getAytYanlisAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeYanlisAnaliz;
        this.aytYanlisBoslar=this.aytYanlis
          .map(item=>({
            name:item.konuAdi,
            value:item.yanlisSayisi
          }));
      }
      else if(this.konuTur=="Boş"){
        this.aytYanlis=(await this.denemelerService.getAytBosAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeBosAnaliz;
        this.aytYanlisBoslar=this.aytYanlis
          .map(item=>({
            name:item.konuAdi,
            value:item.bosSayisi
          }));
      }
    }
    else if(this.alanTur=="Eşit Ağırlık"){
      this.dersId=this.dersler.find(u=>u.dersAdi=="Matematik")?.id;
      if(this.konuTur=="Yanlış"){
        this.aytYanlis=(await this.denemelerService.getAytYanlisAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeYanlisAnaliz;
        this.aytYanlisBoslar=this.aytYanlis
          .map(item=>({
            name:item.konuAdi,
            value:item.yanlisSayisi
          }));
      }
      else if(this.konuTur=="Boş"){
        this.aytYanlis=(await this.denemelerService.getAytBosAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeBosAnaliz;
        this.aytYanlisBoslar=this.aytYanlis
          .map(item=>({
            name:item.konuAdi,
            value:item.bosSayisi
          }));
      }

    }
    else if(this.alanTur=="Sözel"){
      this.dersId=this.dersler.find(u=>u.dersAdi=="Edebiyat")?.id;
      if(this.konuTur=="Yanlış"){
        this.aytYanlis=(await this.denemelerService.getAytYanlisAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeYanlisAnaliz;
        this.aytYanlisBoslar=this.aytYanlis
          .map(item=>({
            name:item.konuAdi,
            value:item.yanlisSayisi
          }));
      }
      else if(this.konuTur=="Boş"){
        this.aytYanlis=(await this.denemelerService.getAytBosAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeBosAnaliz;
        this.aytYanlisBoslar=this.aytYanlis
          .map(item=>({
            name:item.konuAdi,
            value:item.bosSayisi
          }));
      }
    }
    else if(this.alanTur=="Dil"){
      this.dersId=this.dersler.find(u=>u.dersAdi=="Dil")?.id;
      if(this.konuTur=="Yanlış"){
        this.aytYanlis=(await this.denemelerService.getAytYanlisAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeYanlisAnaliz;
        this.aytYanlisBoslar=this.aytYanlis
          .map(item=>({
            name:item.konuAdi,
            value:item.yanlisSayisi
          }));
      }
      else if(this.konuTur=="Boş"){
        this.aytYanlis=(await this.denemelerService.getAytBosAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeBosAnaliz;
        this.aytYanlisBoslar=this.aytYanlis
          .map(item=>({
            name:item.konuAdi,
            value:item.bosSayisi
          }));
      }
    }
  }
  dersler:Ders[];
  tableSizes:any=[5,10,15,20,30,50];
  tableSize:number=5;
  konuSizes:any=[5,10,15];
  konuSize:number=5;

  single: any[];
  multi: any[];
  view: any;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Konu Adı';
  showYAxisLabel = true;
  yAxisLabel = 'Sayı';
  aytYanlisBoslar:any[];
  aytYanlis:any[];

  dersAdi:string="Matematik";
  alanAdi:string="Sayısal";
  dersId:any;

  konuTurs:string[]=["Yanlış","Boş"];
  alanTurs:string[]=["Sayısal","Eşit Ağırlık","Sözel","Dil"];
  sayisalDersler:Ders[];
  esitagirlikDersler:Ders[];
  sozelDersler:Ders[];
  alanTur:string="Sayısal";

  konuTur:string="Yanlış";
  colorScheme: Color = { 
    domain: ['var(--text-color)', 'var(--background-color)'], 
    group: ScaleType.Ordinal, 
    selectable: true, 
    name: 'Customer Usage', 
  };
  private viewContainerRef: ViewContainerRef;
}