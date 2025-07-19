import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableCreateComponent } from './timetable-create.component';

describe('TimetableCreateComponent', () => {
  let component: TimetableCreateComponent;
  let fixture: ComponentFixture<TimetableCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimetableCreateComponent]
    });
    fixture = TestBed.createComponent(TimetableCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
