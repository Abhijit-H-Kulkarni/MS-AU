import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/view.service';
import { SubmissionService } from 'src/app/submission.service';
import { assignment } from './assignment';
import { RatingService } from 'src/app/rating.service';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  cid;
  uid;
  ratedList;
  assignments;
  rating;
  avgRating;
  submissionId;
  statusmap = new Map();
  fileToUpload: File = null;
  isAdmin:boolean;
  constructor(private viewService: ViewService, private submissionService: SubmissionService, private ratingService: RatingService, private courseService: CourseService) { 
    this.cid = localStorage.getItem("cid");
    this.uid = localStorage.getItem("uid");
    this.ratingService.getAllRating({id:{uid:this.uid,cid:this.cid},rating:""}).subscribe(data=>{
      this.ratedList = data;
    });
    viewService.getAssignments().subscribe(data => {
      let assignmentArray = data as assignment[];
      for(let ass of assignmentArray) {
        submissionService.getSubmissionById({aid:ass["aid"],uid:this.uid,cid:this.cid}).subscribe(data=> { 
          if(data!=null)
            this.statusmap.set(data["id"]["aid"],true);
          else
            this.statusmap.set(ass["aid"],false);
        });
      }
    });

    this.viewService.getAssignmentsById({aid:"",question:"",asstype:"",cid:this.cid,weight:""}).subscribe( data => {
      this.assignments = data;
    });

    if(localStorage.getItem("isadmin")=="true")
      this.isAdmin = true;
    else
      this.isAdmin = false;
  }

  ngOnInit(): void { }

  goBack() {
    location.href="/assessment"
  }
  
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  
  uploadAssignment(assid) {
    const uploadData = new FormData();
    uploadData.append('imageFile', this.fileToUpload, this.fileToUpload.name);
    uploadData.append('uid', this.uid);
    uploadData.append('cid', this.cid);
    uploadData.append('assid', assid);
    console.log(assid+" "+this.cid);
    this.viewService.getById({aid:assid,question:"",asstype:"",cid:this.cid,weight:""}).subscribe(data=>{
      uploadData.append('score', data["weight"]);
      this.submissionService.upload(uploadData).subscribe(response => {
        if(response["status"] === 200)
          alert("Successfully uploaded.")
        location.reload();
      });
    })
  }

  addAssignment() {
    location.href = "/addassignment";
  }

  dropAssignment(assid) {
    this.submissionId = {aid:assid, uid: this.uid, cid: this.cid};
    this.submissionService.dropSubmission(this.submissionId).subscribe(data => {
      alert("Successfully withdrawn.")
      location.reload();
    });
  }

  setRating(value) {
    this.rating = value;
  }
  addRating() {
    this.ratingService.addRating({id:{uid:this.uid,cid:this.cid},rating:this.rating}).subscribe(data => {
      this.avgRating = data;
      this.courseService.updateRating({cid:this.cid,cname:"",cdescription:"",skills:"",prerequisites:"",location:"",tid:"",last_updated:"", rating:this.avgRating}).subscribe(data=>{
        location.reload();
      });
    })
  }
}
