import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { KonularService } from '../../../../services/common/model/konular.service';
import { aytGenelList } from '../../../../contracts/aytDeneme/aytGenelList';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';
import { Konu } from '../../../../contracts/konu/konu';
import { SignalRService } from '../../../../services/common/signalr.service';
import { HubUrls } from '../../../../constants/hub-urls';
import { ReceiveFunctions } from '../../../../constants/receive-functions';
import { MessageType } from '@microsoft/signalr';
import { Ders } from '../../../../contracts/ders/ders';
import { DerslerService } from '../../../../services/common/model/dersler.service';

@Component({
  selector: 'app-konu-list',
  templateUrl: './konu-list.component.html',
  styleUrl: './konu-list.component.css'
})
export class KonuListComponent extends BaseComponent {
  constructor(spinner:NgxSpinnerService,private konularService:KonularService,private toastrService:CustomToastrService,
    private signalRService:SignalRService,private derslerService:DerslerService) {
    super(spinner);  
    signalRService.start(HubUrls.KonuHub);
  }
  async ngOnInit(){
    await this.getAytKonular();
    await this.getTytKonular();
    this.signalRService.on(HubUrls.KonuHub,ReceiveFunctions.KonuAddedMessage,async message=>{
      // this.toastrService.message(message,"Yeni Bir Konu Eklendi",{
      //   messageType:ToastrMessageType.Success,
      //   position:ToastrPosition.TopRight
      // })
      await this.getAytKonular();
      await this.getTytKonular();
    })
    this.signalRService.on(HubUrls.KonuHub,ReceiveFunctions.KonuDeletedMessage,async message=>{
      // this.toastrService.message(message,"Bir Konu Silindi",{
      //   messageType:ToastrMessageType.Warning,
      //   position:ToastrPosition.TopRight
      // })
      await this.getAytKonular();
      await this.getTytKonular();
    })
  }
  showFilter:boolean=false;
  isAytOrTytToggle2:boolean=false;
  selectedDersIds:string[]=[];
  konuAdi:string="";
  dersler:Ders[]=[];
  isAytOrTyt2(){
    this.isAytOrTytToggle2 = !this.isAytOrTytToggle2;
    this.selectedDersIds=[];
    this.page2=1;
    this.page3=1;
    if(this.isAytOrTytToggle2){
      this.getAytKonular();
      this.getAllDersler();
    }
    else{
      this.getTytKonular();
      this.getAllDersler();
    }
  }
  async getAllDersler(){
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    if(!this.isAytOrTytToggle2){
      const allDersler=await this.derslerService.getAllDers(true,undefined,undefined,undefined,()=>this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating),errorMessage=>this.toastrService.message(errorMessage,"Hata",{
        messageType: ToastrMessageType.Error,
        position:ToastrPosition.TopRight,
      }));
      this.dersler=allDersler.dersler
    }
    else {
      const allDersler=await this.derslerService.getAllDers(false,undefined,undefined,undefined,()=>this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating),errorMessage=>this.toastrService.message(errorMessage,"Hata",{
        messageType: ToastrMessageType.Error,
        position:ToastrPosition.TopRight,
      }));
      this.dersler=allDersler.dersler
    }
  }
  async getTytKonular(){
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    const allTytKonular:{totalCount:number,konular:Konu[]}=await this.konularService.getAllKonularFiltered(true,this.konuAdi,this.selectedDersIds,this.page2,this.tableSize2,()=>this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating),errorMessage=>this.toastrService.message(errorMessage,"Hata",{
      messageType: ToastrMessageType.Error,
      position:ToastrPosition.TopRight,
    }));
    this.tytKonular=allTytKonular.konular;
    this.count2=allTytKonular.totalCount;
    // const allTytKonular:{totalCount:number,tytKonular:Konu[]}=await this.konularService.getTytKonular(this.page2,this.tableSize2,()=>this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating),errorMessage=>this.toastrService.message(errorMessage,"Hata",{
    //   messageType: ToastrMessageType.Error,
    //   position:ToastrPosition.TopRight,
    // }));
    // this.tytKonular=allTytKonular.tytKonular;
    // this.count2=allTytKonular.totalCount;
  }
  async getAytKonular(){
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    // const allAytKonular:{totalCount:number,aytKonular:Konu[]}=await this.konularService.getAytKonular(this.page3,this.tableSize3,()=>this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating),errorMessage=>this.toastrService.message(errorMessage,"Hata",{
    //   messageType: ToastrMessageType.Error,
    //   position:ToastrPosition.TopRight,
    // }));
    // this.aytKonular=allAytKonular.aytKonular;
    // this.count3=allAytKonular.totalCount;
    const allAytKonular:{totalCount:number,konular:Konu[]}=await this.konularService.getAllKonularFiltered(false,this.konuAdi,this.selectedDersIds,this.page3,this.tableSize3,()=>this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating),errorMessage=>this.toastrService.message(errorMessage,"Hata",{
      messageType: ToastrMessageType.Error,
      position:ToastrPosition.TopRight,
    }));
    this.aytKonular=allAytKonular.konular;
    this.count3=allAytKonular.totalCount;
  }
  onTableDataChange(event:any){
    this.page2=event;
    this.getTytKonular();
  }
  onTableSizeChange(event:any){
    this.tableSize2=event.target.value;
    this.page2=1;
    this.getTytKonular();
    
  }
  onTableDataChange2(event:any){
    this.page3=event;
    this.getAytKonular();
  }
  onTableSizeChange2(event:any){
    this.tableSize3=event.target.value;
    this.page3=1;
    this.getAytKonular();
    
  } 
  async changeSearchInput(konuAdiParameter:string){
    this.konuAdi=konuAdiParameter;
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    if(!this.isAytOrTytToggle2){
      this.page2=1;
      const allTytKonular:{totalCount:number,konular:Konu[]}=await this.konularService.getAllKonularFiltered(true,this.konuAdi,this.selectedDersIds,this.page2,this.tableSize2,()=>this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating),errorMessage=>this.toastrService.message(errorMessage,"Hata",{
        messageType: ToastrMessageType.Error,
        position:ToastrPosition.TopRight,
      }));
      this.tytKonular=allTytKonular.konular;
      this.count2=allTytKonular.totalCount;
    }
    else{
      this.page3=1;
      const allAytKonular:{totalCount:number,konular:Konu[]}=await this.konularService.getAllKonularFiltered(false,this.konuAdi,this.selectedDersIds,this.page3,this.tableSize3,()=>this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating),errorMessage=>this.toastrService.message(errorMessage,"Hata",{
        messageType: ToastrMessageType.Error,
        position:ToastrPosition.TopRight,
      }));
      this.aytKonular=allAytKonular.konular;
      this.count3=allAytKonular.totalCount;
    }
  }
  async showFilterFunc(){
    this.showFilter=!this.showFilter;
    this.getAllDersler();
  }
  async changeSelectedDersIds(value:string){
    if(this.selectedDersIds.includes(value))
      this.selectedDersIds = this.selectedDersIds.filter((item) => item !== value); 
    else
      this.selectedDersIds.push(value);
    this.page2=1;
    this.page3=1;
    if(!this.isAytOrTytToggle2)
      this.getTytKonular();
    else
      this.getAytKonular();
  }
  title='pagination';
  tytKonular:any;
  page2:number=1;
  count2:number=0;
  tableSize2:number=5;
  tableSizes2:any=[5,10,15,20];

  title3='pagination3';
  aytKonular:any;
  page3:number=1;
  count3:number=0;
  tableSize3:number=5;
  tableSizes3:any=[5,10,15,20];
}

