import { NgModule } from '@angular/core';
import { DashboardComponent } from '../../../dashboard/dashboard.component';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { FeedbackComponent } from '../../../feedback/feedback.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { CommonModule } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzOverflowModule } from 'ng-zorro-antd/cdk/overflow';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgxsModule } from '@ngxs/store';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { DirectivesModule } from '../../directives/directives.module';
import { RolesComponent } from '../../../roles/roles.component';
import { RolesState } from '../../../roles/state/roles.state';
import { NewRoleState } from '../../../new-role/state/new-role.state';
import { NewRoleComponent } from '../../../new-role/new-role.component';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardState } from '../../../dashboard/state/dashboard.state';
import { DocumentsComponent } from '../../../documents/documents.component';
import { GenresComponent } from '../../../genres/genres.component';
import { CreationsComponent } from '../../../creations/creations.component';
import { EpisodesComponent } from '../../../episodes/episodes.component';
import { ChaptersComponent } from '../../../chapters/chapters.component';
import { AuthorsComponent } from '../../../authors/authors.component';
import { InfoUrlsComponent } from '../../../info-urls/info-urls.component';
import { InfoParagraphsComponent } from '../../../info-paragraphs/info-paragraphs.component';
import { DocumentsState } from '../../../documents/state/documents.state';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    DashboardComponent,
    FeedbackComponent,
    RolesComponent,
    NewRoleComponent,
    DocumentsComponent,
    GenresComponent,
    CreationsComponent,
    EpisodesComponent,
    ChaptersComponent,
    AuthorsComponent,
    InfoUrlsComponent,
    InfoParagraphsComponent,
  ],
  imports: [
    NgxsModule.forFeature([
      RolesState,
      NewRoleState,
      DashboardState,
      DocumentsState,
    ]),
    AdminDashboardRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzBreadCrumbModule,
    CommonModule,
    NzTabsModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzOverflowModule,
    NzDropDownModule,
    NzInputModule,
    NzGridModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzFormModule,
    NzNotificationModule,
    NzMessageModule,
    DirectivesModule,
    NzImageModule,
    NzPopoverModule,
    NgxEchartsModule,
  ],
})
export class AdminDashboardModule {}
