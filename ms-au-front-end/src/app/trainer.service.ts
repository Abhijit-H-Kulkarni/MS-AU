import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private baseUrl = 'http://localhost:8080/trainer/';
  constructor(private http:HttpClient) { }

  getTrainers(): Observable<object> {
    return this.http.get(this.baseUrl+"getalltrainers");
  }

  findTrainer(trainer: object): Observable<object> {
    return this.http.post(this.baseUrl+"/findtrainer", trainer);
  }

  addTrainer(trainer: object): Observable<object> {
    return this.http.post(this.baseUrl+"addtrainer",trainer);
  }
}
