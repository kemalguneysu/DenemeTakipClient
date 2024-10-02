import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent extends BaseComponent{
  constructor(spinner:NgxSpinnerService) {
    super(spinner);
    
  }

}
