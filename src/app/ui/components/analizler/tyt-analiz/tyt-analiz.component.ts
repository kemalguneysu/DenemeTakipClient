import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DenemelerService } from '../../../../services/common/model/denemeler.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { curveLinear } from 'd3-shape';
import { tytGenelList } from '../../../../contracts/tytDeneme/tytGenelList';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';

@Component({
  selector: 'app-tyt-analiz',
  templateUrl: './tyt-analiz.component.html',
  styleUrl: './tyt-analiz.component.css'
})
export class TytAnalizComponent extends BaseComponent implements OnInit{

  constructor(spinner:NgxSpinnerService,private denemelerService:DenemelerService,private toastrService:CustomToastrService) {
    super(spinner); 
    this.view = [innerWidth / 1.3, 400];
  }
  async ngOnInit(){
    this.tytDenemeler=(await this.denemelerService.getTytDenemes(this.page,this.tableSize)).tytDenemes.sort((a, b) => new Date(a.tarih).getTime() - new Date(b.tarih).getTime());;
    this.tytDenemeNetler = [{
      name: 'tytDenemeler',
      series: this.tytDenemeler.map(tytDeneme => ({
        name: tytDeneme.tarih,
        value: tytDeneme.toplamNet,
        extra:{
          turkceNet:tytDeneme.turkceNet,
          matematikNet:tytDeneme.matematikNet,
          fenNet:tytDeneme.fenNet,
          sosyalNet:tytDeneme.sosyalNet,
          toplamNet:tytDeneme.toplamNet
        }
      }
    ))
    }];

    
  }
  public dateTickFormatting(val: any): string {
    return new Date(val).toLocaleDateString();
 }
  async onTableSizeChange(event:any){
    this.tableSize=event.target.value;
    this.page=1;
    this.tytDenemeler=(await this.denemelerService.getTytDenemes(this.page,this.tableSize)).tytDenemes.sort((a, b) => new Date(a.tarih).getTime() - new Date(b.tarih).getTime());;
    if(this.dersAdi=="Genel Netler") {
      this.tytDenemeNetler = [{
        name: 'tytDenemeler',
        series: this.tytDenemeler.map(tytDeneme => ({
          name: tytDeneme.tarih,
          value: tytDeneme.toplamNet,
          extra:{
            turkceNet:tytDeneme.turkceNet,
            matematikNet:tytDeneme.matematikNet,
            fenNet:tytDeneme.fenNet,
            sosyalNet:tytDeneme.sosyalNet,
            toplamNet:tytDeneme.toplamNet
          }
        }
      ))
      }];
    }
    else if(this.dersAdi=="Türkçe"){
      this.tytDenemeNetler = [{
        name: 'tytDenemeler',
        series: this.tytDenemeler.map(tytDeneme => ({
          name: tytDeneme.tarih,
          value: tytDeneme.turkceNet,
          extra:{
            turkceDogru:tytDeneme.turkceDogru,
            turkceYanlis:tytDeneme.turkceYanlis,
            turkceNet:tytDeneme.turkceNet
          }
        }))
      }];
    }
    else if(this.dersAdi=="Matematik"){
      this.tytDenemeNetler = [{
        name: 'tytDenemeler',
        series: this.tytDenemeler.map(tytDeneme => ({
          name: tytDeneme.tarih,
          value: tytDeneme.matematikNet,
          extra:{
            matematikDogru:tytDeneme.matematikDogru,
            matematikYanlis:tytDeneme.matematikYanlis,
            matematikNet:tytDeneme.matematikNet
          }
        }))
      }];
    }
    else if(this.dersAdi=="Fen"){
      this.tytDenemeNetler = [{
        name: 'tytDenemeler',
        series: this.tytDenemeler.map(tytDeneme => ({
          name: tytDeneme.tarih,
          value: tytDeneme.fenNet,
          extra:{
            fenDogru:tytDeneme.fenDogru,
            fenYanlis:tytDeneme.fenYanlis,
            fenNet:tytDeneme.fenNet
          }
        }))
      }];
    }
    else if(this.dersAdi=="Sosyal"){
      this.tytDenemeNetler = [{
        name: 'tytDenemeler',
        series: this.tytDenemeler.map(tytDeneme => ({
          name: tytDeneme.tarih,
          value: tytDeneme.sosyalNet,
          extra:{
            sosyalDogru:tytDeneme.sosyalDogru,
            sosyalYanlis:tytDeneme.sosyalYanlis,
            sosyalNet:tytDeneme.sosyalNet
          }
        }))
      }];
    }
  } 
  onResize(event:any) {
    this.view = [event.target.innerWidth / 1.35, 400];
  } 


