import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { LoginService } from '../../login/login.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-opgpanel',
  templateUrl: './opgpanel.component.html',
  styleUrls: ['./opgpanel.component.scss']
})
export class OpgpanelComponent implements OnInit {
  @ViewChild('patientModal') patientModal: ModalDirective;
  uploadOpg = false;
  patientSelect = new FormControl(undefined, Validators.required);
  mrNumber = new FormControl(undefined, Validators.required);
  patientName = new FormControl(undefined, Validators.required);
  gender = new FormControl(undefined, Validators.required);
  dob = new FormControl(undefined, Validators.required);
  patients = [
    // {mrNum: '12345', name: 'Malik Ahmed'},
    // {mrNum: '56787', name: 'Ali Ahmed'}
  ];
  patient: string = null;
  task: AngularFireUploadTask;
  snapshot: Observable<any>;
  downloadURL: Observable<any>;
  currentOpgURL = null;
  constructor(private loginService: LoginService,
              private storage: AngularFireStorage,
              private db: AngularFireDatabase) { }

  ngOnInit() {
    // populate patients array
    this.db.list(`/users/${JSON.parse(localStorage.getItem('user')).uid}/patients`).valueChanges()
    .subscribe(list => {
      list.forEach(val => {
        console.log(val);
        // tslint:disable-next-line:no-string-literal
        this.patients.push({mrNum: val['mrNumber'], name: val['name']});
      });
    });
  }
  useCurrentPatient() {
    console.log('current patient: ', this.patientSelect.value);
    this.patient = this.patientSelect.value;
    // enable upload opg button
    this.uploadOpg = true;
    // to-do db operation
    this.patientModal.hide();
  }
  useNewPatient() {
    console.log('new patient: ', this.mrNumber.value + this.patientName.value + this.gender.value + this.dob.value);
    this.patient = this.mrNumber.value + ' ' + this.patientName.value;
    // enable upload opg button
    this.uploadOpg = true;
    // Add patient to database
    this.db.object(`/users/${JSON.parse(localStorage.getItem('user')).uid}/patients/${this.mrNumber.value}`)
    .update({mrNumber: this.mrNumber.value, name: this.patientName.value, gender: this.gender.value, dob: this.dob.value});
    this.patientModal.hide();
  }
  uploadImg(image: File) {
    console.log('uploading file: ', image);
    if (image.size < 10000000) {
      const filePath = `${JSON.parse(localStorage.getItem('user')).uid}/${this.patient.split(' ')[0]}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.task = this.storage.upload(filePath, image);
      this.snapshot = this.task.snapshotChanges();
      this.task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(value => {
            this.currentOpgURL = value;
            // add url to list of OPGs for patient
            // tslint:disable-next-line:max-line-length
            this.db.object(`/users/${JSON.parse(localStorage.getItem('user')).uid}/patients/${this.patient.split(' ')[0]}/opgs/${new Date().getTime()}`)
            .update({opgURL: value});
          });
        })
      ).subscribe();

    } else {
      console.error('file size greater than 10 MB');
    }
  }

}
