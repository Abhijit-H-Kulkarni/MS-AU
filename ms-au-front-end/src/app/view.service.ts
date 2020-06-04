import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  baseUrl = 'http://localhost:8080/assignment/';
  constructor(private http:HttpClient) { }

  getAssignments() {
    return this.http.get(this.baseUrl+"/getassignments")
  }

  addAssignment(assignment) {
    return this.http.post(this.baseUrl+'/addassignment',assignment, { observe: 'response' });
  }

  getAssignmentsById(assignment) {
    return this.http.post(this.baseUrl+'/getassignmentsbyid',assignment);
  }

  getSumOfWeights(assignment) {
    return this.http.post(this.baseUrl+'/getsumofweights',assignment);
  }

  getById(assignment) {
    return this.http.post(this.baseUrl+'/findbyid',assignment);
  }
}