  async onDersChange(event:any){
    this.tytDenemeler=(await this.denemelerService.getTytDenemes(this.page,this.tableSize)).tytDenemes.sort((a, b) => new Date(a.tarih).getTime() - new Date(b.tarih).getTime());;
    this.dersAdi=event.target.value;
    if(this.dersAdi=="Türkçe"){
      this.tytDenemeNetler = [{
        name: 'tytDenemeler',
        series: this.tytDenemeler.map(tytDeneme => ({
          name: tytDeneme.tarih,
          value: tytDeneme.turkceNet,
          extra:{
            turkceDogru:tytDeneme.turkceDogru,
            turkceYanlis:tytDeneme.turkceYanlis,
            turkceNet:tytDeneme.turkceNet
          }
        }))
      }];
    }
    else if(this.dersAdi=="Matematik"){
      this.tytDenemeNetler = [{
        name: 'tytDenemeler',
        series: this.tytDenemeler.map(tytDeneme => ({
          name: tytDeneme.tarih,
          value: tytDeneme.matematikNet,
          extra:{
            matematikDogru:tytDeneme.matematikDogru,
            matematikYanlis:tytDeneme.matematikYanlis,
            matematikNet:tytDeneme.matematikNet
          }
        }))
      }];
    }
    else if(this.dersAdi=="Fen"){
      this.tytDenemeNetler = [{
        name: 'tytDenemeler',
        series: this.tytDenemeler.map(tytDeneme => ({
          name: tytDeneme.tarih,
          value: tytDeneme.fenNet,
          extra:{
            fenDogru:tytDeneme.fenDogru,
            fenYanlis:tytDeneme.fenYanlis,
            fenNet:tytDeneme.fenNet
          }
        }))
      }];
    }
    else if(this.dersAdi=="Sosyal"){
      this.tytDenemeNetler = [{
        name: 'tytDenemeler',
        series: this.tytDenemeler.map(tytDeneme => ({
          name: tytDeneme.tarih,
          value: tytDeneme.sosyalNet,
          extra:{
            sosyalDogru:tytDeneme.sosyalDogru,
            sosyalYanlis:tytDeneme.sosyalYanlis,
            sosyalNet:tytDeneme.sosyalNet
          }
        }))
      }];
    }
    else if(this.dersAdi=="Genel Netler"){
      this.tytDenemeNetler = [{
        name: 'tytDenemeler',
        series: this.tytDenemeler.map(tytDeneme => ({
          name: tytDeneme.tarih,
          value: tytDeneme.toplamNet,
          extra:{
            turkceNet:tytDeneme.turkceNet,
            matematikNet:tytDeneme.matematikNet,
            fenNet:tytDeneme.fenNet,
            sosyalNet:tytDeneme.sosyalNet
          }
        }
      ))
      }];
    }
  }
  
  dersAdi:string="Genel Netler";
  title='pagination';
  tytDenemeler:any[];
  page:number=1;
  count:number=0;
  tableSize:number=5;
  tableSizes:any=[5,10,15,20,30,50];
  tytDenemeNetler:any[];
  dersler:any=["Genel Netler","Türkçe","Matematik","Fen","Sosyal"]


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
