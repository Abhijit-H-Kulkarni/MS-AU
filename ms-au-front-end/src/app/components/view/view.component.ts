import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/view.service';
import { SubmissionService } from 'src/app/submission.service';
import { assignment } from './assignment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  cid;
  uid;
  assignments;
  submissionId;
  statusmap = new Map();
  fileToUpload: File = null;
  isAdmin:boolean;
  constructor(private viewService: ViewService, private submissionService: SubmissionService) { 
    this.cid = localStorage.getItem("cid");
    this.uid = localStorage.getItem("uid");
    viewService.getAssignments().subscribe(data => {
      let assignmentArray = data as assignment[];
      for(let ass of assignmentArray) {
        submissionService.getSubmissionById({aid:ass["aid"],uid:this.uid}).subscribe(data=> { 
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
    uploadData.append('assid', assid);
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
    this.submissionId = {aid:assid, uid: this.uid};
    this.submissionService.dropSubmission(this.submissionId).subscribe(data => {
      alert("Successfully withdrawn.")
      location.reload();
    });
  }
}
