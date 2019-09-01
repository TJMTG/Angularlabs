import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  FORM_username = JSON.parse(sessionStorage.getItem("username"));
  FORM_email = JSON.parse(sessionStorage.getItem("email"));
  FORM_role = JSON.parse(sessionStorage.getItem("role"));

  groups = ['thing', 'a', 'ma', ['is', 'this', 'what', 'you', 'want'], 'bob']
  
  /*this.httpClient.post(
    BACKEND_URL + '/groupSTART', this.userOBJ, httpOptions
  ).subscribe((data: any) => {
    if (data.ok) {
      
    }
  });
  */

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    if (sessionStorage.getItem("username") == null){
      this.router.navigateByUrl('/login');
    }
  }

  saveClicked(){
    sessionStorage.setItem("username", JSON.stringify(this.FORM_username));
    sessionStorage.setItem("email", JSON.stringify(this.FORM_email));
  }

}
