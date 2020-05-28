import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  uname:string;
  loginStatus:string;
  constructor() {
    this.loginStatus = sessionStorage.getItem('loginStatus');
   }

  ngOnInit(): void {
    this.uname = sessionStorage.getItem('username');
  }
}
