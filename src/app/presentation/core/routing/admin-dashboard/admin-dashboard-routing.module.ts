import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { DashboardComponent } from '../../../dashboard/dashboard.component';
import { FeedbackComponent } from '../../../feedback/feedback.component';
import { RolesComponent } from '../../../roles/roles.component';
import { NewRoleComponent } from '../../../new-role/new-role.component';
import { ContactRequestsComponent } from '../../../contact-requests/contact-requests.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: 'contact-requests', component: ContactRequestsComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'roles/new', component: NewRoleComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
