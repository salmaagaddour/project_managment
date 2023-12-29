import { Component, OnInit } from '@angular/core';
import { MemberService } from '../pages/member/member.service';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.scss']
})
export class RessourceComponent implements OnInit {

  members: any[]; // 

  constructor(private memberService: MemberService) {} // Injection du service dans le constructeur

  ngOnInit(): void {
    this.fetchProjects(); // Appeler la fonction pour récupérer les projets au moment de l'initialisation du composant
  }

  fetchProjects(): void {
    this.memberService.getRessource().subscribe(
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
