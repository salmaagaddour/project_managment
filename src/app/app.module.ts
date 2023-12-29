import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AddtaskComponent } from './pages/addtask/addtask.component';
import { AddtaskreelComponent } from './pages/addtaskreel/addtaskreel.component';
import { MemberComponent } from './pages/member/member.component';
import { AddmemberComponent } from './pages/addmember/addmember.component';
import { DashdetailComponent } from './pages/dashdetail/dashdetail.component';
import { AddcostComponent } from './pages/addcost/addcost.component';
import { AddloadComponent } from './pages/addload/addload.component';
import { LoginComponent } from './pages/login/login.component';
import { EditProjectComponent } from './pages/edit-project/edit-project.component';
import { RessourceComponent } from './ressource/ressource.component';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    MatSlideToggleModule,
    AppRoutingModule,
    MatDatepickerModule, 
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatNativeDateModule,
    NgbDropdownModule,

  ],
  
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    UserProfileComponent,
    ProjectDetailComponent,
    AddtaskComponent,
    AddtaskreelComponent,
    MemberComponent,
    AddmemberComponent,
    DashdetailComponent,
    AddcostComponent,
    LoginComponent,
    AddloadComponent,
    EditProjectComponent,
    RessourceComponent
  ],
  
  providers: [
    { useValue: {hasBackdrop: false},provide: MAT_DATE_LOCALE,}
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
