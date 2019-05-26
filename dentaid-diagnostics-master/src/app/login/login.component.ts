import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.formInit();
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }

  formInit() {
    this.loginForm = this.fb.group({
      userId: [undefined, Validators.email],
      password: [undefined, Validators.required]
    });
  }
  login() {
    console.log('email: ', this.loginForm.get('userId').value);
    this.loginService.login(this.loginForm.get('userId').value, this.loginForm.get('password').value);
  }

}
