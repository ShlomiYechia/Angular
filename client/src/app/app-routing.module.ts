import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { TasklistComponent } from './components/tasklist/tasklist.component';
import { AddtaskComponent } from './components/addtask/addtask.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  // { path: 'login', component: LoginComponent },
  {path: 'home', component: HomeComponent},
  {path: 'tasklist', component: TasklistComponent},
  {path: 'addtask', component: AddtaskComponent},
  { path: '', redirectTo: '/tasklist', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
