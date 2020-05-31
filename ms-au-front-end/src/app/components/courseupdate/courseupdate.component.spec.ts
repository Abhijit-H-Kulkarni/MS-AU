import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseupdateComponent } from './courseupdate.component';

describe('CourseupdateComponent', () => {
  let component: CourseupdateComponent;
  let fixture: ComponentFixture<CourseupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseupdateComponent ]
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
