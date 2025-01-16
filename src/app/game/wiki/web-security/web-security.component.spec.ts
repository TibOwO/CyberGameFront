import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSecurityComponent } from './web-security.component';

describe('WebSecurityComponent', () => {
  let component: WebSecurityComponent;
  let fixture: ComponentFixture<WebSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebSecurityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
