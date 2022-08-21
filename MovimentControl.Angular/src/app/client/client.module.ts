import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClientRoutingModule } from './client-routing.module';

import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientCreateEditComponent } from './client-create-edit/client-create-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxMaskModule } from 'ngx-mask';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    ClientDetailsComponent,
    ClientCreateEditComponent,
    DashboardComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
    ModalModule.forChild()
  ],
})
export class ClientModule {}
