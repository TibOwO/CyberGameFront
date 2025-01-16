import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSecurityComponent } from './mobile-security.component';

describe('MobileSecurityComponent', () => {
  let component: MobileSecurityComponent;
  let fixture: ComponentFixture<MobileSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSecurityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
