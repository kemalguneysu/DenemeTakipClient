import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';
import { DenemelerService } from '../../../../services/common/model/denemeler.service';
import { Observable } from 'rxjs';
import { CreateTyt } from '../../../../contracts/tytDeneme/tytDenemeCreate';
import { tytGenelList } from '../../../../contracts/tytDeneme/tytGenelList';
import { SignalRService } from '../../../../services/common/signalr.service';
import { HubUrls } from '../../../../constants/hub-urls';
import { ReceiveFunctions } from '../../../../constants/receive-functions';

@Component({
  selector: 'app-tyt-list',
  templateUrl: './tyt-list.component.html',
  styleUrl: './tyt-list.component.css'
})
export class TytListComponent extends BaseComponent implements OnInit{
  constructor(spinner:NgxSpinnerService,private toastrService:CustomToastrService,private denemelerService:DenemelerService,private signalRService:SignalRService) {
    super(spinner);
    signalRService.start(HubUrls.TytHub)
  }
  async ngOnInit(){
    await this.getTytDenemes();
    this.signalRService.on(HubUrls.TytHub,ReceiveFunctions.TytAddedMessage, async message=>{
      await this.getTytDenemes();
    })
    this.signalRService.on(HubUrls.TytHub,ReceiveFunctions.TytDeletedMessage,async message=>{
      await this.getTytDenemes();
    })
  }
  async getTytDenemes(){

    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    const allTyt:{totalCount:number,tytDenemes:tytGenelList[]}=await this.denemelerService.getTytDenemes(this.pageTytList,this.tableSizeTytList,()=>this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating),errorMessage=>this.toastrService.message(errorMessage,"Hata",{
      messageType: ToastrMessageType.Error,
      position:ToastrPosition.TopRight,
    }));
    this.tytDenemeler=allTyt.tytDenemes;
    this.countTytList=allTyt.totalCount;
  }
  onTableDataChangeTytList(event:any){
    this.pageTytList=event;
    this.getTytDenemes();
  }
  onTableSizeChangeTytList(event:any){
    this.tableSizeTytList=event.target.value;
    this.pageTytList=1;
    this.getTytDenemes();
    
  } 
  title='paginationTytList';
  tytDenemeler:any;
  pageTytList:number=1;
  countTytList:number=0;
  tableSizeTytList:number=5;
  tableSizesTytList:any=[5,10,15,20];



}
