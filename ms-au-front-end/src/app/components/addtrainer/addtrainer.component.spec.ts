import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtrainerComponent } from './addtrainer.component';

describe('AddtrainerComponent', () => {
  let component: AddtrainerComponent;
  let fixture: ComponentFixture<AddtrainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtrainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
