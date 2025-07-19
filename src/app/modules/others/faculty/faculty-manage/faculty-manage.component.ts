import { Component, OnInit } from '@angular/core';
import { Faculty } from 'src/app/Models/faculty.model';
import { FacultyService } from 'src/app/Services/faculty.service';

@Component({
  selector: 'app-faculty-manage',
  templateUrl: './faculty-manage.component.html',
  styleUrls: ['./faculty-manage.component.css']
})
export class FacultyManageComponent implements OnInit {
  faculty: Faculty = {
    firstName: '',
    lastName: '',
    phone: '',
    department: ''
  };

  facultyList: Faculty[] = [];
  filteredFaculty: Faculty[] = [];

  editingId: number | null = null;
  searchQuery = '';
  currentPage = 1;
  pageSize = 5;

  constructor(private facultyService: FacultyService) {}

  ngOnInit(): void {
    this.loadFacultyList();
  }

  loadFacultyList(): void {
    this.facultyService.getFacultyList().subscribe({
      next: (data: Faculty[]) => {
        this.facultyList = data;
        this.filterFaculty();
      },
      error: (err) => console.error('Error fetching faculty list:', err)
    });
  }

  addOrUpdateFaculty(): void {
    if (!this.faculty.firstName || !this.faculty.lastName || !this.faculty.phone || !this.faculty.department) {
      alert('Please fill in all fields.');
      return;
    }

    if (this.editingId !== null) {
      this.facultyService.updateFaculty(this.editingId, this.faculty).subscribe({
        next: () => {
          this.clearForm();
          this.loadFacultyList();
        },
        error: (err) => console.error('Error updating faculty:', err)
      });
    } else {
      this.facultyService.createFaculty(this.faculty).subscribe({
        next: () => {
          this.clearForm();
          this.loadFacultyList();
        },
        error: (err) => console.error('Error creating faculty:', err)
      });
    }
  }

  editFaculty(faculty: Faculty): void {
    this.faculty = { ...faculty };
    this.editingId = faculty.id ?? null;
  }

  deleteFaculty(id: number | undefined): void {
    if (!id) return;
    this.facultyService.deleteFaculty(id).subscribe({
      next: () => this.loadFacultyList(),
      error: (err) => console.error('Error deleting faculty:', err)
    });
  }

  clearForm(): void {
    this.faculty = {
      firstName: '',
      lastName: '',
      phone: '',
      department: ''
    };
    this.editingId = null;
  }

  filterFaculty(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredFaculty = this.facultyList.filter(f =>
      f.firstName.toLowerCase().includes(query) ||
      f.lastName.toLowerCase().includes(query)
    );
    this.currentPage = 1;
  }

  get pagedFaculty(): Faculty[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredFaculty.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage * this.pageSize < this.filteredFaculty.length) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}


