import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../tables/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addtaskreel',
  templateUrl: './addtaskreel.component.html',
  styleUrls: ['./addtaskreel.component.scss']
})
export class AddtaskreelComponent implements OnInit {

  project: any;
  projectForm: FormGroup;
  projectId: number;
  showSuccessAlert = false;
  showErrorAlert = false;
  constructor(private formBuilder: FormBuilder,private projectService: ProjectService,private route: ActivatedRoute, private router: Router) {
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = +params.get('id'); // Récupérer l'ID du projet depuis les paramètres d'URL
      //console.log('Project ID:', this.projectId);
      this.projectForm = this.formBuilder.group({
        name: ['', Validators.required],
        project_id: [this.projectId, Validators.required], // Utiliser l'ID du projet ic
        start_date: [ Validators.required],
        end_date: [null],
        duree: [''],
        status: ['New']
      });
    });
  }
  addTaskreel( projectId: number): void {
    const formData = this.projectForm.value;
    const taskName = formData.name;
    const now = new Date();
    const formattedNow = this.formatDate(now);
    formData.updated_at = formattedNow;
    formData.created_at = formattedNow;

    // Formater les dates d'expectedStartDate et expectedEndDate
    formData.start_date = this.formatDate(formData.start_date);
    formData.end_date = this.formatDate(formData.end_date);
    this.projectService.getTaskIdByNameAndProject(projectId, taskName).subscribe(
      (taskId) => {
        formData.task_id = taskId; // Remplissez le champ task_id avec l'ID récupéré
  
        // Appelez le service pour ajouter la tâche de type "taskreel"
        this.projectService.addTaskreel(formData, projectId,taskName).subscribe(
          (response) => {
            this.router.navigate(['/project', this.projectId]);
            // Tâche ajoutée avec succès
           // this.toastr.success('Taskreel added successfully', 'Success');
            // Actualisez les données ou redirigez selon votre besoin
          },
          (error) => {
            console.error('Error adding taskreel:', error);
            //this.toastr.error('Error adding taskreel', 'Error');
          }
        );
      },
      (error) => {
        console.error('Error fetching task ID:', error);
      }
    );
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
