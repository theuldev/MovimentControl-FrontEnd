import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { ClientService } from '../../shared/services/client.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-login2fa',
  templateUrl: './login2fa.component.html',
  styleUrls: ['./login2fa.component.css'],
})
export class Login2faComponent implements OnInit {
  userForm: FormGroup;
  id: any;
  isAuthorized = false;
  isAuthenticated = false;

  display: any;

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      token: ['', [Validators.required, Validators.maxLength(4)]],
      loggedTime: [formatDate(Date.now(), 'yyyy-MM-ddTHH:mm:ss', 'en')],
    });
  }
  get f() {
    return this.userForm.controls;
  }
  ngAfterViewInit() {
    this.Timer();
  }

  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.clientService.login2fa(this.userForm.value, id).subscribe({
      next: (data: any) => {
        this.router.navigateByUrl('/client/dashboard');
      },
      error: (err) => {
        console.log(err);
        if (err.status == 401) {
          this.isAuthorized = true;
          setTimeout(() => {
            this.router.navigateByUrl('/');
          }, 3000);
        }
        if (err.status == 403) {
          this.isAuthenticated = true;
        }
      },
    });
  }
  Timer() {
    var seconds = 60;
    var interval = setInterval(() => {
      if (seconds > 1) {
        seconds--;
        this.display = `${seconds}`;
      } else {
        this.display = 'Token expirado.';
        this.isAuthorized = true;

        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 3000);
        seconds = 60;
      }
    }, 1000);
  }
}
