import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from "angularx-social-login"
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:any;
  user_info = {email:'',pwd:''};
  constructor(private socioAuthServ:AuthService, private router: Router) { }

  login(event: Event) {
    // Validation success
    sessionStorage.setItem('loginStatus', 'true');
    sessionStorage.setItem('username',this.user_info.email);
    location.href="/home";
  }

  signInGoogle(platform:string) {
    platform = GoogleLoginProvider.PROVIDER_ID;
    this.socioAuthServ.signIn(platform).then((response) => {
      this.user = response;
      sessionStorage.setItem('loginStatus', 'true');
      sessionStorage.setItem('username',response.firstName);
      // Successfull Login
      if(response.id!=null)
        location.href="/home"
    });
  }

  ngOnInit(): void {
  }

}
