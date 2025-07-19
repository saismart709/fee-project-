import { Component, OnInit } from '@angular/core';
import { Office } from 'src/app/Models/office.model';
import { OfficeService } from 'src/app/Services/office.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {
  staff: Office = { name: '', role: '', phone: '', gender: '' };
  staffList: Office[] = [];
  filteredList: Office[] = [];

  editingId?: number;
  searchQuery = '';
  currentPage = 1;
  pageSize = 5;

  constructor(private officeService: OfficeService) {}

  ngOnInit(): void {
    this.loadStaff();
  }

  loadStaff(): void {
    this.officeService.getAllStaff().subscribe({
      next: (data) => {
        this.staffList = data;
        this.applyFilters();
      },
      error: (err) => console.error('Failed to fetch staff', err)
    });
  }

  applyFilters(): void {
    const filtered = this.staffList.filter(s =>
      s.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      s.gender?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.filteredList = filtered;
    this.currentPage = 1;
  }

  get paginatedList(): Office[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredList.slice(start, start + this.pageSize);
  }

  addOrUpdate(): void {
    if (!this.staff.name || !this.staff.role || !this.staff.phone || !this.staff.gender) {
      alert('Please fill in all fields.');
      return;
    }

    if (this.editingId) {
      this.officeService.updateStaff(this.editingId, this.staff).subscribe(() => {
        this.resetForm();
        this.loadStaff();
      });
    } else {
      this.officeService.createStaff(this.staff).subscribe(() => {
        this.resetForm();
        this.loadStaff();
      });
    }
  }

  edit(staff: Office): void {
    this.staff = { ...staff };
    this.editingId = staff.id;
  }

  delete(id?: number): void {
    if (!id) return;
    this.officeService.deleteStaff(id).subscribe(() => this.loadStaff());
  }

  resetForm(): void {
    this.staff = { name: '', role: '', phone: '', gender: '' };
    this.editingId = undefined;
  }

  changePage(direction: number): void {
    const totalPages = Math.ceil(this.filteredList.length / this.pageSize);
    this.currentPage += direction;
    if (this.currentPage < 1) this.currentPage = 1;
    if (this.currentPage > totalPages) this.currentPage = totalPages;
  }

  protected readonly Math = Math;
}
