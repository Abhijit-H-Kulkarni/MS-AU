import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from "angularx-social-login";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AssessmentComponent } from './components/assessment/assessment.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { AddcourseComponent } from './components/addcourse/addcourse.component';
import { CourseupdateComponent } from './components/courseupdate/courseupdate.component';
import { ViewComponent } from './components/view/view.component';
import { AddassignmentComponent } from './components/addassignment/addassignment.component';
import { AddtrainerComponent } from './components/addtrainer/addtrainer.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

const GOOGLE_OATH_CLIENT_ID:string = "1075983856302-bqaqclitjpnbo427r9mhismdd02bf6q2.apps.googleusercontent.com";

let config = new AuthServiceConfig([
  {
    id : GoogleLoginProvider.PROVIDER_ID,
    provider : new GoogleLoginProvider(GOOGLE_OATH_CLIENT_ID)
  }
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AssessmentComponent,
    SignupComponent,
    NewPasswordComponent,
    AddcourseComponent,
    CourseupdateComponent,
    ViewComponent,
    AddassignmentComponent,
    AddtrainerComponent
  ],
  imports: [
    LoggerModule.forRoot({serverLoggingUrl: '/api/logs', level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR}),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule.initialize(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
