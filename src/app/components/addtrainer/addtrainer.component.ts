import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/trainer.service';

@Component({
  selector: 'app-addtrainer',
  templateUrl: './addtrainer.component.html',
  styleUrls: ['./addtrainer.component.css']
})
export class AddtrainerComponent implements OnInit {
  trainer = {tname:"",designation:"",specialities:"",email:""}
  constructor(private trainerService: TrainerService) { }

  ngOnInit(): void {
  }

  addTrainer(event:Event) {
    event.preventDefault();
    this.trainerService.addTrainer(this.trainer).subscribe(data => {
      alert("Successfully added.")
      location.reload();
    });
  }

  goBack() {
    location.href = "/assessment";
  }
}
