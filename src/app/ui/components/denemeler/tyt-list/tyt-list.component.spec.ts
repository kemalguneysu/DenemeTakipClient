import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TytListComponent } from './tyt-list.component';

describe('TytListComponent', () => {
  let component: TytListComponent;
  let fixture: ComponentFixture<TytListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TytListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TytListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
