import { Component } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService } from '../../../services/common/custom-toastr.service';


@Component({
  selector: 'app-dersler',
  templateUrl: './dersler.component.html',
  styleUrl: './dersler.component.css'
})
export class DerslerComponent extends BaseComponent{
  constructor(spinner:NgxSpinnerService,private toastrService:CustomToastrService,) {
    super(spinner);
  }

  async ngOnInit(){
  }
 
}
