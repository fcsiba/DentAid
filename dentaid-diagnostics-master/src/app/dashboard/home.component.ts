import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  lastWeekOpg = 0;
  personalUploads = 0;
  patients = 0;
  constructor(private loginService: LoginService,
              private formBuilder: FormBuilder,
              private db: AngularFireDatabase) { }

  ngOnInit() {
    this.lastWeekOpg = 0; // to-do: count the number of images uploaded to firebase storage in the last week
    this.db.list(`/users/${JSON.parse(localStorage.getItem('user')).uid}/patients`).valueChanges().subscribe(patient => {
      patient.forEach(aPatient => {
        this.patients++;
        if (aPatient['opgs']) {
          Object.keys(aPatient['opgs']).forEach(_ => {
            this.personalUploads++;
          });
        }
      });
    });
    this.db.list('/opgclient').valueChanges().subscribe(files => {
      this.lastWeekOpg = files.length;
    });
    this.searchForm = this.formBuilder.group({
      search: [undefined, Validators.required]
    });
  }
  logout() {
    this.loginService.logout();
  }
  search() {
    if (this.searchForm.get('search').value !== null) {
      // search all images with this mr number and open on another page
    }
  }

}
