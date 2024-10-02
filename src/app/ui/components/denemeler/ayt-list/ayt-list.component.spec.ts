import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AytListComponent } from './ayt-list.component';

describe('AytListComponent', () => {
  let component: AytListComponent;
  let fixture: ComponentFixture<AytListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AytListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AytListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
