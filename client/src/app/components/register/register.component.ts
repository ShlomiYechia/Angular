import { Component } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

user:User = new User();

constructor(private userService: UserService
  ,private router: Router){}
  registerUser(){
    this.userService.post(this.user).subscribe((data: any)=>{
      alert("User registed successfully");
    },(error: any )=>{
      console.log(error);
    })
  }
}
