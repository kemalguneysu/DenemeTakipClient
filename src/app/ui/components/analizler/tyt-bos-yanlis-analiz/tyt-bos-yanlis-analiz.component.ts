import { Component, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DenemelerService } from '../../../../services/common/model/denemeler.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { DerslerService } from '../../../../services/common/model/dersler.service';
import { Ders } from '../../../../contracts/ders/ders';

@Component({
  selector: 'app-tyt-bos-yanlis-analiz',
  templateUrl: './tyt-bos-yanlis-analiz.component.html',
  styleUrl: './tyt-bos-yanlis-analiz.component.css'
})
export class TytBosYanlisAnalizComponent extends BaseComponent{
  constructor(spinner:NgxSpinnerService,private denemelerService:DenemelerService,private derslerService:DerslerService){
    super(spinner);
    this.view = [innerWidth / 1.3, 400];

  }
  async ngOnInit(){
   this.dersler=(await this.derslerService.getAllDers()).dersler.filter(u=>u.isTyt==true);
   this.dersId=this.dersler.find(u=>u.dersAdi=="Türkçe")?.id;
   this.tytYanlis=(await this.denemelerService.getTytYanlisAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeYanlisAnaliz;
   this.tytYanlisBoslar = this.tytYanlis
   .map(item => ({
    name: item.konuAdi,
    value: item.yanlisSayisi
  }));
  }
  onResize(event:any) {
    this.view = [event.target.innerWidth / 1.35, 400];
  } 
  async onTableSizeChange(event:any){
    this.tableSize=event.target.value;
    if(this.konuTur=="Yanlış"){
      this.tytYanlis=(await this.denemelerService.getTytYanlisAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeYanlisAnaliz;
      this.tytYanlisBoslar = this.tytYanlis
      .map(item => ({
        name: item.konuAdi,
        value: item.yanlisSayisi
      }));
    }
    else if(this.konuTur=="Boş"){
      this.tytYanlis=(await this.denemelerService.getTytBosAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeBosAnaliz;
      this.tytYanlisBoslar = this.tytYanlis
      .filter(item => item.dersId === this.dersId)
      .map(item => ({
        name: item.konuAdi,
        value: item.bosSayisi
      }));
    }
    
  }
  async onDersChange(event:any){
    this.dersId=event.target.value;
    if(this.konuTur=="Yanlış"){
      this.tytYanlis=(await this.denemelerService.getTytYanlisAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeYanlisAnaliz;
      this.tytYanlisBoslar = this.tytYanlis
      .map(item => ({
        name: item.konuAdi,
        value: item.yanlisSayisi
      }));
    }
    else if(this.konuTur=="Boş"){
      this.tytYanlis=(await this.denemelerService.getTytBosAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeBosAnaliz;
      this.tytYanlisBoslar = this.tytYanlis
      .map(item => ({
        name: item.konuAdi,
        value: item.bosSayisi
      }));
    }

  }
  async onKonuSizeChange(event:any){
    this.konuSize=Number(event.target.value);
    if(this.konuTur=="Yanlış"){
      this.tytYanlis=(await this.denemelerService.getTytYanlisAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeYanlisAnaliz;
      this.tytYanlisBoslar = this.tytYanlis
      .map(item => ({
        name: item.konuAdi,
        value: item.yanlisSayisi
      }));
    }
    else if(this.konuTur=="Boş"){
      this.tytYanlis=(await this.denemelerService.getTytBosAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeBosAnaliz;
      this.tytYanlisBoslar = this.tytYanlis
      .map(item => ({
        name: item.konuAdi,
        value: item.bosSayisi
      }));
    }
  }
  async onKonuTurChange(event:any){
    this.konuTur=event.target.value;
    if(this.konuTur=="Yanlış"){
      this.tytYanlis=(await this.denemelerService.getTytYanlisAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeYanlisAnaliz;
      this.tytYanlisBoslar = this.tytYanlis
      .map(item => ({
        name: item.konuAdi,
        value: item.yanlisSayisi
      }));
    }
    else if(this.konuTur=="Boş"){
      this.tytYanlis=(await this.denemelerService.getTytBosAnaliz(this.tableSize,this.konuSize,this.dersId)).denemeBosAnaliz;
      this.tytYanlisBoslar = this.tytYanlis
      .map(item => ({
        name: item.konuAdi,
        value: item.bosSayisi
      }));
    }
  }
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
  tytYanlisBoslar:any[];
  tytYanlis:any[];
  dersAdi:string="Türkçe";
  dersId:any;
  konuTurs:string[]=["Yanlış","Boş"];
  konuTur:string="Yanlış";
  colorScheme: Color = { 
    domain: ['var(--text-color)', 'var(--background-color)'], 
    group: ScaleType.Ordinal, 
    selectable: true, 
    name: 'Customer Usage', 
  };
  private viewContainerRef: ViewContainerRef;
  dersler:Ders[];
}
