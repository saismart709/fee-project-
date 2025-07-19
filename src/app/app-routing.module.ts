import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainDashboardComponent } from './layout/main-dashboard/main-dashboard.component';
import { AttendanceComponent } from './modules/student/attendance/attendance.component';
import { ExamsComponent } from './modules/student/exams/exams.component';
import { MarksComponent } from './modules/student/marks/marks.component';
import { LabComponent } from './modules/lab-library/lab/lab.component';
import { LibraryComponent } from './modules/lab-library/library/library.component';
import { TransportComponent } from './modules/transport-fee/transport/transport.component';
import { FeeComponent } from './modules/transport-fee/fee/fee.component';

import { FacultyComponent } from './modules/others/faculty/faculty.component';
import { FacultyManageComponent } from './modules/others/faculty/faculty-manage/faculty-manage.component';
import { FacultyAssignmentsComponent } from './modules/others/faculty/faculty-assignment/faculty-assignment.component';

import { TimetableComponent } from './modules/others/timetable/timetable.component';
import { TimetableCreateComponent} from "./modules/others/timetable/timetable-create/timetable-create.component";
import { TimetableViewComponent } from './modules/others/timetable/timetable-view/timetable-view.component';
import { TimetableGridComponent} from "./modules/others/timetable/timetable-grid/timetable-grid.component";
import { OfficeComponent } from './modules/others/office/office.component';
import { SecurityComponent } from './modules/security/security.component';
import { ReportsComponent } from './modules/reports/reports.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MainDashboardComponent,
    children: [
      { path: 'student/attendance', component: AttendanceComponent },
      { path: 'student/exams', component: ExamsComponent },
      { path: 'student/marks', component: MarksComponent },
      { path: 'lab', component: LabComponent },
      { path: 'library', component: LibraryComponent },
      { path: 'transport', component: TransportComponent },
      { path: 'fee', component: FeeComponent },
      {
        path: 'faculty',
        component: FacultyComponent,
        children: [
          { path: '', redirectTo: 'manage', pathMatch: 'full' },
          { path: 'manage', component: FacultyManageComponent },
          { path: 'assignment', component: FacultyAssignmentsComponent }
        ]
      },
      {
        path: 'timetable',
        component: TimetableComponent,
        children: [
          { path: '', redirectTo: 'manage', pathMatch: 'full' },
          { path: 'create', component: TimetableCreateComponent },
          { path: 'view', component: TimetableViewComponent },
          { path: 'generate', component: TimetableGridComponent}
        ]
      },

      { path: 'office', component: OfficeComponent },
      { path: 'security', component: SecurityComponent },
      { path: 'reports', component: ReportsComponent },
      { path: '', redirectTo: 'student/attendance', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
