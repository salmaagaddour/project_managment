import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';
import { MemberService } from '../member/member.service';
@Component({
  selector: 'app-addmember',
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.scss']
})
export class AddmemberComponent implements OnInit {
  projectForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private memberService: MemberService) {}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: [''],
      role: ['', ],
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const formData = this.projectForm.value;
  
  
      // Formater les dates d'expectedStartDate et expectedEndDate
     
  
      this.memberService.addmember(formData).subscribe(
        (response) => {
          console.log('member created successfully:', response);
        },
        (error) => {
          console.error('Error creating member:', error);
        }
      );
    }
  }

  

}
