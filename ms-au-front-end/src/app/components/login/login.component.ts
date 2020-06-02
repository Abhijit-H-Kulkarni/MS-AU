import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from "angularx-social-login"
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { Encryption } from '../encryption/encryption';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:any;
  user_info = {email:'', uname:null, psw:''};

  constructor(private socioAuthServ:AuthService, private router: Router, private loginService:LoginService) {
    console.log("in constructor");
    
    if(localStorage.getItem('loginStatus')=='true')
      location.href="/assessment";
   }
   
  login(event: Event) {
    let encryptionObj:Encryption = new Encryption();
    this.user_info.psw = encryptionObj.encrypt(this.user_info.psw);
    this.loginService.findUser(this.user_info).subscribe(data => {
      if(data==null)
        alert("You aren't a registered user. Click signup to register for free.")
      else {
        if(this.user_info.psw != data["psw"])
          alert("Email and password do not match. Please try again.")
        else {
          this.user_info.uname = data["uname"];
          localStorage.setItem('loginStatus', 'true');
          localStorage.setItem('username',this.user_info.uname);
          localStorage.setItem('uid', data["uid"]);
          if(this.user_info.uname=="admin")
            localStorage.setItem("isadmin","true");
          else
            localStorage.setItem("isadmin","true");
          localStorage.setItem('welcome','true');
          location.href="/assessment";
        }
      }
    });
  }

  signInGoogle(platform:string) {
    platform = GoogleLoginProvider.PROVIDER_ID;
    this.socioAuthServ.signIn(platform).then((response) => {
      this.user = response;
      if(response.email.match("[a-zA-Z ]*.[a-zA-Z ]*@accoliteindia.com")!=null) {
      localStorage.setItem('loginStatus', 'true');
      localStorage.setItem('username',response.firstName);
      localStorage.setItem('email', response.email);
      localStorage.setItem('welcome','true');
      // Successfull Login
      if(response.id!=null)
        this.loginService.findUser({email:response.email,uname:response.firstName,psw:""}).subscribe(data => {
          // Perform validation
          if(data==null)
            location.href="/password";
          else
          location.href="/assessment";
        });
      }
      else
        alert("Please use your accolite mail to login.")
    });
  }

  ngOnInit(): void {
  }

}
