import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import Task from '../model/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket : any;

  private url = "http://localhost:8080"
  constructor(
    ) {
    this.socket = io('http://localhost:8080')
   }
  setupSocketConnection(){
    this.socket = io(this.url)
  }
  sendMessage(message:string){
    this.socket.emit('onMessage', message)
  }
  taskIO(task:Task){
    this.socket.emit('newTask', task)
  }
  deleteTask(task:Task){
    this.socket.emit('ondelete', task._id)
   }
  taskRemoved(){
    return new Observable<string>((observer:any) =>{
      this.socket.on('deletetask',(task:any)=>{
        observer.next(task);
      })
    })
  }
}




