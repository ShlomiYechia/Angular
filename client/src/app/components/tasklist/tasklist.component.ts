import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Task from 'src/app/model/task.model';
import { SocketService } from 'src/app/services/socket.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent {
tasks: Task[] = [];

  constructor(private taskService: TaskService,
    private userservice:UserService,
    private socketio: SocketService,
    private router: Router) {
      this.socketio.setupSocketConnection();

      this.socketio.socket.on('newTask', (tsk:any) =>{
        this.tasks.push(tsk);
      })

      this.socketio.socket.on('deleteTask', (delTask:string) =>{
        this.tasks = this.tasks.filter(item => item._id != delTask);
      }) 
      
    console.log(userservice.getToken());
    this.taskService.get().subscribe((data:any)=>{
      this.tasks = data as Task[];
    })
  }

  getPriorityClass(priority: string): string {
    console.log('Task priority',priority)
    switch (priority) {
      case '1':
      case 'high':
        return 'high-priority';
      case '2':
      case 'medium':
        return 'medium-priority';
      case '3':
      case 'low':
        return 'low-priority';
      default:
        return '';
    }
  }

  onTaskClick(task: Task): void {
    // Add any interactive logic you want when a task is clicked
    console.log(`Task clicked: ${task.title}`);
  }
  deleteTaskHandler(task: Task) {
    this.taskService.delete(task._id).subscribe(() => {
        this.socketio.deleteTask(task);
    });
  }
}
