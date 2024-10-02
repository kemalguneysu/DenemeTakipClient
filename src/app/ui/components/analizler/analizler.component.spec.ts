import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalizlerComponent } from './analizler.component';

describe('AnalizlerComponent', () => {
  let component: AnalizlerComponent;
  let fixture: ComponentFixture<AnalizlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalizlerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalizlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
