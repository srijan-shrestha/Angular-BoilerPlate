import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCompanyRoutingModule } from './admin-company-routing.module';
import { CreateComponent } from './components/create/create.component';
import {SharedModule} from '../../shared/shared.module';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { AdminCompanyContainerComponent } from './admin-company-container/admin-company-container.component';


@NgModule({
  declarations: [CreateComponent, CompanyListComponent, AdminCompanyContainerComponent],
  imports: [
    CommonModule,
    AdminCompanyRoutingModule,
    SharedModule
  ]
})
export class AdminCompanyModule { }
