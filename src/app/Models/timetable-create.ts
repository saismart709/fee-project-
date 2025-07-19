export interface TimetableDayEntry {
  day: string;
  subject: string;
  timeSlot: string;
  facultyName: string;
}

export interface TimetableWeekRequest {
  department: string;
  semester: number;
  entries: TimetableDayEntry[];
}
export interface TimetableEntry {
  id: number;
  day: string;
  timeSlot: string;
  subject: string;
  facultyName: string;
  department: string;
  semester: number;
}

