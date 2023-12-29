import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../tables/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  projectForm: FormGroup;
  showSuccessAlert = false;
  showErrorAlert = false;
  constructor(private formBuilder: FormBuilder,private projectService: ProjectService,private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      client: [''],
      project_manager: ['', ],
      budget: ['', ],
      expected_start_date: [null, Validators.required],
      expected_end_date: [null], 
      status: ['New']
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const formData = this.projectForm.value;
  
      const now = new Date();
      const formattedNow = this.formatDate(now);
      formData.updated_at = formattedNow;
      formData.created_at = formattedNow;
  
      // Formater les dates d'expectedStartDate et expectedEndDate
      formData.expected_start_date = this.formatDate(formData.expected_start_date);
      formData.expected_end_date = this.formatDate(formData.expected_end_date);
  
      this.projectService.addProject(formData).subscribe(
        (response) => {
          console.log('Project created successfully:', response);
          this.showSuccess();
          this.router.navigate(['/tables']);
        },
        (error) => {
          console.error('Error creating project:', error);
          this.showError() 
           
          
        }
      );
    }
  }
  

  // Méthode pour afficher l'alerte d'erreur
  showError() {
    this.showErrorAlert = true;
  }

  // Méthode pour fermer l'alerte d'erreur
  dismissErrorAlert() {
    this.showErrorAlert = false;
  }
  showSuccess() {
    this.showSuccessAlert = true;
  }

  // Méthode pour fermer l'alerte de succès
  dismissSuccessAlert() {
    this.showSuccessAlert = false;
  }
  formatDate(date: Date): string {
    if (!date) {
      return ''; // Return an empty string or another default value if date is null or undefined
    }
  
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  
  
}