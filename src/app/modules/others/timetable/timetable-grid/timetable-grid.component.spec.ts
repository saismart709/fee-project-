import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableGridComponent } from './timetable-grid.component';

describe('TimetableGridComponent', () => {
  let component: TimetableGridComponent;
  let fixture: ComponentFixture<TimetableGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimetableGridComponent]
    });
    fixture = TestBed.createComponent(TimetableGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
