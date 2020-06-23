import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from "angularx-social-login"
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { Encryption } from '../encryption/encryption';
import { NGXLogger } from 'ngx-logger';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:any;
  user_info = {email:'', uname:'', psw:''};

  constructor(private logger: NGXLogger,private socioAuthServ:AuthService, private router: Router, private loginService:LoginService) {
    
    if(localStorage.getItem('loginStatus')=='true')
      location.href="/assessment";
   }
  

  login(event: Event) {
    let encryptionObj:Encryption = new Encryption();
    let enpsw = encryptionObj.encrypt(this.user_info.psw);
    this.logger.info("Login Event.");
    if(this.user_info.email=="" || this.user_info.psw=="") 
      alert("Invalid input. Please enter all the fields properly.")
    else {
    this.loginService.findUser({email:this.user_info.email,uname:"",psw:enpsw}).subscribe(data => {
      if(data==null) {
        alert("You aren't a registered user.")
        this.logger.info("User not found.");
      }
      else {
        if(enpsw != data["psw"]) {
          alert("Email and password do not match. Please try again.")
          this.logger.info("Incorrect credentials.");
        }
        else {
          this.user_info.uname = data["uname"];
          localStorage.setItem('loginStatus', 'true');
          localStorage.setItem('username',this.user_info.uname);
          localStorage.setItem('uid', data["uid"]);
          if(this.user_info.uname=="admin")
            localStorage.setItem("isadmin","true");
          else
            localStorage.setItem("isadmin","false");
          this.loginService.getTrainer({tid:"",tname:"",designation:"",specialities:"",email:this.user_info.email}).subscribe(data=>{
            if(data!=null)
              localStorage.setItem("isTrainer","true");
            else
              localStorage.setItem("isTrainer","false");
          });
          localStorage.setItem('welcome','true');
          location.href="/assessment";
          this.logger.info("Successful Login.");
        }
      }
    }, err => {
      alert("Login failed.");
      this.logger.error("Unable to fetch data. Error : "+err);
    });
  }
  }

  signInGoogle(platform:string) {
    platform = GoogleLoginProvider.PROVIDER_ID;
    this.socioAuthServ.signIn(platform).then((response) => {
      this.logger.info("Google sign in Event.");
      this.user = response;
      if(response.email.match("[a-zA-Z ]*.[a-zA-Z ]*@accoliteindia.com")!=null) {
      localStorage.setItem('loginStatus', 'true');
      localStorage.setItem('username',response.firstName);
      localStorage.setItem('email', response.email);
      localStorage.setItem('welcome','true');
      // Successfull Login
      if(response.id!=null)
        this.loginService.findUser({email:response.email,uname:response.firstName,psw:""}).subscribe(data => {
          this.logger.info("Find User Event.");
          this.loginService.getTrainer({tid:"",tname:"",designation:"",specialities:"",email:this.user.email}).subscribe(data=>{
            if(data!=null)
              localStorage.setItem("isTrainer","true");
            else
              localStorage.setItem("isTrainer","false");
          });
          // Perform validation
          if(data==null) {
            this.logger.info("New Password Event.");
            location.href="/password";
          }
          else {
            this.logger.info("Assessment page.");
            localStorage.setItem('uid', data["uid"]);
            location.href="/assessment";
          }
        }, err=> {
          this.logger.error("Error : "+err);
        });
      }
      else {
        this.logger.info("Invalid email.");
        alert("Please use your accolite mail to login.")
      }
    },err=>{
      this.logger.error("Error : "+err);
    });
  }

  ngOnInit(): void {
  }

}
