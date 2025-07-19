import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Office } from '../Models/office.model';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  private baseUrl = 'http://localhost:8080/api/office';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ?? ''
    });
  }

  getAllStaff(): Observable<Office[]> {
    return this.http.get<Office[]>(this.baseUrl, {
      headers: this.getAuthHeaders()
    });
  }

  createStaff(staff: Office): Observable<Office> {
    return this.http.post<Office>(this.baseUrl, staff, {
      headers: this.getAuthHeaders()
    });
  }

  updateStaff(id: number, staff: Office): Observable<Office> {
    return this.http.post<Office>(`${this.baseUrl}/update/${id}`, staff, {
      headers: this.getAuthHeaders()
    });
  }

  deleteStaff(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/delete/${id}`, {}, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }
}
