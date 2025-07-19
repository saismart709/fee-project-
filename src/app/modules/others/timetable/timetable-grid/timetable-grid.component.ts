import { Component, OnInit } from '@angular/core';
import { TimetableService } from 'src/app/Services/timetable.service';
import { TimetableEntry } from 'src/app/Models/timetable-create';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-timetable-grid',
  templateUrl: './timetable-grid.component.html',
  styleUrls: ['./timetable-grid.component.css']
})
export class TimetableGridComponent implements OnInit {
  departments: string[] = ['CS', 'AI', 'BCA', 'MCA', 'BBA'];
  semesters: number[] = [1, 2, 3, 4, 5, 6];

  selectedDepartment: string = '';
  selectedSemester: number | null = null;

  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  periods = [1, 2, 3, 4, 5, 6];

  timetableMatrix: { [day: string]: (TimetableEntry | null)[] } = {};

  constructor(private timetableService: TimetableService) {}

  ngOnInit(): void {
    this.initMatrix();
  }

  initMatrix(): void {
    this.days.forEach(day => {
      this.timetableMatrix[day] = new Array(this.periods.length).fill(null);
    });
  }

  loadGrid(): void {
    if (!this.selectedDepartment || !this.selectedSemester) return;

    this.initMatrix();

    this.timetableService.getAll(this.selectedDepartment, this.selectedSemester).subscribe(data => {
      console.log("DATA RECEIVED:", data);

      data.forEach(entry => {
        const day = entry.day;
        const index = this.getPeriodIndex(entry.timeSlot);

        if (index >= 0 && this.timetableMatrix[day]) {
          this.timetableMatrix[day][index] = entry;
        } else {
          console.warn("⚠️ Skipped entry (Invalid day/slot):", entry);
        }
      });
    });
  }

  getPeriodIndex(timeSlot: string): number {
    const match = timeSlot.match(/\d+/);
    const periodNumber = match ? parseInt(match[0]) : NaN;
    return isNaN(periodNumber) ? -1 : periodNumber - 1;
  }

  downloadExcel(): void {
    const rows = [['Day', ...this.periods.map(p => `Period ${p}`)]];
    this.days.forEach(day => {
      const row = [
        day,
        ...this.timetableMatrix[day].map(entry =>
          entry ? `${entry.subject} (${entry.facultyName})` : ''
        )
      ];
      rows.push(row);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Timetable');

    XLSX.writeFile(workbook, 'Timetable.xlsx');
  }

  downloadPDF(): void {
    const doc = new jsPDF();
    const rows = this.days.map(day => [
      day,
      ...this.timetableMatrix[day].map(entry =>
        entry ? `${entry.subject} (${entry.facultyName})` : ''
      )
    ]);

    const head = [['Day', ...this.periods.map(p => `Period ${p}`)]];

    autoTable(doc, {
      head: head,
      body: rows,
      startY: 10
    });

    doc.save('Timetable.pdf');
  }
}
