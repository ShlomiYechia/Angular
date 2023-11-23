// login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Task from 'src/app/model/task.model';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  loggedIn: boolean = false;

  task: Task []= [];
  


  constructor(private userService: UserService,
     private router: Router,
     private socketservice:SocketService) {

      this.socketservice.setupSocketConnection();
      this.socketservice.socket.on('connection',(msg:any) => {
        this.task.push(msg);
      })
     }

  loginuser() {
    this.userService.login(this.username, this.password)
      .subscribe((data: any) => {
        alert("login successful");
        this.userService.storeToken(data.token);
        this.router.navigate(['/tasklist']);
      }, error => {
        alert(error.error);
      });
  }
}
