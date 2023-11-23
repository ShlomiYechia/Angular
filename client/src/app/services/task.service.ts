import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import Task from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private URL = 'http://localhost:8080/tasks/'
  constructor(private httpclient:HttpClient,private userservice:UserService ) {}

    get(){
      return this.httpclient.get(this.URL,{
        headers:{
          'Authorization':this.userservice.getToken() as string
        }
      })
    }
    delete(id:string){
      return this.httpclient.delete(this.URL+id)
      //,{
      //   headers:{
      //     'Authorization':this.userservice.getToken() as string
      //   }
      // }
    }
    post(t:Task){
      return this.httpclient.post(this.URL,t)
    }
    put(t:Task){
      return this.httpclient.put(this.URL+t._id,t)
    }
  }
