import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login2faComponent } from './login2fa/login2fa.component';
import { ClientCreateEditComponent } from './client-create-edit/client-create-edit.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'dashboard/details/:id', component: ClientDetailsComponent },
  { path: 'dashboard/update/:id', component: ClientCreateEditComponent },
  { path: 'dashboard/create', component: ClientCreateEditComponent },
  {path:'dashboard',component:DashboardComponent},
  {path:'login2fa/:id',component:Login2faComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
