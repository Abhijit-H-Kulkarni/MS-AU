import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course.service';
import { TrainerService } from 'src/app/trainer.service';
import { ViewService } from 'src/app/view.service'
import { course } from './course';
import { SubmissionService } from 'src/app/submission.service';
import { assignment } from '../view/assignment';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})

export class AssessmentComponent implements OnInit {

  uname:string=localStorage.getItem("username");
  courses:any;
  isAdmin:boolean;
  totalWeight;
  scoredWeight;
  trainersmap = new Map();
  coursemap = new Map();
  scoresmap = new Map();
  tempcourses:any;
  searchstring:string;
  cid;
  uid;
  aid;
  constructor(private courseService:CourseService, private trainerService:TrainerService, private viewService: ViewService, private submissionService: SubmissionService) {
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
    this.uid = localStorage.getItem("uid");
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
      this.tempcourses = data;
      let courseArray = data as course[];
      for(let acourse of courseArray) {
        this.trainerService.findTrainer({tid:acourse["tid"],tname:'',designation:'',specialities:'',email:''}).subscribe(trainersdata => { 
          this.trainersmap.set(acourse["tid"],{"tname":trainersdata["tname"],"designation":trainersdata["designation"]});
          this.viewService.getSumOfWeights({aid: "",question: "",asstype: "",cid: acourse.cid,weight: ""}).subscribe(data=> {
            this.totalWeight = data;
            this.viewService.getAssignmentsById({aid: "",question: "",asstype: "",cid: acourse.cid,weight: ""}).subscribe(data => {
              let assignmentArray = data as assignment[];
              this.scoredWeight = 0;
              for(let assignment of assignmentArray) {
                this.aid = assignment.aid;
                this.submissionService.getSubmissionById({uid: this.uid, aid: this.aid}).subscribe(data=>{
                  if(data!=null) {
                    this.scoredWeight = this.scoredWeight + parseInt(data["score"]);
                    this.scoresmap.set(acourse.cid,(this.scoredWeight/this.totalWeight)*100);
                  }
                });
              }      
            });
          });
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

  view(id) {
    localStorage.setItem("cid",id);
    location.href = "/view";
  }
}
