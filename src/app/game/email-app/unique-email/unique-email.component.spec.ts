import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueEmailComponent } from './unique-email.component';

describe('UniqueEmailComponent', () => {
  let component: UniqueEmailComponent;
  let fixture: ComponentFixture<UniqueEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniqueEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniqueEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
