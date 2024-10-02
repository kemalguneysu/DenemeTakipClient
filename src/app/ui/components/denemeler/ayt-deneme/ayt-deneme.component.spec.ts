import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AytDenemeComponent } from './ayt-deneme.component';

describe('AytDenemeComponent', () => {
  let component: AytDenemeComponent;
  let fixture: ComponentFixture<AytDenemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AytDenemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AytDenemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
