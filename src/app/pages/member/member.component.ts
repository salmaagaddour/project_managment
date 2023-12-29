import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../tables/project.service';
import { MemberService } from './member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  members: any[]; // 

  constructor(private memberService: MemberService) {} // Injection du service dans le constructeur

  ngOnInit(): void {
    this.fetchProjects(); // Appeler la fonction pour récupérer les projets au moment de l'initialisation du composant
  }

  fetchProjects(): void {
    this.memberService.getMembers().subscribe(
      (data: any) => {
        this.members = data; // Stocker les projets récupérés dans le tableau
      },
      (error: any) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
  openAddProjectDialog(): void {
   // this.router.navigate(['/addproject']);
  }
}
