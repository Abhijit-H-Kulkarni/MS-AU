import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  baseUrl = 'http://localhost:8080/rating/';
  constructor(private http:HttpClient) { }

  getAllRating(rating): Observable<object> {
    return this.http.post(this.baseUrl+"findallratings",rating);
  }

  addRating(rating): Observable<object> {
    return this.http.post(this.baseUrl+"addrating",rating);
  }
}
