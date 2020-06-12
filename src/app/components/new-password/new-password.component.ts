import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { Encryption } from '../encryption/encryption';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  user_info = {email:localStorage.getItem("email"), uname:localStorage.getItem("username"), psw:''};
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  submit(event:Event) {
    event.preventDefault();
    let encryptionObj:Encryption = new Encryption();
    if(this.user_info.psw!='') {
      this.user_info.psw = encryptionObj.encrypt(this.user_info.psw);
      this.loginService.createUser(this.user_info).subscribe(data => console.log(data), error => console.log(error));
      setTimeout(()=>{location.href="/assessment";},3000);
    }
    else {
      alert("Please enter the password.");
    }
  }

}
