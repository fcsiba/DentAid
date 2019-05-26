import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UploadsComponent } from './uploads.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { SharedModule } from '../shared/shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxViewerModule } from 'ngx-viewer';

const routes: Routes = [
  {
    path: '',
    component: UploadsComponent
  }
];

@NgModule({
  declarations: [
    UploadsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularFireDatabaseModule,
    MDBBootstrapModule.forRoot(),
    SharedModule,
    NgxViewerModule
  ]
})
export class PersonalUploadsModule { }
