import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonuCreateComponent } from './konu-create.component';

describe('KonuCreateComponent', () => {
  let component: KonuCreateComponent;
  let fixture: ComponentFixture<KonuCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KonuCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KonuCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
