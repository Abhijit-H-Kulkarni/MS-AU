import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AssessmentComponent } from './components/assessment/assessment.component';
import { SignupComponent } from './components/signup/signup.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { AddcourseComponent } from './components/addcourse/addcourse.component';
import { CourseupdateComponent } from './components/courseupdate/courseupdate.component';
import { ViewComponent } from './components/view/view.component';
import { AddassignmentComponent } from './components/addassignment/addassignment.component';
import { AddtrainerComponent } from './components/addtrainer/addtrainer.component';


const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'assessment', component:AssessmentComponent},
  {path:'signup', component:SignupComponent},
  {path:'password', component:NewPasswordComponent},
  {path:'addcourse', component:AddcourseComponent},
  {path:'updatecourse', component:CourseupdateComponent},
  {path:'view', component:ViewComponent},
  {path:'addassignment', component:AddassignmentComponent},
  {path:'addtrainer', component:AddtrainerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
