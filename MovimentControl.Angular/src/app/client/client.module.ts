import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientCreateEditComponent } from './client-create-edit/client-create-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TitleComponent } from './title/title.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    ClientComponent,
    ClientDetailsComponent,
    ClientCreateEditComponent,
    DashboardComponent,
    TitleComponent,
    
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild()
  ],
})
export class ClientModule {}
