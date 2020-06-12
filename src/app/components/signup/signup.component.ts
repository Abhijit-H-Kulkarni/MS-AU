import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { Encryption } from '../encryption/encryption';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private router: Router, private loginService:LoginService) { }

  user_info = {email:'', uname:'', psw:''};
  
  signup(event: Event) {
    event.preventDefault();
    if(this.user_info.email!='' && this.user_info.psw!='' && this.user_info.uname!='') {
       let encryptionObj:Encryption = new Encryption();
       this.user_info.psw = encryptionObj.encrypt(this.user_info.psw);
       this.loginService.createUser(this.user_info).subscribe(data => console.log(data), error => console.log(error));
       this.router.navigateByUrl('/login');
    }
    else
      alert("Please fill all the details.");
  }
  ngOnInit(): void {
  }

}
