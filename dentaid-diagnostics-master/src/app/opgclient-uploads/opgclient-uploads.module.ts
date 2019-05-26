import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ClientUploadsComponent } from './client-uploads.component';
import { AuthGuardService } from '../guards/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxViewerModule } from 'ngx-viewer';
import { AngularFireStorageModule } from '@angular/fire/storage';

const routes: Routes = [
  {
    path: '',
    component: ClientUploadsComponent
  }
];

@NgModule({
  declarations: [
    ClientUploadsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AngularFireDatabaseModule,
    MDBBootstrapModule,
    NgxViewerModule,
    AngularFireStorageModule
  ]
})
export class OpgclientUploadsModule { }
