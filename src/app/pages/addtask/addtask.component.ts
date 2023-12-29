import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../tables/project.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddtaskComponent implements OnInit {
  project: any;
  projectForm: FormGroup;
  showSuccessAlert = false;
  showErrorAlert = false;
  projectId: number;
  constructor(private formBuilder: FormBuilder,private projectService: ProjectService,private route: ActivatedRoute, private router: Router) {
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = +params.get('id'); // Récupérer l'ID du projet depuis les paramètres d'URL
      console.log('Project ID:', this.projectId);
      this.projectForm = this.formBuilder.group({
        name: ['', Validators.required],
        collaborateur: [''],
        project_id: [this.projectId, Validators.required], // Utiliser l'ID du projet ici
        description: [''],
        expected_start_date: [null, Validators.required],
        expected_end_date: [null],
        duree: [''],
        status: ['New']
      });
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const formData = this.projectForm.value;
      console.log('Data to be sent:', formData);
      const now = new Date();
      const formattedNow = this.formatDate(now);
      formData.updated_at = formattedNow;
      formData.created_at = formattedNow;

      // Formater les dates d'expectedStartDate et expectedEndDate
      formData.expected_start_date = this.formatDate(formData.expected_start_date);
      formData.expected_end_date = this.formatDate(formData.expected_end_date);

      // Appeler la méthode addTask avec les données de la tâche et l'ID du projet
      this.projectService.addTask(formData).subscribe(
        (response) => {
          console.log('task created successfully:', response);
         // this.toastr.success('Task added successfully', 'Success');
          this.router.navigate(['/project', this.projectId]);
        },
        (error) => {
          console.error('Error creating task:', error);
        }
      );
    }
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
}