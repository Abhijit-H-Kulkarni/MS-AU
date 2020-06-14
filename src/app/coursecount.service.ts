import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursecountService {
  private baseUrl = 'https://ms-au-backend.herokuapp.com/coursecount/'; 

  constructor(private http:HttpClient) { }

  public increment(object): Observable<object> {
    return this.http.post(this.baseUrl+"incrementcount",object);
  }

  public getAllCourses(): Observable<object> {
    return this.http.get(this.baseUrl+"getcoursesdesc");
  }
}
