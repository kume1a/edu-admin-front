import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './presentation/not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./presentation/core/routing/auth/auth.module').then(
        (res) => res.AuthModule,
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import(
        './presentation/core/routing/admin-dashboard/admin-dashboard.module'
      ).then((res) => res.AdminDashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
