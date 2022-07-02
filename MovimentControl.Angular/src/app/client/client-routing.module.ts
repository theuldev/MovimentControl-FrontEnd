import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientCreateEditComponent } from './client-create-edit/client-create-edit.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientComponent } from './client.component';

const routes: Routes = [
  { path: '', component: ClientComponent },
  { path: 'details/:id', component: ClientDetailsComponent },
  { path: 'update/:id', component: ClientCreateEditComponent },
  { path: 'create', component: ClientCreateEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
