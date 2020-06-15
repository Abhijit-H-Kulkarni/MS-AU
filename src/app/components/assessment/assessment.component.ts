import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course.service';
import { TrainerService } from 'src/app/trainer.service';
import { ViewService } from 'src/app/view.service'
import { course } from './course';
import { SubmissionService } from 'src/app/submission.service';
import { LocationService } from 'src/app/location.service';
import {forkJoin} from 'rxjs';
import { CoursecountService } from 'src/app/coursecount.service';
import { coursecount } from './coursecount';



@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})

export class AssessmentComponent implements OnInit {

  uname:string=localStorage.getItem("username");
  courses:any;
  course = {cid:'',cname:'',cdescription:'',skills:'',prerequisites:'',location:'',tid:'',last_updated:'',score:''};
  isAdmin:boolean;
  totalWeight;
  scoredWeight=0;
  trainersmap = new Map();
  scoresmap = new Map();
  tempcourses:any;
  searchstring:string;
  isRatingTrend = false;
  cid;
  uid;
  aid;
  Course:course = new course();
  constructor(private courseService:CourseService, private trainerService:TrainerService, private viewService: ViewService, private submissionService: SubmissionService, private locationService: LocationService, private courseCount: CoursecountService) {
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


  async getSumOfWeights(courseArray) {
    let observables = new Array();
    let observables2 = new Array();
    for(let acourse of courseArray) {
      observables.push(this.viewService.getSumOfWeights({aid: "",question: "",asstype: "",cid: acourse.cid,weight: ""}));
      observables2.push(this.submissionService.getSumOfWeights({aid:"",uid:this.uid,cid:acourse.cid}));
    }
    forkJoin(observables).subscribe(data => {
      this.totalWeight = data;
      forkJoin(observables2).subscribe(data => {
        let i = 0;
        data.forEach((weight) => {
          this.scoresmap.set(courseArray[i]["cid"],(weight["body"]/this.totalWeight[i])*100);
          i++;
        })
      });
    });
   console.log(this.scoresmap);
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
        });
      }
      this.getSumOfWeights(courseArray);
    });
  }

  search() {
    if(this.searchstring!="") {
    const temp = {};
    this.Course.location = this.searchstring;
    this.courseService.checkLocation(this.Course).subscribe(data=>{
      if(data==1) {
        this.locationService.incrementCount(this.Course.location).subscribe(data=>{});
      }
    });
    console.log(this.searchstring);
    this.courseService.getCourseByName(this.searchstring).subscribe(data=> {
      if(data!=null) {
        this.courseCount.increment({id:"",cid:data["cid"],count:""}).subscribe(data=>{});
      }
    });

    const reg = new RegExp(this.searchstring.toLowerCase());
    for (const key in this.courses) {
      if (reg.test(this.courses[key].cname.toLowerCase()) || reg.test(this.courses[key].location.toLowerCase())) {
        temp[key] = this.courses[key];
      }
    }
    this.tempcourses = temp;
  }
  else
    this.ngOnInit();
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

  addTrainer() {
    location.href="/addtrainer";
  }

  addCourse() {
    location.href="/addcourse";
  }

  addAssignment() {
    location.href="/addassignment";
  }

  view(id) {
    localStorage.setItem("cid",id);
    location.href = "/view";
  }

  ratingTrend() {
    if(this.isRatingTrend == false) {
      this.isRatingTrend = true;
    }
    else {
      this.isRatingTrend = false;
      this.ngOnInit();
    }
    this.courseService.ratingTrend().subscribe(data => {
      this.courses = data;
      this.tempcourses = data;
    });
}

  scoreTrend() {
    const mapSort1 = new Map([...this.scoresmap.entries()].sort((a, b) => b[1] - a[1]));
    this.tempcourses = [];
    mapSort1.forEach((value:any,key:any) => {
     for(let item of this.courses) {
        if(item["cid"]==key) {
          this.tempcourses.push(item);
        }
    }});
  }

  locationTrend() {
    this.locationService.getLocations().subscribe(data=> {
      let locationArray = data as string[];
      this.tempcourses = [];
      for(let location of locationArray) {
          this.courseService.getCoursesByLocation(location).subscribe(data=>{
            let courseArray = data as course[];
            for(let course of courseArray) {
              this.tempcourses.push(course);
            }
          });
      }
    });
  }

  courseTrend() {
    this.courseCount.getAllCourses().subscribe(data => {
      this.tempcourses = [];
      let courseCountArray = data as coursecount[];
      for(let i=0;i<courseCountArray.length;i++) {
        this.Course.cid = courseCountArray[i].cid;
        this.courseService.getCourseById(this.Course).subscribe(data=> {
          let courseEle = data as course;
          this.tempcourses.push(courseEle);
        })
      }
      console.log(this.tempcourses);
    })
  }
}
