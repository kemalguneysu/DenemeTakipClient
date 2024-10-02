import { Component } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-analizler',
  templateUrl: './analizler.component.html',
  styleUrl: './analizler.component.css'
})
export class AnalizlerComponent extends BaseComponent{
  constructor(spinner:NgxSpinnerService) {
    super(spinner);
    
  }
  showTytAnaliz:boolean=false;
  showAytAnaliz:boolean=false;

  tytAnalizAc(){
    this.showTytAnaliz=!this.showTytAnaliz;
  }
  aytAnalizAc(){
    this.showAytAnaliz=!this.showAytAnaliz;
  }
}
