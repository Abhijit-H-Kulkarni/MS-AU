import { Component } from '@angular/core';
import { AuthService } from "angularx-social-login"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  loginStatus:string;
  
  constructor(private socioAuthServ:AuthService) {
    this.loginStatus = sessionStorage.getItem('loginStatus');
  }
  ngOnInit(): void {}

  logOut() {
    sessionStorage.setItem('loginStatus', 'false');
    this.socioAuthServ.signOut();
   }
}
