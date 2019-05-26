import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: '../app/login/login.module#LoginModule'
  },
  {
    path: 'dashboard',
    loadChildren: '../app/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'personal-uploads',
    loadChildren: '../app/personal-uploads/personal-uploads.module#PersonalUploadsModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'opgclient-uploads',
    loadChildren: '../app/opgclient-uploads/opgclient-uploads.module#OpgclientUploadsModule',
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
