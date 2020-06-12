import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/view.service';
import { SubmissionService } from 'src/app/submission.service';
import { assignment } from './assignment';
import { RatingService } from 'src/app/rating.service';
import { CourseService } from 'src/app/course.service';
import * as fileSaver from 'file-saver';

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
  retrievedImage: any;
  base64Data: any;
  retrieveResponse: any;
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
        }, (error) => {
          console.log(error);
          });
      }
    });

    this.viewService.getAssignmentsById({aid:"",question:null,asstype:"",cid:this.cid,weight:""}).subscribe( data => {
      this.assignments = data;
    }, (error) => {
      console.log(error);
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
    this.viewService.getById({aid:assid,question:null,asstype:"",cid:this.cid,weight:""}).subscribe(data=>{
      uploadData.append('score', data["weight"]);
      this.submissionService.upload(uploadData).subscribe(response => {
        if(response["status"] === 200)
          alert("Successfully uploaded.")
        location.reload();
      }, (error) => {
          alert("Could not upload the file. Please check file type and file size and try again.");
        });
    });
  }

  dropAssignment(assid) {
    this.submissionId = {aid:assid, uid: this.uid, cid: this.cid};
    this.submissionService.dropSubmission(this.submissionId).subscribe(data => {
      alert("Successfully withdrawn.")
      location.reload();
    }, (error) => {
      alert("Could not withdraw. Please submit your response.");
    });
  }

  downloadAssignment(assid) {
    const downloadData = new FormData();
    downloadData.append('uid', this.uid);
    downloadData.append('cid', this.cid);
    downloadData.append('assid', assid);
    this.submissionService.download(downloadData).subscribe(response => {
          this.retrieveResponse = response;
          this.base64Data = this.retrieveResponse.body.solution;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          alert("Scroll down to view the assignment.");
    }, (err) => {
      alert("You haven't submitted the assignment yet. Please submit the assignment first.");
    });
  }

  downloadQuestion(assid) {
    this.viewService.getById({aid:assid,question:null,asstype:"",cid:this.cid,weight:""}).subscribe(data => {
      console.log(data["question"]);
      let blob:any = new Blob([data["question"]]);
      const url= window.URL.createObjectURL(blob);
      window.open(url);
      fileSaver.saveAs(blob, 'question '+assid+' .txt');
      window.close();
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
      }, (error) => {
        console.log(error);
        });
    }, (error) => {
      console.log(error);
      });
  }
}
