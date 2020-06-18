import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/view.service';
import { SubmissionService } from 'src/app/submission.service';
import { assignment } from './assignment';
import { RatingService } from 'src/app/rating.service';
import { CourseService } from 'src/app/course.service';
import * as fileSaver from 'file-saver';
import { NGXLogger } from 'ngx-logger';

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
  constructor(private logger: NGXLogger,private viewService: ViewService, private submissionService: SubmissionService, private ratingService: RatingService, private courseService: CourseService) { 
    this.cid = localStorage.getItem("cid");
    this.uid = localStorage.getItem("uid");
    this.ratingService.getAllRating({id:{uid:this.uid,cid:this.cid},rating:""}).subscribe(data=>{
      this.ratedList = data;
    });
    viewService.getAssignments().subscribe(data => {
      logger.info("Get All Assignments Event.");
      let assignmentArray = data as assignment[];
      for(let ass of assignmentArray) {
        submissionService.getSubmissionById({aid:ass["aid"],uid:this.uid,cid:this.cid}).subscribe(data=> { 
          logger.info("Get Submission By ID Event.");
          if(data!=null)
            this.statusmap.set(data["id"]["aid"],true);
          else
            this.statusmap.set(ass["aid"],false);
        },err=> {
          this.logger.error("Error : "+err);
        });
      }
    },err=> {
      this.logger.error("Error : "+err);
    });

    this.viewService.getAssignmentsById({aid:"",question:null,asstype:"",cid:this.cid,weight:""}).subscribe( data => {
      logger.info("Get Assignments By Id Event.")
      this.assignments = data;
    },err=> {
      this.logger.error("Error : "+err);
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
    this.logger.info("Handle File input Event.");
    this.fileToUpload = files.item(0);
  }
  
  uploadAssignment(assid) {
    if(this.fileToUpload.type!="image/jpeg")
      alert("Only image uploads are suppourted. Please check your file type.");
    else if(this.fileToUpload == null) 
      alert("Please chose a file to upload.");
    else {
    const uploadData = new FormData();
    uploadData.append('imageFile', this.fileToUpload, this.fileToUpload.name);
    uploadData.append('uid', this.uid);
    uploadData.append('cid', this.cid);
    uploadData.append('assid', assid);
    this.viewService.getById({aid:assid,question:null,asstype:"",cid:this.cid,weight:""}).subscribe(data=>{
      this.logger.info("Get course By Id Event.")
      uploadData.append('score', data["weight"]);
      this.submissionService.upload(uploadData).subscribe(response => {
        this.logger.info("Upload Event.")
        if(response["status"] === 200)
          alert("Successfully uploaded.")
        location.reload();
      }, (error) => {
          this.logger.error("Error : "+error);
          alert("Could not upload the file. Please check file type and file size and try again.");
        });
    },err=> {
      this.logger.error("Error : "+err);
    });
  }
  }

  dropAssignment(assid) {
    this.submissionId = {aid:assid, uid: this.uid, cid: this.cid};
    this.submissionService.dropSubmission(this.submissionId).subscribe(data => {
      this.logger.info("Withdraw Event.")
      alert("Successfully withdrawn.")
      location.reload();
    }, (error) => {
      this.logger.error("Error : "+error);
      alert("Could not withdraw. Please submit your response.");
    });
  }

  downloadAssignment(assid) {
    const downloadData = new FormData();
    downloadData.append('uid', this.uid);
    downloadData.append('cid', this.cid);
    downloadData.append('assid', assid);
    this.submissionService.download(downloadData).subscribe(response => {
          this.logger.info("View Assignment Event.");
          this.retrieveResponse = response;
          this.base64Data = this.retrieveResponse.body.solution;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          alert("Scroll down to view the assignment.");
    }, (err) => {
      this.logger.error("Error : "+err);
      alert("You haven't submitted the assignment yet. Please submit the assignment first.");
    });
  }

  dataURItoBlob(dataURI) {
    var byteString = atob(dataURI);
    var mimeString = "image/jpeg;base64";
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  }

  downloadQuestion(event:Event,assid) {
    event.preventDefault();
    this.viewService.getById({aid:assid,question:null,asstype:"",cid:this.cid,weight:""}).subscribe(data => {
      this.logger.info("Get Submission By Id Event.");
      let blob:any = new Blob([this.dataURItoBlob(data["question"])]);
      fileSaver.saveAs(blob,"Question.jpg");
	    location.href = "/view";
    },err=> {
      this.logger.error("Error : "+err);
    });
  }

  setRating(value) {
    this.rating = value;
  }
  
  addRating() {
    this.ratingService.addRating({id:{uid:this.uid,cid:this.cid},rating:this.rating}).subscribe(data => {
      this.logger.info("Add Rating Event.");
      this.avgRating = data;
      this.courseService.updateRating({cid:this.cid,cname:"",cdescription:"",skills:"",prerequisites:"",location:"",tid:"",last_updated:"", rating:this.avgRating}).subscribe(data=>{
        this.logger.info("Update Rating Event.");
        location.reload();
      }, (error) => {
        this.logger.error("Error : "+error);
        });
    }, (error) => {
      this.logger.error("Error : "+error);
      });
  }
}
