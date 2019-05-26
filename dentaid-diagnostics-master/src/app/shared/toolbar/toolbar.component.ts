import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  username: any;
  constructor(private loginService: LoginService,
              private db: AngularFireDatabase) { }

  ngOnInit() {
    this.db.object(`/users/${JSON.parse(localStorage.getItem('user')).uid}/name`).valueChanges().subscribe((name) => {
      this.username = name;
      console.log('username: ', this.username);
    });
  }
  logout() {
    this.loginService.logout();
  }

}
