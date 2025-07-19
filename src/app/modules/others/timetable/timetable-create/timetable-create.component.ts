import { Component, OnInit } from '@angular/core';
import { TimetableWeekRequest, TimetableDayEntry } from '../../../../Models/timetable-create';
import { TimetableService } from 'src/app/Services/timetable.service';

@Component({
  selector: 'app-timetable-create',
  templateUrl: './timetable-create.component.html',
  styleUrls: ['./timetable-create.component.css']
})
export class TimetableCreateComponent implements OnInit {
  department: string = '';
  semester: number = 1;

  departments: string[] = ['CS', 'AI', 'BCA', 'MCA', 'BBA'];
  semesters: number[] = [1, 2, 3, 4, 5, 6];
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  periods = [1, 2, 3, 4, 5, 6];

  timetableData: { [key: string]: TimetableDayEntry[] } = {};
  loading = false;
  toastMessage: string = '';
  showToast = false;

  constructor(private timetableService: TimetableService) {}

  ngOnInit(): void {
    this.days.forEach(day => {
      this.timetableData[day] = this.periods.map(() => ({
        day: day,
        subject: '',
        timeSlot: '',
        facultyName: ''
      }));
    });
  }

  submit(): void {
    const payload: TimetableWeekRequest = {
      department: this.department,
      semester: this.semester,
      entries: []
    };

    let hasEmptyFields = false;

    this.days.forEach(day => {
      this.timetableData[day].forEach(entry => {
        if (!entry.subject || !entry.timeSlot || !entry.facultyName) {
          hasEmptyFields = true;
        }
        payload.entries.push({
          day,
          subject: entry.subject,
          timeSlot: entry.timeSlot,
          facultyName: entry.facultyName
        });
      });
    });

    if (hasEmptyFields) {
      this.showToastMessage('⚠️ Please fill in all subject, faculty, and time slot fields.', true);
      return;
    }

    this.loading = true;

    this.timetableService.createWeekTimetable(payload).subscribe({
      next: (res) => {
        this.loading = false;
        this.showToastMessage(res.message || '✅ Timetable created successfully!');
        this.resetForm();
      },
      error: (err) => {
        this.loading = false;
        console.error('❌ Submission error:', err);
        this.showToastMessage('❌ Failed to create timetable. Check console.', true);
      }
    });
  }

  private showToastMessage(message: string, isError: boolean = false): void {
    this.toastMessage = message;
    this.showToast = true;

    if (isError) {
      document.getElementById('toast')!.classList.add('error');
    } else {
      document.getElementById('toast')!.classList.remove('error');
    }

    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }

  private resetForm(): void {
    this.department = '';
    this.semester = 1;
    this.days.forEach(day => {
      this.timetableData[day] = this.periods.map(() => ({
        day: day,
        subject: '',
        timeSlot: '',
        facultyName: ''
      }));
    });
  }
}
