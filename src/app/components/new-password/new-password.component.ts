import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { Encryption } from '../encryption/encryption';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  user_info = {email:localStorage.getItem("email"), uname:localStorage.getItem("username"), psw:''};
  constructor(private logger: NGXLogger,private loginService:LoginService) { }

  ngOnInit(): void {
  }

  submit(event:Event) {
    event.preventDefault();
    let encryptionObj:Encryption = new Encryption();
    if(this.user_info.psw!='') {
      this.user_info.psw = encryptionObj.encrypt(this.user_info.psw);
      this.loginService.createUser(this.user_info).subscribe(data => {
        this.logger.info("Create User Event.");
      },err=> {
        this.logger.error("Error : "+err);
      });
      setTimeout(()=>{location.href="/assessment";},3000);
    }
    else {
      alert("Please enter the password.");
    }
  }

}
