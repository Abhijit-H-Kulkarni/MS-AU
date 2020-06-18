import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course.service';
import { TrainerService } from 'src/app/trainer.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {

  course = {cid:'',cname:'',cdescription:'',skills:'',prerequisites:'',location:'',tid:'',last_updated:'',rating:''};
  trainers:any;

  constructor(private logger: NGXLogger,private courseService: CourseService, private trainerService: TrainerService) { }

  ngOnInit(): void {
    if(localStorage.getItem("loginStatus")!='true')
      location.href="/login";

    if(localStorage.getItem("isadmin")!='true')
      location.href="/assessment";
      
    this.trainerService.getTrainers().subscribe(data => {
      this.trainers = data;
    });
  }

  addcourse(event:Event) {
    event.preventDefault();
    this.courseService.addCourse(this.course).subscribe(data => {
      this.logger.info("Add Course Event.");
      alert("Course Added Successfully.");
      location.reload();
    },err=>{
      this.logger.error("Error : "+err);
    });
  }

  goBack() {
    location.href="/assessment";
  }
}
