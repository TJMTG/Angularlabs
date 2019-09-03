import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};
//for angualr http methods
import { NgForm } from '@angular/forms';
//import { Userpwd } from '../userpwd';
import { UserOBJ } from './UserOBJ';
import { Router } from '@angular/router';
//import {  } from 'src/app/login/login.component';

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginFormUsername = "";
  //loginFormPassword = "";

  userOBJ: UserOBJ = {
    username: this.loginFormUsername, 
    //password: this.loginFormPassword,  
    email: null,
    role: null,
    valid: "false"
  }

  constructor(private router: Router, private el: ElementRef, private httpClient: HttpClient){}

  ngOnInit() {}

 public loginClicked(){
    console.log("Login was clicked");
    sessionStorage.clear();
    console.log("Session Storage Cleared");

    this.userOBJ.username = this.loginFormUsername;
    //this.userOBJ.pwd = this.loginFormPassword;

    this.httpClient.post(
        BACKEND_URL + '/loginSTART', this.userOBJ, httpOptions
      ).subscribe((data: any) => {
        if (data.ok) {
          if (typeof(Storage) !== "undefined"){
            console.log('Storage ready');
            sessionStorage.setItem("username", JSON.stringify(data.result.username));
            sessionStorage.setItem("email", JSON.stringify(data.result.email));
            sessionStorage.setItem("role", JSON.stringify(data.result.role));
            if (true == true){
              console.log("Username: ", sessionStorage.getItem("username"));
              console.log("email: ", sessionStorage.getItem("email"));
              console.log("role: ", sessionStorage.getItem("role"));
            }
            this.httpClient.post<UserOBJ[]>(BACKEND_URL + '/loginEND', data.result, httpOptions)
            .subscribe((m: any) => {console.log("m: ", m);});
            this.router.navigateByUrl('/account');
          } else {
            console.log("No Storage Support.");
          }
        } else {
          let loginTag = this.el.nativeElement.querySelector('#loginform');
          let errorTag = this.el.nativeElement.querySelector('#errorMessage');
          loginTag.classList.add('fail');
          errorTag.classList.remove('hideMessage');
          errorTag.classList.add('showMessage');
        }
    });
  }
}
