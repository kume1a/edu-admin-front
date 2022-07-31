import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { DashboardComponent } from '../../../dashboard/dashboard.component';
import { FeedbackComponent } from '../../../feedback/feedback.component';
import { RolesComponent } from '../../../roles/roles.component';
import { NewRoleComponent } from '../../../new-role/new-role.component';
import { DocumentsComponent } from '../../../documents/documents.component';
import { GenresComponent } from '../../../genres/genres.component';
import { EpisodesComponent } from '../../../episodes/episodes.component';
import { CreationsComponent } from '../../../creations/creations.component';
import { AuthorsComponent } from '../../../authors/authors.component';
import { InfoUrlsComponent } from '../../../info-urls/info-urls.component';
import { InfoParagraphsComponent } from '../../../info-paragraphs/info-paragraphs.component';
import { ChaptersComponent } from '../../../chapters/chapters.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'roles/new', component: NewRoleComponent },
      { path: 'documents', component: DocumentsComponent },
      { path: 'genres', component: GenresComponent },
      { path: 'creations', component: CreationsComponent },
      { path: 'episodes', component: EpisodesComponent },
      { path: 'chapters', component: ChaptersComponent },
      { path: 'authors', component: AuthorsComponent },
      { path: 'info-urls', component: InfoUrlsComponent },
      { path: 'info-paragraphs', component: InfoParagraphsComponent },
      { path: 'feedback', component: FeedbackComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
