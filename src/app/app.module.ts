import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainDashboardComponent } from './layout/main-dashboard/main-dashboard.component';
import { AttendanceComponent } from './modules/student/attendance/attendance.component';
import { ExamsComponent } from './modules/student/exams/exams.component';
import { MarksComponent } from './modules/student/marks/marks.component';
import { LabComponent } from './modules/lab-library/lab/lab.component';
import { LibraryComponent } from './modules/lab-library/library/library.component';
import { TransportComponent } from './modules/transport-fee/transport/transport.component';
import { FeeComponent } from './modules/transport-fee/fee/fee.component';
import { FacultyComponent } from './modules/others/faculty/faculty.component';
import { TimetableComponent } from './modules/others/timetable/timetable.component';
import { OfficeComponent } from './modules/others/office/office.component';
import { SecurityComponent } from './modules/security/security.component';
import { ReportsComponent } from './modules/reports/reports.component';
import {FormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { FacultyManageComponent} from "./modules/others/faculty/faculty-manage/faculty-manage.component";
import { FacultyAssignmentsComponent } from './modules/others/faculty/faculty-assignment/faculty-assignment.component';
import { TimetableCreateComponent } from './modules/others/timetable/timetable-create/timetable-create.component';
import { TimetableViewComponent } from './modules/others/timetable/timetable-view/timetable-view.component';
import { HTTP_INTERCEPTORS} from "@angular/common/http";
import { AuthInterceptor} from "./core/interceptors/auth.interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimetableGridComponent} from "./modules/others/timetable/timetable-grid/timetable-grid.component";

@NgModule({
  declarations: [
    AppComponent,
    MainDashboardComponent,
    AttendanceComponent,
    ExamsComponent,
    MarksComponent,
    LabComponent,
    LibraryComponent,
    TransportComponent,
    FeeComponent,
    FacultyComponent,
    TimetableComponent,
    OfficeComponent,
    SecurityComponent,
    ReportsComponent,
    FacultyManageComponent,
    FacultyAssignmentsComponent,
    TimetableCreateComponent,
    TimetableViewComponent,
    TimetableGridComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
