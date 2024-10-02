import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonuListComponent } from './konu-list.component';

describe('KonuListComponent', () => {
  let component: KonuListComponent;
  let fixture: ComponentFixture<KonuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KonuListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KonuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
