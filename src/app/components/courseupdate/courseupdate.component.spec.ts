import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseupdateComponent } from './courseupdate.component';
import { CourseService } from 'src/app/course.service';
import { TrainerService } from 'src/app/trainer.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('CourseupdateComponent', () => {
  let component: CourseupdateComponent;
  let fixture: ComponentFixture<CourseupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseupdateComponent ],
      providers: [CourseService, TrainerService, HttpClient, HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
