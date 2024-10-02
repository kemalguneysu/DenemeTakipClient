import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DersCreateComponent } from './ders-create.component';

describe('DersCreateComponent', () => {
  let component: DersCreateComponent;
  let fixture: ComponentFixture<DersCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DersCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
