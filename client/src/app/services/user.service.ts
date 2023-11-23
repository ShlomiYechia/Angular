import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = 'http://localhost:8080/users/';
  constructor(private httpclient : HttpClient) { }

  get(){
    return this.httpclient.get(this.URL);
  }
  login(username:string,password:string){
    return this.httpclient.post(this.URL + 'login',{username:username,password:password});
  }
  storeToken(token:string){
    localStorage.setItem('token',token);
  }
  delete(id:string){
    return this.httpclient.delete(this.URL + id);
  }
  post(user: User){
    return this.httpclient.post(this.URL, user);
  }
  put(user: User){
    return this.httpclient.put(this.URL + user._id,user);
  }
  getToken(){
    return localStorage.getItem("token");
  }
}
