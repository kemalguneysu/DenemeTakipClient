import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DerslerService } from '../../../../services/common/model/dersler.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';
import { Konu } from '../../../../contracts/konu/konu';
import { Ders } from '../../../../contracts/ders/ders';
import { SignalRService } from '../../../../services/common/signalr.service';
import { HubUrls } from '../../../../constants/hub-urls';
import { ReceiveFunctions } from '../../../../constants/receive-functions';

@Component({
  selector: 'app-ders-list',
  templateUrl: './ders-list.component.html',
  styleUrl: './ders-list.component.css'
})
export class DersListComponent extends BaseComponent{
  constructor(spinner:NgxSpinnerService,private derslerService:DerslerService,private toastrService:CustomToastrService,private signalRService:SignalRService) {
    super(spinner); 
    signalRService.start(HubUrls.DersHub);
  }
  
  async ngOnInit(){
    await this.getTytDersler();
    await this.getAytDersler();
    this.signalRService.on(HubUrls.DersHub,ReceiveFunctions.DersAddedMessage,async message=>{
      // this.toastrService.message(message,"Yeni Ders Eklendi",{
      //   messageType:ToastrMessageType.Success,
      //   position:ToastrPosition.TopRight
      // })
      await this.getTytDersler();
      await this.getAytDersler();
    })
    this.signalRService.on(HubUrls.DersHub,ReceiveFunctions.DersDeletedMessage,async message=>{
      // this.toastrService.message(message,"Bir Ders Silindi",{
      //   messageType:ToastrMessageType.Warning,
      //   position:ToastrPosition.TopRight
      // })
      await this.getTytDersler();
      await this.getAytDersler();
    })
  }
  isAytOrTytToggle2:boolean=false;
  dersAdi:string="";
  async isAytOrTyt2(){
    this.isAytOrTytToggle2 = !this.isAytOrTytToggle2;
    if(!this.isAytOrTytToggle2){
      this.page2=1;
      const dersler:{totalCount:number,dersler:Ders[]}=await this.derslerService.getAllDers(true,this.dersAdi,this.page2,this.tableSize2,()=>this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating),errorMessage=>this.toastrService.message(errorMessage,"Hata",{
        messageType: ToastrMessageType.Error,
        position:ToastrPosition.TopRight,
      }));
      this.tytDersler=dersler.dersler;
      this.count2=dersler.totalCount;
    }
    else{
      this.page3=1;
      const dersler:{totalCount:number,dersler:Ders[]}=await this.derslerService.getAllDers(false,this.dersAdi,this.page3,this.tableSize3,()=>this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating),errorMessage=>this.toastrService.message(errorMessage,"Hata",{
        messageType: ToastrMessageType.Error,
        position:ToastrPosition.TopRight,
      }));
      this.aytDersler=dersler.dersler;
      this.count3=dersler.totalCount;
    }
  }
  async getTytDersler(){
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    // const allTytDersler:{totalCount:number,tytDersler:Ders[]}=await this.derslerService.getTytDersler(this.page2,this.tableSize2,()=>this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating),errorMessage=>this.toastrService.message(errorMessage,"Hata",{
    //   messageType: ToastrMessageType.Error,
    //   position:ToastrPosition.TopRight,
    // }));
    // this.tytDersler=allTytDersler.tytDersler;
    // this.count2=allTytDersler.totalCount;
    const dersler:{totalCount:number,dersler:Ders[]}=await this.derslerService.getAllDers(true,this.dersAdi,this.page2,this.tableSize2,()=>this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating),errorMessage=>this.toastrService.message(errorMessage,"Hata",{
      messageType: ToastrMessageType.Error,
      position:ToastrPosition.TopRight,
    }));
    this.tytDersler=dersler.dersler;
    this.count2=dersler.totalCount;
  }
  async getAytDersler(){
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    // const allAytDersler:{totalCount:number,aytDersler:Ders[]}=await this.derslerService.getAytDersler(this.page3,this.tableSize3,()=>this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating),errorMessage=>this.toastrService.message(errorMessage,"Hata",{
    //   messageType: ToastrMessageType.Error,
    //   position:ToastrPosition.TopRight,
    // }));
    // this.aytDersler=allAytDersler.aytDersler;
    // this.count3=allAytDersler.totalCount;
    const dersler:{totalCount:number,dersler:Ders[]}=await this.derslerService.getAllDers(false,this.dersAdi,this.page3,this.tableSize3,()=>this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating),errorMessage=>this.toastrService.message(errorMessage,"Hata",{
      messageType: ToastrMessageType.Error,
      position:ToastrPosition.TopRight,
    }));
    this.aytDersler=dersler.dersler;
    this.count3=dersler.totalCount;
  }
  async changeSearchInput(dersAdiParameter:string){
    this.dersAdi=dersAdiParameter;
    // this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    if(!this.isAytOrTytToggle2){
      this.page2=1;
      const dersler:{totalCount:number,dersler:Ders[]}=await this.derslerService.getAllDers(true,this.dersAdi,this.page2,this.tableSize2,()=>this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating),errorMessage=>this.toastrService.message(errorMessage,"Hata",{
        messageType: ToastrMessageType.Error,
        position:ToastrPosition.TopRight,
      }));
      this.tytDersler=dersler.dersler;
      this.count2=dersler.totalCount;
    }
    else{
      this.page3=1;
      const dersler:{totalCount:number,dersler:Ders[]}=await this.derslerService.getAllDers(false,this.dersAdi,this.page2,this.tableSize2,()=>this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating),errorMessage=>this.toastrService.message(errorMessage,"Hata",{
        messageType: ToastrMessageType.Error,
        position:ToastrPosition.TopRight,
      }));
      this.aytDersler=dersler.dersler;
      this.count3=dersler.totalCount;
    }
  }
  onTableDataChange(event:any){
    this.page2=event;
    this.getTytDersler();
  }
  onTableSizeChange(event:any){
    this.tableSize2=event.target.value;
    this.page2=1;
    this.getTytDersler();
    
  } 
  onTableDataChange2(event:any){
    this.page3=event;
    this.getAytDersler();
  }
  onTableSizeChange2(event:any){
    this.tableSize3=event.target.value;
    this.page3=1;
    this.getAytDersler();
    
  } 
  
  title='pagination';
  tytDersler:any;
  page2:number=1;
  count2:number=0;
  tableSize2:number=5;
  tableSizes2:any=[5,10,15,20];

  title3='pagination3';
  aytDersler:any;
  page3:number=1;
  count3:number=0;
  tableSize3:number=5;
  tableSizes3:any=[5,10,15,20];


}
