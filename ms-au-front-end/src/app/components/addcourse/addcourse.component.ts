import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course.service';
import { TrainerService } from 'src/app/trainer.service';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {

  course = {cid:'',cname:'',cdescription:'',skills:'',prerequisites:'',tid:'',last_updated:'',score:''};
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
  }

  addcourse(event:Event) {
    event.preventDefault();
    this.courseService.addCourse(this.course).subscribe(data => {
      alert("Course Added Successfully.");
      location.reload();
    });
  }

  goBack() {
    location.href="/assessment";
  }
}
