import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/common/custom-toastr.service';
import { HttpClientService } from '../../services/common/http-client.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { SignalRService } from '../../services/common/signalr.service';
import { HubUrls } from '../../constants/hub-urls';
import { SendFunctions } from '../../constants/send-functions';
declare var $:any;

@Directive({
  selector: '[appDelete2]'
})
export class DeleteDirective2 {

  constructor(private element:ElementRef,
    private _renderer:Renderer2,
    private httpClientService:HttpClientService,
    private spinner:NgxSpinnerService,
    private toastrService:CustomToastrService,
    private singalRService:SignalRService) 
  {
    const img=_renderer.createElement("img");
    img.setAttribute("src","../../../../../assets/bin.png");
    img.setAttribute("style","cursor:pointer");
    img.width=40;
    img.height=40;
    _renderer.appendChild(element.nativeElement,img);
    
  }
  @Input() id:string;
  @Input() controller:string;
  @Input() konuAdi:string;

  @Output() callback:EventEmitter<any>=new EventEmitter();
  @HostListener("click")
  async onClick(){
    const div:HTMLDivElement=this.element.nativeElement;
    const divParent=div.parentElement;

    Swal.fire({
      title: "Silmek istediğinize emin misiniz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText:"Vazgeç",
      width:"30%",
      customClass: {
        popup:"sweetPopup",
        title: 'sweetTitle',
        confirmButton:"sweetYesButton",
        cancelButton:"sweetCancelButton"
      },
      heightAuto:true,
      color:"#ffffff",
      confirmButtonText: "Evet, sil!",
      background:"#23201E",
    }).then((result) => {
    this.spinner.show(SpinnerType.BallSpinClockwiseFadeRotating)
      if (result.isConfirmed) {
        this.httpClientService.delete({
          controller:this.controller
        },this.id).subscribe(data=>{
          $(div.parentElement).fadeOut(500,()=>{
            this.callback.emit();
          });
          this.toastrService.message("Başarıyla Silindi","Başarılı",{
            messageType:ToastrMessageType.Success,
            position:ToastrPosition.TopRight
          })
          this.singalRService.invoke(HubUrls.KonuHub,SendFunctions.KonuDeletedMessage,`${this.konuAdi} isimli konu silindi.`)
        },(errorResponse:HttpErrorResponse)=>{
          this.toastrService.message("Silinirken bir hata oluştu","HATA",{
            messageType:ToastrMessageType.Error,
            position:ToastrPosition.TopRight
          })
        });
      }
      this.spinner.hide(SpinnerType.BallSpinClockwiseFadeRotating)

    });
    // this.httpClientService.delete({
    //   controller:this.controller
    // },this.id).subscribe(data=>{
    //   $(div.parentElement).fadeOut(500,()=>{
    //     this.callback.emit();
    //   });
    //   this.toastrService.message("Başarıyla Silindi","Başarılı",{
    //     messageType:ToastrMessageType.Success,
    //     position:ToastrPosition.TopRight
    //   })
    // },(errorResponse:HttpErrorResponse)=>{
    //   this.toastrService.message("Silinirken bir hata oluştu","HATA",{
    //     messageType:ToastrMessageType.Error,
    //     position:ToastrPosition.TopRight
    //   })
    // });
    
  }


}
