import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';
import { DenemelerService } from '../../../../services/common/model/denemeler.service';
import { aytGenelList } from '../../../../contracts/aytDeneme/aytGenelList';
import { SignalRService } from '../../../../services/common/signalr.service';
import { HubUrls } from '../../../../constants/hub-urls';
import { ReceiveFunctions } from '../../../../constants/receive-functions';

@Component({
  selector: 'app-ayt-list',
  templateUrl: './ayt-list.component.html',
  styleUrl: './ayt-list.component.css'
})
export class AytListComponent extends BaseComponent{
  constructor(spinner:NgxSpinnerService,private toastrService:CustomToastrService,private denemelerService:DenemelerService,private signalRService:SignalRService) {
    super(spinner);
    signalRService.start(HubUrls.AytHub)
  }
  async ngOnInit(){
    await this.getAytDenemes();
    this.signalRService.on(HubUrls.AytHub,ReceiveFunctions.AytAddedMessage,async message=>{
      await this.getAytDenemes();
    })
    this.signalRService.on(HubUrls.AytHub,ReceiveFunctions.AytDeletedMessage, async message=>{
      await this.getAytDenemes();
    })
  }

  async getAytDenemes(){

    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    const allTyt:{totalCount:number,aytDenemes:aytGenelList[]}=await this.denemelerService.getAytDenemes(this.pageAytList,this.tableSizeAytList,()=>this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating),errorMessage=>this.toastrService.message(errorMessage,"Hata",{
      messageType: ToastrMessageType.Error,
      position:ToastrPosition.TopRight,
    }));
    this.aytDenemeler=allTyt.aytDenemes;
    this.countAytList=allTyt.totalCount;
  }
  onTableDataChangeAytList(event:any){
    this.pageAytList=event;
    this.getAytDenemes();
  }
  onTableSizeChangeAytList(event:any){
    this.tableSizeAytList=event.target.value;
    this.pageAytList=1;
    this.getAytDenemes();
    
  } 
  title='paginationAytList';
  aytDenemeler:any;
  pageAytList:number=1;
  countAytList:number=0;
  tableSizeAytList:number=5;
  tableSizesAytList:any=[5,10,15,20];
}
