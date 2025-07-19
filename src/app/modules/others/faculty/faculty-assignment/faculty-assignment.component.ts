import { Component, OnInit } from '@angular/core';
import { FacultyAssignment} from "../../../../Models/FacultyAssignment";
import { FacultyAssignmentService} from "../../../../Services/faculty-assignment.service";

@Component({
  selector: 'app-faculty-assignments',
  templateUrl: './faculty-assignment.component.html',
  styleUrls: ['./faculty-assignment.component.css']
})
export class FacultyAssignmentsComponent implements OnInit {
  assignment: FacultyAssignment = {
    facultyName: '',
    studentName: '',
    subject: '',
    semester: '',
    year: ''
  };

  assignmentList: FacultyAssignment[] = [];
  filteredAssignments: FacultyAssignment[] = [];
  editingId: number | null = null;

  searchQuery = '';
  currentPage = 1;
  pageSize = 3;

  constructor(private assignmentService: FacultyAssignmentService) {}

  ngOnInit(): void {
    this.loadAssignments();
  }

  loadAssignments(): void {
    this.assignmentService.getAll().subscribe({
      next: (data) => {
        this.assignmentList = data;
        this.filterAssignments();
      },
      error: (err) => console.error('Error fetching assignments:', err)
    });
  }

  addOrUpdateAssignment(): void {
    const valid = this.assignment.facultyName && this.assignment.studentName && this.assignment.subject && this.assignment.semester && this.assignment.year;
    if (!valid) return alert('Please fill all fields.');

    if (this.editingId !== null) {
      this.assignmentService.update(this.editingId, this.assignment).subscribe({
        next: () => {
          this.clearForm();
          this.loadAssignments();
        }
      });
    } else {
      this.assignmentService.create(this.assignment).subscribe({
        next: () => {
          this.clearForm();
          this.loadAssignments();
        }
      });
    }
  }

  editAssignment(a: FacultyAssignment): void {
    this.assignment = { ...a };
    this.editingId = a.id ?? null;
  }

  deleteAssignment(id: number | undefined): void {
    if (!id) return;
    this.assignmentService.delete(id).subscribe({
      next: () => this.loadAssignments()
    });
  }

  clearForm(): void {
    this.assignment = {
      facultyName: '',
      studentName: '',
      subject: '',
      semester: '',
      year: ''
    };
    this.editingId = null;
  }

  filterAssignments(): void {
    const q = this.searchQuery.toLowerCase();
    this.filteredAssignments = this.assignmentList.filter(a =>
      a.facultyName.toLowerCase().includes(q) ||
      a.studentName.toLowerCase().includes(q)
    );
    this.currentPage = 1;
  }

  get pagedAssignments(): FacultyAssignment[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredAssignments.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage * this.pageSize < this.filteredAssignments.length) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
