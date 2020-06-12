import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course.service';
import { TrainerService } from 'src/app/trainer.service';

@Component({
  selector: 'app-courseupdate',
  templateUrl: './courseupdate.component.html',
  styleUrls: ['./courseupdate.component.css']
})
export class CourseupdateComponent implements OnInit {

  course = {cid:'',cname:'',cdescription:'',skills:'',prerequisites:'',location:'',tid:'',last_updated:'',score:''};
  trainers:any;
  
  constructor(private courseService: CourseService, private trainerService: TrainerService) { }

  ngOnInit(): void {
    if(localStorage.getItem("loginStatus")!='true')
      location.href="/login";

    if(localStorage.getItem("isadmin")!='true')
      location.href="/assessment";
     
    this.trainerService.getTrainers().subscribe(data => {
      this.trainers = data;
    });
    if(localStorage.getItem("updatecid")!=null) {
      this.course.cid = localStorage.getItem("updatecid");
    }
    this.courseService.getCourseById(this.course).subscribe(data => {
      console.log(this.course);
      this.course.cname = data["cname"];
      this.course.cdescription = data["cdescription"];
      this.course.skills = data["skills"];
      this.course.prerequisites = data["prerequisites"];
      this.course.location = data["location"];
      this.course.tid = data["tid"];
    });
  }
  updatecourse(event:Event) {
    event.preventDefault();
    this.courseService.updateCourse(this.course).subscribe(data => {
      alert("Course Updated Successfully.");
      location.reload();
    });
  }

  goBack() {
    location.href="/assessment";
  }

}
