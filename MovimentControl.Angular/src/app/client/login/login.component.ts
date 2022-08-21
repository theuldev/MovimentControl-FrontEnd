import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;
  isValid = true;
  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      Username: ['', [Validators.required, Validators.maxLength(10)]],
      Password: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }
  get f() {
    return this.userForm.controls;
  }
  onSubmit() {
    this.clientService
      .login(this.f['Username'].value, this.f['Password'].value)
      .subscribe({
        next: (data: any) => {
          localStorage.setItem('user_Info', JSON.stringify(data.token));
          var url = `/client/login2fa/${data.id}`;
          this.router.navigateByUrl(url);
        },
        error: (err) => {
          if (err.status == 500) {
            console.log(err.status);
          }
          if (err.status == 400) {
            console.log(err);
            this.isValid = false;
            this.cleanForm();
          }
        },
      });
  }
  cleanForm() {
    this.userForm.patchValue({
      Username: null,
      Password: null,
    });
  }
}
