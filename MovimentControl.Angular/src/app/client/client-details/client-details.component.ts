import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { ClientService } from '../../shared/services/client.service';

@Component({
  selector: 'client-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css'],
})
export class ClientDetailsComponent implements OnInit {
  public clientForm!: FormGroup;
  constructor(
    private clientService: ClientService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.clientService
      .getById(id)
      .pipe(first())
      .subscribe({
        next: (client) => {
          this.clientForm.patchValue(client);
        },
        error: (err) =>{ 
       if (err.status >= 400) {
            console.log(err);
            this.router.navigateByUrl('/');
          }
        }
      });

    this.clientForm = this.fb.group({
      fullName: ['',],
      cep: [''],
      email: [''],
      cpf: [''],
      gender: [''],
      phone: [''],
      service: [''],
      details: [''],
      career: [''],
      state: [''],
      city: [''],
      mCivil: [''],
      healthI: [''],
      rg: [''],
      address: [''],
      district: [''],
    });
  }
}
