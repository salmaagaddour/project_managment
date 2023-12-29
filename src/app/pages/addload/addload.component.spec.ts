import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddloadComponent } from './addload.component';

describe('AddloadComponent', () => {
  let component: AddloadComponent;
  let fixture: ComponentFixture<AddloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
