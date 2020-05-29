import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AssessmentComponent } from './components/assessment/assessment.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';


const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'assessment', component:AssessmentComponent},
  {path:'signup', component:SignupComponent},
  {path:'password', component:NewPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
