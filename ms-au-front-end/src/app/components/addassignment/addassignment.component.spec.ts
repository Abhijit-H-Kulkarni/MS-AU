import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddassignmentComponent } from './addassignment.component';
import { ViewService } from 'src/app/view.service';
import { CourseService } from 'src/app/course.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AddassignmentComponent', () => {
  let component: AddassignmentComponent;
  let fixture: ComponentFixture<AddassignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddassignmentComponent ],
      providers : [ViewService, CourseService, HttpClient, HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
