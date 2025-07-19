import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Faculty } from '../Models/faculty.model';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  private baseUrl = 'http://localhost:8080/api/faculty';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ?? ''
    });
  }

  getFacultyList(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(this.baseUrl, {
      headers: this.getAuthHeaders()
    });
  }

  createFaculty(faculty: Faculty): Observable<Faculty> {
    return this.http.post<Faculty>(this.baseUrl, faculty, {
      headers: this.getAuthHeaders()
    });
  }

  updateFaculty(id: number, faculty: Faculty): Observable<Faculty> {
    return this.http.post<Faculty>(`${this.baseUrl}/update/${id}`, faculty, {
      headers: this.getAuthHeaders()
    });
  }

  deleteFaculty(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/delete/${id}`, {}, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }
}
