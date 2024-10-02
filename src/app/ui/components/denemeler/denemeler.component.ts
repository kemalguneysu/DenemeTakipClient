import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';
import { DenemelerService } from '../../../services/common/model/denemeler.service';
import { Konu } from '../../../contracts/konu/konu';
import { KonularService } from '../../../services/common/model/konular.service';

@Component({
  selector: 'app-denemeler',
  templateUrl: './denemeler.component.html',
  styleUrl: './denemeler.component.css'
})
export class DenemelerComponent extends BaseComponent{
  isAytOrTytToggle:boolean=true;
  showTytDenemes:boolean=false;
  showAytDenemes:boolean=false;

  constructor(spinner:NgxSpinnerService,private toastrService:CustomToastrService,private denemelerService:DenemelerService,private konularService:KonularService) {
    super(spinner);
  }
  async ngOnInit(){
  }
  
  isAytOrTyt(){
    this.isAytOrTytToggle = !this.isAytOrTytToggle;
  }
  showTytBosAc(){
    this.showTytDenemes=!this.showTytDenemes;
    if(this.showAytDenemes)
      this.showAytDenemes=!this.showAytDenemes;
  }
  showAytBosAc(){
    this.showAytDenemes=!this.showAytDenemes;
    if(this.showTytDenemes)
      this.showTytDenemes=!this.showTytDenemes;
  }
}
