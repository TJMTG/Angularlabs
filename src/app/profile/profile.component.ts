import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  testing = "";

  userRole = JSON.parse(sessionStorage.getItem('role'));

  createUsername = "";
  createEmail = "";
  createRole = "";

  deleteUsername = "";

  createGroup = "";

  deleteGroup = "";

  pair_U_G_groupname = "";
  pair_U_G_username = "";
  
  depair_U_G_groupname = "";
  depair_U_G_username = "";

  createChannel_groupname = "";
  createChannel_channelname = "";

  deleteChannel_groupname = "";
  deleteChannel_channelname = "";

  pair_U_C_groupname = "";
  pair_U_C_channelname = "";
  pair_U_C_username = "";
  
  depair_U_C_groupname = "";
  depair_U_C_username = "";
  depair_U_C_channelname = "";


  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    if (sessionStorage.getItem("username") == null){
      this.router.navigateByUrl('/login');
    }
  }

  public testingClicked(){
    if (this.testing == ""){
      alert("Please fill in all relevent forms.");
    } else {
      this.httpClient.post(
        BACKEND_URL + '/FindUser', {"username": this.testing}, httpOptions
      ).subscribe((data: any) => {
        if (data.ok) {
            alert("True.");
          } else {
            alert("False.");
          }
          this.testing = "";
      });
    }
  }

  public createUserClicked(){
    if (this.createUsername == "" ||  this.createEmail == ""){
      alert("Please fill in all relevent forms.");
    } else {
      if(this.createRole == ""){
        this.createRole = "regularUser";
      }
      this.httpClient.post(
        BACKEND_URL + '/createUser', {"username": this.createUsername, "email": this.createEmail, "role": this.createRole}, httpOptions
      ).subscribe((data: any) => {
          alert(data.resultMessage);
          this.createUsername = "";
          this.createEmail = "";
          this.createRole = "";
      });
    }
  }

  public deleteUserClicked(){
    if (this.deleteUsername == ""){
      alert("Please fill in all relevent forms.");
    } else {
      this.httpClient.post(
        BACKEND_URL + '/deleteUser', {"username": this.deleteUsername, "exeRole": sessionStorage.getItem("role")}, httpOptions
      ).subscribe((data: any) => {
            alert(data.resultMessage);
          this.deleteUsername = "";
      });
    }
  }

  public createGroupClicked(){
    if (this.createGroup == ""){
      alert("Please fill in all relevent forms.");
    } else {
      this.httpClient.post(
        BACKEND_URL + '/createGroup', {"name": this.createGroup, "creator": JSON.parse(sessionStorage.getItem("username"))}, httpOptions
      ).subscribe((data: any) => {
        alert(data.resultMessage);
        this.createGroup = "";
      });
    }
  }

  public deleteGroupClicked(){
    if (this.deleteGroup == ""){
      alert("Please fill in all relevent forms.");
    } else {
      this.httpClient.post(
        BACKEND_URL + '/deleteGroup', {"name": this.deleteGroup}, httpOptions
      ).subscribe((data: any) => {
        alert(data.resultMessage);
        this.deleteGroup = "";
      });
    }
  }

  public pair_U_G_Clicked(){
    if (this.pair_U_G_groupname == "" ||  this.pair_U_G_username == ""){
      alert("Please fill in all relevent forms.");
    } else {
      this.httpClient.post(
        BACKEND_URL + '/pairGroupUser', {"groupname": this.pair_U_G_groupname, "username": this.pair_U_G_username}, httpOptions
      ).subscribe((data: any) => {
        alert(data.resultMessage);
        this.pair_U_G_groupname = "";
        this.pair_U_G_username = "";
      });
    }
  }

  public depair_U_G_Clicked(){
    if (this.depair_U_G_groupname == "" ||  this.depair_U_G_username == ""){
      alert("Please fill in all relevent forms.");
    } else {
      this.httpClient.post(
        BACKEND_URL + '/depairGroupUser', {"groupname": this.depair_U_G_groupname, "username": this.depair_U_G_username}, httpOptions
      ).subscribe((data: any) => {
        alert(data.resultMessage);
        this.depair_U_G_groupname = "";
        this.depair_U_G_username = "";
      });
    }
  }

  public createChannelClicked(){
    if (this.createChannel_groupname == "" || this.createChannel_channelname == ""){
      alert("Please fill in all relevent forms.");
    } else {
      this.httpClient.post(
        BACKEND_URL + '/createChannel', {"groupname": this.createChannel_groupname, "name": this.createChannel_channelname, "creator": JSON.parse(sessionStorage.getItem("username"))}, httpOptions
      ).subscribe((data: any) => {
        alert(data.resultMessage);
        this.createChannel_groupname = "";
        this.createChannel_channelname = "";
      });
    }
  }

  public deleteChannelClicked(){
    if (this.deleteChannel_groupname == "" || this.deleteChannel_channelname == ""){
      alert("Please fill in all relevent forms.");
    } else {
      this.httpClient.post(
        BACKEND_URL + '/deleteChannel', {"groupname": this.deleteChannel_groupname, "name": this.deleteChannel_channelname}, httpOptions
      ).subscribe((data: any) => {
        alert(data.resultMessage);
        this.deleteChannel_groupname = "";
        this.deleteChannel_channelname = "";
      });
    }
  }

  public pair_U_C_Clicked(){
    if (this.pair_U_C_groupname == "" ||  this.pair_U_C_username == "" ||  this.pair_U_C_channelname == ""){
      alert("Please fill in all relevent forms.");
    } else {
      this.httpClient.post(
        BACKEND_URL + '/pairGroupChannelUser', {"groupname": this.pair_U_C_groupname, "channelname": this.pair_U_C_channelname, "username": this.pair_U_C_username}, httpOptions
      ).subscribe((data: any) => {
        alert(data.resultMessage);
        this.pair_U_C_groupname = "";
        this.pair_U_C_username = "";
        this.pair_U_C_channelname = "";
      });
    }
  }

  public depair_U_C_Clicked(){
    if (this.depair_U_C_groupname == "" ||  this.depair_U_C_username == "" && this.depair_U_C_channelname){
      alert("Please fill in all relevent forms.");
    } else {
      this.httpClient.post(
        BACKEND_URL + '/depairGroupChannelUser', {"groupname": this.depair_U_C_groupname, "channelname": this.depair_U_C_channelname, "username": this.depair_U_C_username}, httpOptions
      ).subscribe((data: any) => {
        alert(data.resultMessage);
        this.pair_U_C_groupname = "";
        this.pair_U_C_username = "";
        this.pair_U_C_channelname = "";
      });
    }
  }

}

