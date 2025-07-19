import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimetableWeekRequest } from "../Models/timetable-create";
import { TimetableEntry} from "../Models/timetable-create";

@Injectable({ providedIn: 'root' })
  export class TimetableService {
  private baseUrl = 'http://localhost:8080/api/timetable';
  constructor(private http: HttpClient) {

  }
  createWeekTimetable(data: TimetableWeekRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/week`, data, {
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
    });
  }
  getAll(dept?: string, sem?: number): Observable<TimetableEntry[]> {
    let url = `${this.baseUrl}`;
    if (dept || sem !== undefined) {
      url += `?department=${dept || ''}&semester=${sem || ''}`;
    }
    return this.http.get<TimetableEntry[]>(url);
  }

  delete(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/delete/${id}`, {});
  }

  updateTimetableEntry(id: number, updatedEntry: Partial<TimetableEntry>): Observable<any> {
    return this.http.post(`${this.baseUrl}/updae/${id}`, updatedEntry); // your backend uses POST
  }

  deleteTimetableEntry(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/delete/${id}`, {});
  }

}
