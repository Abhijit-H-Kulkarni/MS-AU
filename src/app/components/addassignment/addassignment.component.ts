import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/view.service';
import { CourseService } from 'src/app/course.service';
import { assignment } from '../view/assignment';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-addassignment',
  templateUrl: './addassignment.component.html',
  styleUrls: ['./addassignment.component.css']
})
export class AddassignmentComponent implements OnInit {

  assignment = {question:null,asstype:'',weight:'',cid:''}
  constructor(private logger: NGXLogger,private viewService: ViewService, private courseService: CourseService) { }
  courses:any;
  tempcourses:any;
  searchstring:string="";

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data=> {
      this.courses = data;
      this.tempcourses = data;
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
      this.logger.info("Add Assignment Event.");
      alert("Assignment added successfully.");
      location.reload();
    },err=> {
      this.logger.error("Error : "+err);
    });
    }
  }

  assignCourse(event:Event,cname,cid) {
    this.assignment.cid = cid;
    alert("Assignment assigned to course "+cname);
  }

  search() {
    if(this.searchstring!="") {
      const temp = {};
      const reg = new RegExp(this.searchstring.toLowerCase());
      for (const key in this.courses) {
        if(reg.test(this.courses[key].cname.toLowerCase())) {
          temp[key] = this.courses[key];
        }
      }
      this.tempcourses = temp;
    }
    else
      this.ngOnInit();
  }

  goBack() {
    location.href="/assessment";
  }

  handleFileInput(files: FileList) {
    this.logger.info("Handle file input Event.");
    this.assignment.question = files.item(0);
  }
}
