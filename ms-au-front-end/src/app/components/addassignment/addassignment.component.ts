import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/view.service';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-addassignment',
  templateUrl: './addassignment.component.html',
  styleUrls: ['./addassignment.component.css']
})
export class AddassignmentComponent implements OnInit {

  assignment = {question:'',asstype:'',weight:'',cid:''}
  constructor(private viewService: ViewService, private courseService: CourseService) { }
  courses:any;
  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data=> {
      this.courses = data;
    })
  }

  addassignment(event:Event) {
    event.preventDefault();
    this.viewService.addAssignment(this.assignment).subscribe(data => {
      alert("Course added successfully.")
    });
  }

  goBack() {
    location.href="/assessment";
  }
}
