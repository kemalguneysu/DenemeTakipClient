import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AytCreateComponent } from './ayt-create.component';

describe('AytCreateComponent', () => {
  let component: AytCreateComponent;
  let fixture: ComponentFixture<AytCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AytCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AytCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
