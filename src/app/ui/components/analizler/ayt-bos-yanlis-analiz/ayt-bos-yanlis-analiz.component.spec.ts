import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AytBosYanlisAnalizComponent } from './ayt-bos-yanlis-analiz.component';

describe('AytBosYanlisAnalizComponent', () => {
  let component: AytBosYanlisAnalizComponent;
  let fixture: ComponentFixture<AytBosYanlisAnalizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AytBosYanlisAnalizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AytBosYanlisAnalizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
