import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FacultyAssignment } from '../Models/FacultyAssignment';

@Injectable({
  providedIn: 'root'
})
export class FacultyAssignmentService {
  private baseUrl = 'http://localhost:8080/api/faculty-assignments';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FacultyAssignment[]> {
    return this.http.get<FacultyAssignment[]>(this.baseUrl);
  }

  getById(id: number): Observable<FacultyAssignment> {
    return this.http.get<FacultyAssignment>(`${this.baseUrl}/get/${id}`);
  }

  create(assignment: FacultyAssignment): Observable<FacultyAssignment> {
    return this.http.post<FacultyAssignment>(this.baseUrl, assignment);
  }

  update(id: number, assignment: FacultyAssignment): Observable<FacultyAssignment> {
    return this.http.post<FacultyAssignment>(`${this.baseUrl}/update/${id}`, assignment);
  }

  delete(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/delete/${id}`, {});
  }
}
