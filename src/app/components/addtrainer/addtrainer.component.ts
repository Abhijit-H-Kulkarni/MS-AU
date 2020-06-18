import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/trainer.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-addtrainer',
  templateUrl: './addtrainer.component.html',
  styleUrls: ['./addtrainer.component.css']
})
export class AddtrainerComponent implements OnInit {
  trainer = {tname:"",designation:"",specialities:"",email:""}
  constructor(private logger: NGXLogger,private trainerService: TrainerService) { }

  ngOnInit(): void {
  }

  addTrainer(event:Event) {
    event.preventDefault();
    this.trainerService.addTrainer(this.trainer).subscribe(data => {
      this.logger.info("Add trainer Event.");
      alert("Successfully added.")
      location.reload();
    },err=>{
      this.logger.error("Error : "+err)
    });
  }

  goBack() {
    location.href = "/assessment";
  }
}
