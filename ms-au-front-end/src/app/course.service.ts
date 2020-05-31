import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:8080/course/'; 

  constructor(private http:HttpClient) { }

  getCourseById(course: object): Observable<object> {
    return this.http.post(this.baseUrl+"/getcoursebyid", course);
  }

  getCourses(): Observable<object> {
    return this.http.get(this.baseUrl+"getcourses");
  }
  
  addCourse(course: object): Observable<object> {
    return this.http.post(this.baseUrl+"/addcourse", course);
  }

  updateCourse(course: object): Observable<object> {
    return this.http.post(this.baseUrl+"/updatecourse", course);
  }

  deleteCourse(course: object): Observable<object> {
    return this.http.post(this.baseUrl+"/deletecourse", course);
  }
}
