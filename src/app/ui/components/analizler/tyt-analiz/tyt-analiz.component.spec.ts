import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TytAnalizComponent } from './tyt-analiz.component';

describe('TytAnalizComponent', () => {
  let component: TytAnalizComponent;
  let fixture: ComponentFixture<TytAnalizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TytAnalizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TytAnalizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
