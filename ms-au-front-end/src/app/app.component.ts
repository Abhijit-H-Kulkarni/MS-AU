import { Component } from '@angular/core';
import { AuthService } from "angularx-social-login"
import { AssessmentComponent } from './components/assessment/assessment.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  loginStatus:string;
  title="MS-AU Management Portal";
  constructor(private socioAuthServ:AuthService) {
    this.loginStatus = localStorage.getItem('loginStatus');
  }
  ngOnInit(): void {}

  logOut() {
    localStorage.setItem('loginStatus', 'false');
    localStorage.setItem('welcome','true');
    localStorage.setItem('isadmin','false');
    this.socioAuthServ.signOut();
   }
}
