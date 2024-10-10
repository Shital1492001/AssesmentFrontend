import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSlotFormComponent } from './booking-slot-form.component';

describe('BookingSlotFormComponent', () => {
  let component: BookingSlotFormComponent;
  let fixture: ComponentFixture<BookingSlotFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingSlotFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingSlotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
