import { LocationStrategy, registerLocaleData } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Observable } from 'rxjs';
import { Client } from 'src/app/shared/models/Client';
import { ClientService } from '../../shared/services/client.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'client-client-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  clients!: Client[];
  modalDeleteRef!: BsModalRef;
  clientSelected!: Client;
  @ViewChild('ModalDelete') modalDelete: any;
  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.clientService.get().subscribe({
      next: (_client) => (this.clients = _client),
      error: (err) => console.log(err),
    });
  }
  onDelete() {
    const client = this.clients.find((c) => c.id === this.clientSelected.id);

    if (!client) return;

    client.isDeleted = true;

    this.clientService
      .delete(this.clientSelected.id)
      .pipe(first())
      .subscribe({
        next: (success) => {
          this.clients = this.clients.filter(
            (c) => c.id !== this.clientSelected.id
          );
        },
        error: (err) => {
          console.log(err);
          if (err.status >= 400) {
            console.log(err);
            this.router.navigateByUrl('/');
          }
        },
      })
      .add(() => {
        client.isDeleted = false;

        this.modalDeleteRef.hide();
        this.onRefresh();
      });
  }

  openModalDelete(client: Client) {
    this.clientSelected = client;
    this.modalDeleteRef = this.modalService.show(this.modalDelete, {
      class: 'modal-sm',
    });
  }
  closeModalDelete() {
    this.modalDeleteRef.hide();
  }
  onRefresh() {
    location.reload();
  }
  onLogout() {
    localStorage.removeItem('user_Info');
  }
}
