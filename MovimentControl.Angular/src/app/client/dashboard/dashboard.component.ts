import { registerLocaleData } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Observable } from 'rxjs';
import { Client } from 'src/app/shared/models/Client';
import { ClientService } from '../../shared/services/client.service';

@Component({
  selector: 'client-client-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  clients!: Client[];

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientService.get().subscribe({
      next: (_client) => (this.clients = _client),
      error: (err) => console.error(err),
    });
  }
  onDelete(id: number) {
    const client = this.clients.find((c) => c.id === id);
    if (!client) return;

    client.isDeleted = true;

    this.clientService
      .delete(id)
      .pipe(first())
      .subscribe({
        next: (success) =>
          (this.clients = this.clients.filter((c) => c.id !== id)),
        error: (err) => {
          if (err.status >= 400) {
            console.error(err.error.message);
          }
        },
      })
      .add(() => (client.isDeleted = false));

    window.location.reload();
  }
  selectClient(id: number) {
    this.router.navigateByUrl(`client/details/${id}`);
  }
}
