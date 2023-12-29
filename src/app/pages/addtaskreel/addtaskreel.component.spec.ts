import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtaskreelComponent } from './addtaskreel.component';

describe('AddtaskreelComponent', () => {
  let component: AddtaskreelComponent;
  let fixture: ComponentFixture<AddtaskreelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtaskreelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtaskreelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
