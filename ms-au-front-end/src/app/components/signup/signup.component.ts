import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router) { }

  user_info = {uname:'', email:'', pwd:''};
  
  signup(event: Event) {
    event.preventDefault();
    if(this.user_info.email!='' && this.user_info.pwd!='' && this.user_info.uname!='')
       this.router.navigateByUrl('/login');
    else
      alert("Please fill all the details.");
  }
  ngOnInit(): void {
  }

}
