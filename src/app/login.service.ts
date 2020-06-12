import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  
  
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8080/user/'; 

  constructor(private http:HttpClient) { }

  createUser(user: object): Observable<object> {  
    return this.http.post(`${this.baseUrl}`+'adduser', user);  
  }  

  findUser(user: object): Observable<object> {  
    return this.http.post(`${this.baseUrl}`+'finduser', user);  
  }  
}
