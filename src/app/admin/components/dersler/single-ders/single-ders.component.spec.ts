import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDersComponent } from './single-ders.component';

describe('SingleDersComponent', () => {
  let component: SingleDersComponent;
  let fixture: ComponentFixture<SingleDersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleDersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleDersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
