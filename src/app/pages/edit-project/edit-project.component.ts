import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../tables/project.service';
//import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  projectForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private  projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      client: ['', Validators.required],
      project_manager: ['', Validators.required],
      budget: ['', Validators.required],
      expected_start_date: ['', Validators.required],
      expected_end_date: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['id'];

    this.projectService.getProjectById(projectId).subscribe((project) => {
      this.projectForm.patchValue(project);
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const projectId = this.route.snapshot.params['id'];
      const updatedProject = this.projectForm.value;

      this.projectService.updateProject(projectId, updatedProject).subscribe(
        () => {
          // Redirigez l'utilisateur vers la page de détails du projet ou une autre page après la mise à jour réussie.
          this.router.navigate(['/tables']);
        },
        (error) => {
          console.error('Error updating project:', error);
        }
      );
    }
  }
}

