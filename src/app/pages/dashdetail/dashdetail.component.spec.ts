import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashdetailComponent } from './dashdetail.component';

describe('DashdetailComponent', () => {
  let component: DashdetailComponent;
  let fixture: ComponentFixture<DashdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
