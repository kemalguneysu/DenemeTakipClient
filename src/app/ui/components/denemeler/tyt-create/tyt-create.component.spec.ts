import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TytCreateComponent } from './tyt-create.component';

describe('TytCreateComponent', () => {
  let component: TytCreateComponent;
  let fixture: ComponentFixture<TytCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TytCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TytCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
