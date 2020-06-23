import { Component, Inject  } from '@angular/core';
import { AuthService } from "angularx-social-login"
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  logoDisplayStatus:Boolean;
  loginStatus:string;
  isAdmin:boolean;
  title="MS-AU Management Portal";
  constructor(private socioAuthServ:AuthService, @Inject(DOCUMENT) private document: Document) {
    this.loginStatus = localStorage.getItem('loginStatus');
    let url = this.document.location.href;
    if(url=="https://ms-au-frontend.herokuapp.com/")
      this.logoDisplayStatus = true;
    else
      this.logoDisplayStatus = false;
    
    if(localStorage.getItem("isadmin")=="true")
      this.isAdmin = true;
    else
      this.isAdmin = false;
  }
  ngOnInit(): void {}

  logOut() {
    localStorage.setItem('loginStatus', 'false');
    localStorage.setItem('welcome','true');
    localStorage.setItem('isadmin','false');
    localStorage.setItem('isTrainer','false');
    this.socioAuthServ.signOut();
   }


}
