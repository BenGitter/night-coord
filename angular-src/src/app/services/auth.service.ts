import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post("/users/register", user, {headers:headers})
      .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post("/users/authenticate", user, {headers:headers})
      .map(res => res.json());  
  }

  getId(){
    return JSON.parse(localStorage.getItem("user")).id;
  }

  getProfile(){
    this.loadToken();

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.authToken);
    return this.http.get("/users/profile", {headers:headers})
      .map(res => res.json());      
  }
  
  loadToken(){
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired("id_token");
  }

  storeUserData(token, user){
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
