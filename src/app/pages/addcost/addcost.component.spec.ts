import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcostComponent } from './addcost.component';

describe('AddcostComponent', () => {
  let component: AddcostComponent;
  let fixture: ComponentFixture<AddcostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
