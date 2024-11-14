import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAppComponent } from './email-app.component';

describe('EmailAppComponent', () => {
  let component: EmailAppComponent;
  let fixture: ComponentFixture<EmailAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
