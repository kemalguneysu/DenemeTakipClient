import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';
import { KonuCreate } from '../../../contracts/konu/konuCreate';
import { KonularService } from '../../../services/common/model/konular.service';

@Component({
  selector: 'app-konular',
  templateUrl: './konular.component.html',
  styleUrl: './konular.component.css'
})
export class KonularComponent extends BaseComponent{
  constructor(spinner:NgxSpinnerService,private toastrService:CustomToastrService,) {
    super(spinner);
  }

  async ngOnInit(){
  }
}
