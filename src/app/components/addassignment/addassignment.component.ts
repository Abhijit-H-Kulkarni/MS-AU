import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/view.service';
import { CourseService } from 'src/app/course.service';
import { assignment } from '../view/assignment';

@Component({
  selector: 'app-addassignment',
  templateUrl: './addassignment.component.html',
  styleUrls: ['./addassignment.component.css']
})
export class AddassignmentComponent implements OnInit {

  assignment = {question:null,asstype:'',weight:'',cid:''}
  constructor(private viewService: ViewService, private courseService: CourseService) { }
  courses:any;
  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data=> {
      this.courses = data;
    })
  }

  addassignment(event:Event) {
    event.preventDefault();
    const uploadData = new FormData();
    if(this.assignment.question.type!="image/jpeg")
      alert("Only image uploads are suppourted. Please check your file type.");
    else if(this.assignment.question==null)
      alert("Please choose a file to upload.")
    else {
    uploadData.append('imageFile', this.assignment.question, this.assignment.question.name);
    uploadData.append('assType', this.assignment.asstype);
    uploadData.append('weight', this.assignment.weight);
    uploadData.append('cid', this.assignment.cid);
    this.viewService.addAssignment(uploadData).subscribe(data => {
      alert("Assignment added successfully.");
      location.reload();
    });
    }
  }

  goBack() {
    location.href="/assessment";
  }

  handleFileInput(files: FileList) {
    this.assignment.question = files.item(0);
  }
}
