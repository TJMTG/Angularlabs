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
    {'email':'123@com.au', 'pwd':'123'},
    {'email':'abc@com.au', 'pwd':'123'},
    {'email':'xyz@com.au', 'pwd':'123'}
  ]

  constructor(private router: Router, private el: ElementRef){}

  ngOnInit() {
  }

  loginClicked(){
    let temp = false
    for (let i = 0; i < this.users.length; i++){
      if (this.email == this.users[i].email &&this.upwd == this.users[i].pwd){
          temp = true
      }
    }
    let loginTag = this.el.nativeElement.querySelector('#loginform');
    let errorTag = this.el.nativeElement.querySelector('#errorMessage');
    if (temp == true) {
      loginTag.classList.remove('fail');
      loginTag.classList.add('success');

      errorTag.classList.remove('showMessage');
      errorTag.classList.add('hideMessage');

      this.router.navigateByUrl('/account');
    } else {
      loginTag.classList.remove('success');
      loginTag.classList.add('fail');

      errorTag.classList.remove('hideMessage');
      errorTag.classList.add('showMessage');
    }
  }

}

