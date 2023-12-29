import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../tables/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addcost',
  templateUrl: './addcost.component.html',
  styleUrls: ['./addcost.component.scss']
})
export class AddcostComponent implements OnInit {

  project: any;
  projectForm: FormGroup;
  projectId: number;
  constructor(private formBuilder: FormBuilder,private projectService: ProjectService,private route: ActivatedRoute, private router: Router) {
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
     
      //console.log('Project ID:', this.projectId);
      this.projectForm = this.formBuilder.group({
        task_name: ['', Validators.required],
        resource_name: ['', Validators.required],
       // project_id: [this.projectId, Validators.required], // Utiliser l'ID du projet ic
        date: [ Validators.required],
       amount: ['']
      });
    });
  }
  onSubmit() {
    // Cette fonction sera appelée lorsque le formulaire est soumis

    // Assurez-vous que le formulaire est valide
    if (this.projectForm.valid) {
      const formData = this.projectForm.value;
     
      const now = new Date();
     
  

      // Formater les dates d'expectedStartDate et expectedEndDate
      formData.date = this.formatDate(formData.date);
   
      // Récupérez les données du formulaire
      

       this.projectService.addcost(formData).subscribe(
        (response) => {
      //   
          console.log('Cost added successfully', response);

      //     // Réinitialisez le formulaire après la soumission si nécessaire
         this.projectForm.reset();
        
      //     // Faites tout autre traitement nécessaire ici
      },
      (error) => {
      //     // Gérez les erreurs en cas d'échec de l'enregistrement
          console.error('Error adding cost', error);
         }
       );

      // Réinitialisez le formulaire après la soumission si nécessaire
      this.projectForm.reset();

      // Faites tout autre traitement nécessaire ici
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
}
