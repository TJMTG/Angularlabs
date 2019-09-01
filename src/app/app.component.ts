import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chatter';
  isLoggedIn = false;

  logout(){
    sessionStorage.clear();
    console.log("Session Storage Cleared");
    this.isLoggedIn = false;
  }

}
