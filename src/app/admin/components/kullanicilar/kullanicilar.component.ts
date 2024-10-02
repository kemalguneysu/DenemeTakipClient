import { Component } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-kullanicilar',
  templateUrl: './kullanicilar.component.html',
  styleUrl: './kullanicilar.component.css'
})
export class KullanicilarComponent extends BaseComponent{
  constructor(spinner:NgxSpinnerService) {
    super(spinner);
  }
  async ngOnInit(){
    
  }
}