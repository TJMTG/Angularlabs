import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

const BACKEND_URL = 'http://localhost:4200';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormUsername = "";
  loginFormPassword = "";

  constructor(private router: Router, private el: ElementRef, private httpClient: HttpClient){}

  ngOnInit() {
  }

  loginClicked(){
    this.httpClient.post(
      BACKEND_URL + '/api/auth', this.loginFormPassword, httpOptions
    ).subscribe((res: any) => {
      if (res.valid) {
        if (typeof(Storage) !== "undefined"){
          console.log('Storage ready');
          sessionStorage.setItem("username", res.username);
          sessionStorage.setItem("email", res.email);
          sessionStorage.setItem("Role", res.Role);
          sessionStorage.setItem("valid", res.valid);
          if (true == true){
            console.log("Username: ", sessionStorage.getItem("username"));
            console.log("Birthdate: ", sessionStorage.getItem("birthdate"));
            console.log("Age: ", sessionStorage.getItem("age"));
            console.log("Email: ", sessionStorage.getItem("email"));
          }
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
