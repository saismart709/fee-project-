import { Component, OnInit } from '@angular/core';
import { TimetableService } from 'src/app/Services/timetable.service';
import { TimetableEntry } from '../../../../Models/timetable-create';

@Component({
  selector: 'app-timetable-view',
  templateUrl: './timetable-view.component.html',
  styleUrls: ['./timetable-view.component.css']
})
export class TimetableViewComponent implements OnInit {
  timetableList: TimetableEntry[] = [];
  filteredTimetableList: TimetableEntry[] = [];
  paginatedList: TimetableEntry[] = [];

  departments: string[] = ['CS', 'AI', 'BCA', 'MCA', 'BBA'];
  semesters: number[] = [1, 2, 3, 4, 5, 6];

  department: string = '';
  semester: number | undefined;
  searchTerm: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 3;

  editingId: number | null = null;
  editedEntry: Partial<TimetableEntry> = {};

  constructor(private timetableService: TimetableService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.timetableService.getAll(this.department, this.semester).subscribe(data => {
      this.timetableList = data;
      this.filteredTimetableList = [...data];
      this.updatePagination();
    });
  }

  onFilterChange(): void {
    const search = this.searchTerm.toLowerCase();

    this.filteredTimetableList = this.timetableList.filter(entry => {
      const matchesDepartment = this.department ? entry.department === this.department : true;
      const matchesSemester = this.semester ? entry.semester === this.semester : true;

      const matchesSearch =
        entry.subject.toLowerCase().includes(search) ||
        entry.facultyName.toLowerCase().includes(search) ||
        entry.day.toLowerCase().includes(search) ||
        entry.timeSlot.toLowerCase().includes(search);

      return matchesDepartment && matchesSemester && matchesSearch;
    });

    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedList = this.filteredTimetableList.slice(startIndex, endIndex);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToNextPage(): void {
    const totalPages = Math.ceil(this.filteredTimetableList.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  startEdit(entry: TimetableEntry): void {
    this.editingId = entry.id;
    this.editedEntry = { ...entry };
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editedEntry = {};
  }

  saveEdit(id: number): void {
    this.timetableService.updateTimetableEntry(id, this.editedEntry).subscribe({
      next: () => {
        this.editingId = null;
        this.editedEntry = {};
        this.loadData();
      },
      error: (err) => {
        alert("Error updating timetable entry");
        console.error(err);
      }
    });
  }

  deleteEntry(id: number): void {
    if (confirm('Are you sure you want to delete this entry?')) {
      this.timetableService.deleteTimetableEntry(id).subscribe({
        next: () => this.loadData(),
        error: (err) => {
          alert('Error deleting entry');
          console.error(err);
        }
      });
    }
  }

  protected readonly Math = Math;
}
