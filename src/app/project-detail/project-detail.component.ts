import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../pages/tables/project.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/addtask/:projectId', title: 'addtask',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/addtaskreel/:projectId', title: 'addtaskreel',  icon: 'ni-tv-2 text-primary', class: '' },
 
];
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})

export class ProjectDetailComponent implements OnInit {
  project: any; // Ajustez le type selon votre structure de données
  public clicked: boolean = true;
  public clicked1: boolean = false;
  showRoadmapTable = true;
  showActualTable = false;
  projectOptionsOpen = false;
  selectedTab: 'roadmap' | 'taskreel' = 'roadmap';
 // tasks: any[] = [];
  constructor(
    private route: ActivatedRoute, private router: Router,
    private projectService: ProjectService, // Injectez votre service ici
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const projectId = params.get('id');
      
      if (projectId) {
        this.projectService.getProjectById(projectId).subscribe(
          (project) => {
            this.project = project;
  
            // Récupérer les tâches de type "roadmap" spécifiques du projet
            this.projectService.getRoadmapTasks(project.id).subscribe(
              (roadmapTasks) => {
                this.project.roadmapTasks = roadmapTasks;
              },
              (error) => {
                console.error('Error fetching roadmap tasks:', error);
              }
            );
  
            // Récupérer les tâches de type "taskreel" spécifiques du projet
            this.projectService.getTaskreelTasks(project.id).subscribe(
              (taskreelTasks) => {
                this.project.taskreelTasks = taskreelTasks;
            
              },
              (error) => {
                console.error('Error fetching taskreel tasks:', error);
              }
            );
          },
          (error) => {
            console.error('Error fetching project by ID:', error);
          }
        );
      }
    });
  }
  
  openProjectOptions() {
    this.projectOptionsOpen = !this.projectOptionsOpen;
  }
  showRoadmap(): void {
    this.selectedTab = 'roadmap';
  }
  
  showActual(): void {
    this.selectedTab = 'taskreel';
  }
  openAddForm(selectedTab: string): void {
    if (selectedTab === 'roadmap') {
      this.router.navigate(['/addtask', this.project.id]); // Remplacez '/add-roadmap' par l'URL de votre formulaire roadmap
    } else if (selectedTab === 'taskreel') {
      this.router.navigate(['/adddtaskreel',this.project.id]); // Remplacez '/add-reel' par l'URL de votre formulaire reel
    }
  }
  deleteTask(task: any) {
    
    this.projectService.deleteTask(task.id).subscribe(
      () => {
        this.project.roadmapTasks = this.project.roadmapTasks.filter(t => t.id !== task.id);
        this.project.taskreelTasks = this.project.taskreelTasks.filter(t => t.id !== task.id);
        // Utilisez cette approche si roadmapTasks et taskreelTasks sont les propriétés où vous stockez les tâches dans votre projet
        
    //    this.toastr.success('Task deleted successfully', 'Success');
      },
      (error) => {
        console.error('Error deleting task:', error);
   //     this.toastr.error('Error deleting task', 'Error');
      }
    );
  }
  deleteTaskreel(taskreel: any): void {
    this.projectService.getTaskreelIdByTaskId(taskreel.id).subscribe(
      (taskId) => {
    this.projectService.deleteTaskreel(taskId).subscribe(
      () => {
        
        // Tâche supprimée avec succès
        // Mettez à jour les données ou redirigez selon vos besoins
      },
      (error) => {
        console.error('Error deleting taskreel:', error);
        // Gérez l'erreur, affichez une notification, etc.
      }
    );
  },
)}
}

