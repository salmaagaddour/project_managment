import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { ProjectDetailComponent } from 'src/app/project-detail/project-detail.component';
import { AddtaskComponent } from 'src/app/pages/addtask/addtask.component';
import { AddtaskreelComponent } from 'src/app/pages/addtaskreel/addtaskreel.component';
import { MemberComponent } from 'src/app/pages/member/member.component';
import { AddmemberComponent } from 'src/app/pages/addmember/addmember.component';
import { DashdetailComponent } from 'src/app/pages/dashdetail/dashdetail.component';
import { AddcostComponent } from 'src/app/pages/addcost/addcost.component';
import { AddloadComponent } from 'src/app/pages/addload/addload.component';
import { EditProjectComponent } from 'src/app/pages/edit-project/edit-project.component';
import { RessourceComponent } from 'src/app/ressource/ressource.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'project/:id', component: ProjectDetailComponent },
    { path: 'addtask/:id', component: AddtaskComponent },
    { path: 'adddtaskreel/:id', component: AddtaskreelComponent },
    { path: 'members',           component: MemberComponent },
    { path: 'addmember',           component: AddmemberComponent },
    { path: 'dash/:id',           component: DashdetailComponent },
    { path: 'addcost/:id',           component: AddcostComponent },
    { path: 'addload/:id',           component: AddloadComponent },
    {   path: 'edit-project/:id',    component: EditProjectComponent,
      },
      {path:'ressource', component:RessourceComponent}
];
