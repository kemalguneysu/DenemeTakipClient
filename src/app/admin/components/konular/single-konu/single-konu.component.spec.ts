import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleKonuComponent } from './single-konu.component';

describe('SingleKonuComponent', () => {
  let component: SingleKonuComponent;
  let fixture: ComponentFixture<SingleKonuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleKonuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleKonuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
