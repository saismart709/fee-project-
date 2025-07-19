import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyAssignmentComponent } from './faculty-assignment.component';

describe('FacultyAssignmentComponent', () => {
  let component: FacultyAssignmentComponent;
  let fixture: ComponentFixture<FacultyAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacultyAssignmentComponent]
    });
    fixture = TestBed.createComponent(FacultyAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
