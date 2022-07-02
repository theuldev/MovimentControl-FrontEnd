import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/shared/models/Client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  public title = 'Clients';
  public clientForm!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {}
  clientSelect(client: Client) {
    
    this.clientForm.patchValue(client);
  }

  createForm() {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      cep: ['', Validators.required],
      email: ['', Validators.required],
      cpf: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      service: ['', Validators.required],
      details: ['', Validators.required],
      career: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      mcivil: ['', Validators.required],
      healthI: ['', Validators.required],
      rg: ['', Validators.required],
      address: ['', Validators.required],
      district: ['', Validators.required],
    });
  }

}
