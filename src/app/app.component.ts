import { Component } from '@angular/core';
import AOS from 'aos';
import { SignalRService } from './services/common/signalr.service';
import { HubUrls } from './constants/hub-urls';
import { AuthService } from './services/common/auth.service';
import { ReceiveFunctions } from './constants/receive-functions';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/common/custom-toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DenemeTakipClient';
  constructor(private signalRService:SignalRService,public authService:AuthService,private toastrService:CustomToastrService) {
  signalRService.start(HubUrls.KonuHub);
  signalRService.start(HubUrls.DersHub);    
  }
  ngOnInit(){
    if(this.authService.isAdmin){
      this.signalRService.on(HubUrls.DersHub,ReceiveFunctions.DersAddedMessage,async message=>{
        this.toastrService.message(message,"Yeni Ders Eklendi",{
          messageType:ToastrMessageType.Success,
          position:ToastrPosition.TopRight
        })});
      this.signalRService.on(HubUrls.DersHub,ReceiveFunctions.DersUpdatedMessage,async message=>{
        this.toastrService.message(message,"Bir Ders Güncellendi",{
          messageType:ToastrMessageType.Warning,
          position:ToastrPosition.TopRight
        })
      })
      this.signalRService.on(HubUrls.DersHub,ReceiveFunctions.DersDeletedMessage,async message=>{
        this.toastrService.message(message,"Bir Ders Silindi",{
          messageType:ToastrMessageType.Warning,
          position:ToastrPosition.TopRight
        })
      })

      this.signalRService.on(HubUrls.KonuHub,ReceiveFunctions.KonuAddedMessage,async message=>{
        this.toastrService.message(message,"Yeni Konu Eklendi",{
          messageType:ToastrMessageType.Success,
          position:ToastrPosition.TopRight
        })});
      this.signalRService.on(HubUrls.KonuHub,ReceiveFunctions.KonuUpdatedMessage,async message=>{
        this.toastrService.message(message,"Bir Konu Güncellendi",{
          messageType:ToastrMessageType.Warning,
          position:ToastrPosition.TopRight
        })
      })
      this.signalRService.on(HubUrls.KonuHub,ReceiveFunctions.KonuDeletedMessage,async message=>{
        this.toastrService.message(message,"Bir Konu Silindi",{
          messageType:ToastrMessageType.Warning,
          position:ToastrPosition.TopRight
        })
      })
    }
      


    AOS.init({disable: 'mobile'});

  }
}
