import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private baseUrl = 'https://ms-au-backend.herokuapp.com/location/'; 
  constructor(private http:HttpClient) { }

  incrementCount(location): Observable<object> {
    return this.http.post(this.baseUrl+"incrementcount",location);
  }

  getLocations():Observable<object> {
    return this.http.get(this.baseUrl+"getlocations");
  }
}
