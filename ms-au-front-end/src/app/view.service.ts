import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  baseUrl = 'http://localhost:8080/assignment/';
  constructor(private http:HttpClient) { }

  getAssignments(): Observable<object> {
    return this.http.get(this.baseUrl+"/getassignments")
  }

  addAssignment(assignment): Observable<object> {
    return this.http.post(this.baseUrl+'/addassignment',assignment, { observe: 'response' });
  }

  getAssignmentsById(assignment): Observable<object> {
    return this.http.post(this.baseUrl+'/getassignmentsbyid',assignment);
  }

  getSumOfWeights(assignment): Observable<object> {
    return this.http.post(this.baseUrl+'/getsumofweights',assignment);
  }

  getById(assignment): Observable<object> {
    return this.http.post(this.baseUrl+'/findbyid',assignment);
  }
}
