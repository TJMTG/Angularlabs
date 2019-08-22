import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = "";
  upwd = "";
  users:any = [
    {'username':'sillyUser12', 'birthdate':'12/03/1998', 'age':'21', 'email':'123@com.au', 'pwd':'123', 'valid':false},
    {'username':'otherUser99', 'birthdate':'04/01/1997', 'age':'22', 'email':'456@com.au', 'pwd':'123', 'valid':false},
    {'username':'thatsUser22', 'birthdate':'27/11/1996', 'age':'23', 'email':'789@com.au', 'pwd':'123', 'valid':false},
  ]

  constructor(private router: Router, private el: ElementRef){}

  ngOnInit() {
  }

  loginClicked(){
    let temp = false
    for (let i = 0; i < this.users.length; i++){
      if (this.email == this.users[i].email &&this.upwd == this.users[i].pwd){
          temp = true
          var loginInfoObj = this.users[i]
          loginInfoObj.pwd = ''
          loginInfoObj.valid = true
          break
      }
    }
    let loginTag = this.el.nativeElement.querySelector('#loginform');
    let errorTag = this.el.nativeElement.querySelector('#errorMessage');
    if (temp == false) {
      loginTag.classList.add('fail');
      errorTag.classList.remove('hideMessage');
      errorTag.classList.add('showMessage');
    } else {
      if (typeof(Storage) !== "undefined"){
        console.log('Storage ready');
        let stringifiedUsername = JSON.stringify(loginInfoObj.username);
        sessionStorage.setItem("username", stringifiedUsername);
        let stringifiedBirthdate = JSON.stringify(loginInfoObj.birthdate);
        sessionStorage.setItem("birthdate", stringifiedBirthdate);
        let stringifiedAge = JSON.stringify(loginInfoObj.age);
        sessionStorage.setItem("age", stringifiedAge);
        let stringifiedEmail = JSON.stringify(loginInfoObj.email);
        sessionStorage.setItem("email", stringifiedEmail);
        sessionStorage.setItem("valid", "true");
        if (true == true){
            console.log("Username: ", sessionStorage.getItem("username"));
            console.log("Birthdate: ", sessionStorage.getItem("birthdate"));
            console.log("Age: ", sessionStorage.getItem("age"));
            console.log("Email: ", sessionStorage.getItem("email"));
        }
        } else {
          console.log("No Storage Support.");
        }
      this.router.navigateByUrl('/account');
    }
      //sessionStorage.clear(); to clear all items from storage
  }

}