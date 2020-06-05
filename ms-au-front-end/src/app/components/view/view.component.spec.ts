import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComponent } from './view.component';
import { ViewService } from 'src/app/view.service';
import { SubmissionService } from 'src/app/submission.service';
import { RatingService } from 'src/app/rating.service';
import { CourseService } from 'src/app/course.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ ViewComponent ],
      providers: [ViewService, SubmissionService, RatingService, CourseService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
