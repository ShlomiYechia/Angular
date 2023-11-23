import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import Task from 'src/app/model/task.model';
import { SocketService } from 'src/app/services/socket.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent {
  task:Task []= [];


  constructor(private taskService:TaskService,
    private userService:UserService,
    private socketio: SocketService,
    private router:Router){
      this.socketio.setupSocketConnection();

      this.socketio.socket.on('newTask',(tsk:any) => {
        this.task.push(tsk);
      })
    }

  onSubmit(title:string, desc:string,priority:string){
    this.taskService.post(new Task("",title,desc,priority)).subscribe((data:any)=>{
      this.task.push(data as Task);
      this.socketio.taskIO(data)
      this.router.navigate(['/tasklist']);
    });
  }
}
