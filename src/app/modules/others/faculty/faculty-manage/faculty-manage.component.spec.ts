import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyManageComponent } from './faculty-manage.component';

describe('FacultyManageComponent', () => {
  let component: FacultyManageComponent;
  let fixture: ComponentFixture<FacultyManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacultyManageComponent]
    });
    fixture = TestBed.createComponent(FacultyManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
