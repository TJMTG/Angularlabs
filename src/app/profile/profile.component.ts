import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  FORMusername = JSON.parse(sessionStorage.getItem("username"));
  FORMbirthdate = JSON.parse(sessionStorage.getItem("birthdate"));
  FORMage = JSON.parse(sessionStorage.getItem("age"));
  FORMemail = JSON.parse(sessionStorage.getItem("email"));

  constructor(private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem("valid") != null){
      if (sessionStorage.getItem("valid") == "true"){
        console.log("You are logged in.")
      } else {
        this.router.navigateByUrl('/login');
      }
    } else {
      this.router.navigateByUrl('/login');
    }
    console.log("Username: ", sessionStorage.getItem("username"));
    console.log("Birthdate: ", sessionStorage.getItem("birthdate"));
    console.log("Age: ", sessionStorage.getItem("age"));
    console.log("Email: ", sessionStorage.getItem("email"));
  }

  saveClicked(){
    sessionStorage.setItem("username", JSON.stringify(this.FORMusername));
    sessionStorage.setItem("birthdate", JSON.stringify(this.FORMbirthdate));
    sessionStorage.setItem("age", JSON.stringify(this.FORMage));
    sessionStorage.setItem("email", JSON.stringify(this.FORMemail));
  }

}
