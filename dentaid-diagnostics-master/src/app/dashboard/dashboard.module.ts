import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ReactiveFormsModule } from '@angular/forms';
import { OpgpanelComponent } from './opgpanel/opgpanel.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgxViewerModule } from 'ngx-viewer';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  declarations: [
    HomeComponent,
    OpgpanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    AngularFireStorageModule,
    NgxViewerModule,
    SharedModule
  ],
  exports: [
  ]
})
export class DashboardModule { }
