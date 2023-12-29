import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectDetailComponent } from 'src/app/project-detail/project-detail.component';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/tables', title: 'Projects',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/members', title: 'Members',  icon:'ni-circle-08 text-blue', class: '' },
    { path: '/tables', title: 'Archive',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/ressource', title: 'ressource',  icon: 'fas fa-server text-primary', class: '' },
 
  
 
   
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
