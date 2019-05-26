import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {
  user: any;
  patientsImageList = [];
  patientData = [];
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.db.object(`/users/${JSON.parse(localStorage.getItem('user')).uid}/name`).valueChanges()
    .subscribe(val => {
      // tslint:disable-next-line:quotemark
      this.user = 'Dr. ' + val + "'s Uploads";
    });
    this.db.list(`/users/${JSON.parse(localStorage.getItem('user')).uid}/patients`).valueChanges()
    .subscribe(patients => {
      patients.forEach(patient => {
        // add patient name and mr number to an array
        this.patientData.push({name: patient['name'], mr: patient['mrNumber']});
        console.log(patient);
        if (patient['opgs']) {
          const imgUrls = [];
          Object.keys(patient['opgs']).forEach(key => {
            const theDate = new Date(parseInt(key, 10)).toString();
            imgUrls.push({url: patient['opgs'][key]['opgURL'], date: theDate});
          });
          this.patientsImageList.push(imgUrls);
        }
      });
      console.log(this.patientsImageList);
      console.log(this.patientData);
    });
  }

}
