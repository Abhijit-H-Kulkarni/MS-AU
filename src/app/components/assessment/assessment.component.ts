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
import { assignment } from '../view/assignment';
import { IfStmt } from '@angular/compiler';
import { NGXLogger } from 'ngx-logger';



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
  isTrainer:boolean;
  totalWeight;
  scoredWeight=0;
  trainersmap = new Map();
  scoresmap = new Map();
  tempcourses:any;
  searchstring:string;
  isRatingTrend = false;
  progress = new Map();
  cid;
  uid;
  aid;
  Course:course = new course();
  constructor(private logger: NGXLogger,private courseService:CourseService, private trainerService:TrainerService, private viewService: ViewService, private submissionService: SubmissionService, private locationService: LocationService, private courseCount: CoursecountService) {
    if(localStorage.getItem('welcome')=='true' && localStorage.getItem("loginStatus")=='true') {
    alert("Welcome "+ this.uname);
    localStorage.setItem('welcome','false');  
    }
    if(localStorage.getItem("loginStatus")!='true')
      location.href="/login";

    if(localStorage.getItem("isadmin")=='true')
      this.isAdmin = true;
    else
      this.isAdmin = false;
    if(localStorage.getItem("isTrainer")=="true")
      this.isTrainer = true;
    else
      this.isTrainer = false;
   }


  async getSumOfWeights(courseArray) {
    let observables = new Array();
    let observables2 = new Array();
    for(let acourse of courseArray) {
      observables.push(this.viewService.getSumOfWeights({aid: "",question: "",asstype: "",cid: acourse.cid,weight: ""}));
      observables2.push(this.submissionService.getSumOfWeights({aid:"",uid:this.uid,cid:acourse.cid}));
    }
    forkJoin(observables).subscribe(data => {
      this.logger.info("Get Total Sum Of Weights Event.");
      this.totalWeight = data;
      forkJoin(observables2).subscribe(data => {
        this.logger.info("Get Submission Sum Of Weights Event.");
        let i = 0;
        data.forEach((weight) => {
          this.scoresmap.set(courseArray[i]["cid"],(weight["body"]/this.totalWeight[i])*100);
          i++;
        })
      },err=>{
        this.logger.error("Error : "+err);
      });
    },err=>{
      this.logger.error("Error : "+err);
    });
  }

  ngOnInit(): void {
    this.uid = localStorage.getItem("uid");
    this.courseService.getCourses().subscribe(data => {
      if(this.isTrainer==false) {
      this.courses = data;
      this.tempcourses = data;
      let courseArray = data as course[];
      for(let acourse of courseArray) {
        this.trainerService.findTrainer({tid:acourse["tid"],tname:'',designation:'',specialities:'',email:''}).subscribe(trainersdata => { 
          this.logger.info("Find Trainer Event.");
          this.trainersmap.set(acourse["tid"],{"tname":trainersdata["tname"],"designation":trainersdata["designation"]});
        },err=>{
          this.logger.error("Error : "+err);
        });
        let observables = new Array();
        this.viewService.getAssignmentsById({aid:"",question:null,asstype:"",cid:acourse["cid"],weight:""}).subscribe(data => {
          let assignmentArray = data as assignment[];
          if(assignmentArray.length==0)
            this.progress.set(acourse["cid"],null);
          else {
          for(let ass of assignmentArray) {
              observables.push(this.submissionService.getSubmissionById({aid:ass["aid"],uid:this.uid,cid:acourse["cid"]}));
            } 
          
          forkJoin(observables).subscribe(data => {
            this.logger.info("Get Submission By Id Event.");
            let submitted = 0;
            let total = 0;
            data.forEach((element)=>{
              if(element!=null)
                submitted++;
              total++;
            });
            if(total != 0) {
            this.progress.set(acourse["cid"],Math.ceil((submitted/total)*100));
            }
          })
        }
        },err=>{
          this.logger.error("Error : "+err);
        });
      }
      this.getSumOfWeights(courseArray);
    }
    else {
      let courseArray = data as course[];
      for(let acourse of courseArray) {
        this.trainerService.findTrainer({tid:acourse["tid"],tname:'',designation:'',specialities:'',email:''}).subscribe(trainersdata => { 
          this.logger.info("Find Trainer Event.");
          if(localStorage.getItem("email")==trainersdata["email"]) {
            this.trainersmap.set(acourse["tid"],{"tname":trainersdata["tname"],"designation":trainersdata["designation"]});
            this.tempcourses.push(acourse);
            this.courses.push(acourse);
          }
        },err=>{
          this.logger.error("Error : "+err);
        });
      }
    } 
  },err=>{
      this.logger.error("Error : "+err);
    });
  }

  search() {
    if(this.searchstring!="") {
    const temp = {};
    this.Course.location = this.searchstring;
    this.courseService.checkLocation(this.Course).subscribe(data=>{
      this.logger.info("Check Location Event.");
      if(data==1) {
        this.locationService.incrementCount(this.Course.location).subscribe(data=>{});
      }
    },err=>{
      this.logger.error("Error : "+err);
    });
    this.courseService.getCourseByName(this.searchstring).subscribe(data=> {
      this.logger.info("Get Course By Name Event.");
      if(data!=null) {
        this.courseCount.increment({id:"",cid:data["cid"],count:""}).subscribe(data=>{});
      }
    },err=>{
      this.logger.error("Error : "+err);
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
      this.logger.info("Course Delete Event.");
      alert("Course deleted successfully.");
      location.reload();
    },err=>{
      this.logger.error("Error : "+err);
    });
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
      this.logger.info("Rating trend Event.");
      this.courses = data;
      this.tempcourses = data;
    },err=>{
      this.logger.error("Error : "+err);
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
      this.logger.info("Get Locations event.");
      let locationArray = data as string[];
      this.tempcourses = [];
      let observables = new Array(); 
      for(let i=0;i<locationArray.length;i++) {
        observables.push(this.courseService.getCoursesByLocation(locationArray[i]));
      }
      forkJoin(observables).subscribe(data => {
        this.logger.info("Get Course By Location Event.");
        for(let courseArrayData of data) {
        let courseArray = courseArrayData as course[];
        for(let course of courseArray) {
          this.tempcourses.push(course);
        }
      }
      },err=>{
        this.logger.error("Error : "+err);
      });
    },err=>{
      this.logger.error("Error : "+err);
    });
  }

  courseTrend() {
    this.courseCount.getAllCourses().subscribe(data => {
      this.logger.info("Get All Courses Event.");
      this.tempcourses = [];
      let courseCountArray = data as coursecount[];
      let observables = new Array();
      for(let i=0;i<courseCountArray.length;i++) {
        observables.push(this.courseService.getCourseById({cid:courseCountArray[i].cid,cname:"",cdescription:"",skills:"",prerequisites:"",tid:"",last_updated:"",feedback:"",location:""}));
      }
      forkJoin(observables).subscribe(data => {
        this.tempcourses = data;
      },err=>{
        this.logger.error("Error : "+err);
      });
    })
  }
}
