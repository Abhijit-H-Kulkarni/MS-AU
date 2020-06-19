import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course.service';
import { TrainerService } from 'src/app/trainer.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-courseupdate',
  templateUrl: './courseupdate.component.html',
  styleUrls: ['./courseupdate.component.css']
})
export class CourseupdateComponent implements OnInit {

  course = {cid:'',cname:'',cdescription:'',skills:'',prerequisites:'',location:'',tid:'',last_updated:'',score:''};
  email:string;
  trainers:any;
  
  constructor(private logger: NGXLogger,private courseService: CourseService, private trainerService: TrainerService) { }

  ngOnInit(): void {
    if(localStorage.getItem("loginStatus")!='true')
      location.href="/";

    if(localStorage.getItem("isadmin")!='true')
      location.href="/";
     
    this.trainerService.getTrainers().subscribe(data => {
      this.trainers = data;
    });
    if(localStorage.getItem("updatecid")!=null) {
      this.course.cid = localStorage.getItem("updatecid");
    }
    this.courseService.getCourseById(this.course).subscribe(data => {
      this.logger.info("Get Course By Id.");
      this.course.cname = data["cname"];
      this.course.cdescription = data["cdescription"];
      this.course.skills = data["skills"];
      this.course.prerequisites = data["prerequisites"];
      this.course.location = data["location"];
      this.course.tid = data["tid"];
    },err=>{
      this.logger.error("Error : "+err);
    });
  }

  updatecourse(event:Event) {
    event.preventDefault();
    this.courseService.updateCourse(this.course).subscribe(data => {
      this.logger.info("Update Course Event.");
      alert("Course Updated Successfully.");
      location.reload();
    },err=>{
      this.logger.error("Error : "+err);
    });
  }

  assignFaculty(event:Event,email,id,name) {
    event.preventDefault();
    this.email = email;
    this.course.tid = id;
    alert("Course successfully assigned to "+name);
  }

  goBack() {
    location.href="/assessment";
  }

}
