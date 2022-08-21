import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Client } from 'src/app/shared/models/Client';
import { CepApiService } from 'src/app/shared/services/cep-api.service';
import { ClientService } from '../../shared/services/client.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'client-client-create-edit',
  templateUrl: './client-create-edit.component.html',
  styleUrls: ['./client-create-edit.component.css'],
})
export class ClientCreateEditComponent implements OnInit {
  clientForm!: FormGroup;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  id!: number;
  isValid = true;

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cepService: CepApiService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.clientService
        .getById(this.id)
        .pipe(first())
        .subscribe({
          next: (client) => {
            this.clientForm.patchValue(client);
          },
          error: (err) => console.log(err),
        });
    }
    this.clientForm = this.fb.group({
      id: [this.id],
      fullName: ['', [Validators.required, Validators.maxLength(50)]],
      cep: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      service: ['', Validators.required],
      details: ['', [Validators.required, Validators.maxLength(100)]],
      career: ['', [Validators.required, Validators.maxLength(30)]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      mCivil: ['', Validators.required],
      healthI: ['', Validators.required],
      rg: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', Validators.required],
      district: ['', Validators.required],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (!this.clientForm.valid) return;
    this.loading = true;

    if (this.isAddMode) {
      this.createClient();
    } else {
      this.updateClient();
    }
  }
  searchCep() {
    const cep = this.clientForm.get('cep')?.value;
    if (cep != null || cep !== '') {
      this.cepService.searchCep(cep).subscribe({
        next: (data) => {
          if (data.hasOwnProperty('erro')) {
            this.isValid = false;
            this.cleanForm();
          } else {
            this.fillForm(data);
            this.isValid = true;
          }
        },
        error: (err) => console.log(err),
      });
    }
  }

  cleanForm() {
    this.clientForm.patchValue({
      state: null,
      district: null,
      address: null,
      city: null,
      cep: null,
    });
  }
  fillForm(data: any) {
    this.clientForm.patchValue({
      state: data.uf,
      district: data.bairro,
      city: data.localidade,
      address: data.logradouro,
    });
  }
  get f() {
    return this.clientForm.controls;
  }
  private createClient() {
    this.clientService
      .post(this.clientForm.value)
      .pipe(first())
      .subscribe({
        next: (success) => {
          console.log(success);
          this.router.navigateByUrl('/client/dashboard');
        },
        error: (err) => {
          if (err.status >= 400) {
            console.log(err);
            this.router.navigateByUrl('/');
          }
        },
      })
      .add(() => (this.loading = false));
  }
  private updateClient() {
    this.clientService
      .put(this.id, this.clientForm.value)
      .pipe(first())
      .subscribe({
        next: (success) => {
          console.log(success);
          this.router.navigateByUrl('/client/dashboard');
        },
        error: (err) => {
          if (err.status >= 400) {
            console.log(err);
            this.router.navigateByUrl('/');
          }
        },
      })
      .add(() => (this.loading = false));
  }
}
