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
  {path:'login', loadChildren: () => import('./components/login/login.component').then(m => m.LoginComponent)},
  {path:'assessment', loadChildren: () => import('./components/assessment/assessment.component').then(m => m.AssessmentComponent)},
  {path:'signup', loadChildren: () => import('./components/signup/signup.component').then(m => m.SignupComponent)},
  {path:'password', loadChildren: () => import('./components/new-password/new-password.component').then(m => m.NewPasswordComponent)},
  {path:'addcourse', loadChildren: () => import('./components/addcourse/addcourse.component').then(m => m.AddcourseComponent)},
  {path:'updatecourse', loadChildren: () => import('./components/courseupdate/courseupdate.component').then(m => m.CourseupdateComponent)},
  {path:'view', loadChildren: () => import('./components/view/view.component').then(m => m.ViewComponent)},
  {path:'addassignment', loadChildren: () => import('./components/addassignment/addassignment.component').then(m => m.AddassignmentComponent)},
  {path:'addtrainer', loadChildren: () => import('./components/addtrainer/addtrainer.component').then(m => m.AddtrainerComponent)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
