import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TytBosYanlisAnalizComponent } from './tyt-bos-yanlis-analiz.component';

describe('TytBosYanlisAnalizComponent', () => {
  let component: TytBosYanlisAnalizComponent;
  let fixture: ComponentFixture<TytBosYanlisAnalizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TytBosYanlisAnalizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TytBosYanlisAnalizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
