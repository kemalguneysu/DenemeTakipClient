import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AytAnalizComponent } from './ayt-analiz.component';

describe('AytAnalizComponent', () => {
  let component: AytAnalizComponent;
  let fixture: ComponentFixture<AytAnalizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AytAnalizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AytAnalizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
