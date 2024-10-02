import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KullaniciSingleComponent } from './kullanici-single.component';

describe('KullaniciSingleComponent', () => {
  let component: KullaniciSingleComponent;
  let fixture: ComponentFixture<KullaniciSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KullaniciSingleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KullaniciSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
