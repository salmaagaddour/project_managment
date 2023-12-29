import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProjectService } from './project.service';
import { Router, Routes } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/addproject', title: 'addproject',  icon: 'ni-tv-2 text-primary', class: '' },
 
];
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  projects: any[]; // Assurez-vous que le type du tableau correspond au type des projets récupérés depuis le service.
  newProjectsCount: number;
  finishedProjectsCount: number;
  progProjectsCount: number;
  constructor(private projectService: ProjectService) {} // Injection du service dans le constructeur
  selectedProjectId: number;

  // Créez un événement qui émettra l'ID du projet sélectionné
  @Output() projectSelected = new EventEmitter<number>();

  // Fonction appelée lorsque l'utilisateur sélectionne un projet
  onSelectProject(projectId: number) {
    this.selectedProjectId = projectId;
    this.projectSelected.emit(projectId);
  }
  ngOnInit(): void {
    this.fetchProjects(); // Appeler la fonction pour récupérer les projets au moment de l'initialisation du composant
    this.projectService.NewProjects().subscribe((count) => {
      this.newProjectsCount = count;
    });
    this.projectService.finishedProjects().subscribe((count) => {
      this.finishedProjectsCount = count;
    });
    this.projectService.Projectprog().subscribe((count) => {
      this.progProjectsCount = count;
    });
  }

  fetchProjects(): void {
    this.projectService.getProjects().subscribe(
      (data: any) => {
        this.projects = data; // Stocker les projets récupérés dans le tableau
      },
      (error: any) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
  openAddProjectDialog(): void {
   // this.router.navigate(['/addproject']);
  }
  /*Newproject():number {

  }*/
}
