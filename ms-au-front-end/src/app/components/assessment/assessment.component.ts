import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course.service';
import { TrainerService } from 'src/app/trainer.service';
import { course } from './course';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})

export class AssessmentComponent implements OnInit {

  uname:string=localStorage.getItem("username");
  courses:any;
  isAdmin:boolean;
  trainersmap = new Map();
  tempcourses:any;
  searchstring:string;
  constructor(private courseService:CourseService, private trainerService:TrainerService) {
    if(localStorage.getItem('welcome')=='true' && localStorage.getItem("loginStatus")=='true') {
    alert("Welcome "+ this.uname);
    localStorage.setItem('welcome','false');  
    }

    if(localStorage.getItem("loginStatus")!='true')
      location.href="/login";

    if(localStorage.getItem("isadmin")=="true")
      this.isAdmin = true;
    else
      this.isAdmin = false;
   }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
      this.tempcourses = data;
      let courseArray = data as course[];
      for(let acourse of courseArray) {
        this.trainerService.findTrainer({tid:acourse["tid"],tname:'',designation:'',specialities:'',email:''}).subscribe(trainersdata => { 
          this.trainersmap.set(acourse["tid"],{"tname":trainersdata["tname"],"designation":trainersdata["designation"]});
        });
      }
    });
  }

  search() {
    if(this.searchstring!="") {
    const temp = {};
    const reg = new RegExp(this.searchstring.toLowerCase());
    for (const key in this.courses) {
      if (reg.test(this.courses[key].cname.toLowerCase())) {
        temp[key] = this.courses[key];
      }
    }
    this.tempcourses = temp;
  }
  else
    this.ngOnInit();
}

  addCourse() {
    location.href="/addcourse";
  }

  updateCourse(id) {
    localStorage.setItem("updatecid",id);
    location.href="updatecourse";
  }

  deleteCourse(id) {
    let courseObj = {cid:id,cname:"",cdescription:"",skills:"",prerequisites:"",tid:"",last_updated:"",score:""}
    this.courseService.deleteCourse(courseObj).subscribe(data => {
      alert("Course deleted successfully.");
      location.reload();
    });
  }
}
