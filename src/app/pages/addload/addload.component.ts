
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../tables/project.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-addload',
  templateUrl: './addload.component.html',
  styleUrls: ['./addload.component.scss']
})
export class AddloadComponent implements OnInit {

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
        member_name: ['', Validators.required],
      
      time: ['' ,Validators.required],
       amount: ['']
      });
    });
  }
  onSubmit() {
    // Cette fonction sera appelée lorsque le formulaire est soumis

    // Assurez-vous que le formulaire est valide
    if (this.projectForm.valid) {
      const formData = this.projectForm.value;
     
      
   
      // Récupérez les données du formulaire
      

       this.projectService.addload(formData).subscribe(
        (response) => {
      //   
          console.log('load added successfully', response);

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
  
  
 

}
