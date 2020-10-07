import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { AdminCompanyContainerComponent } from './admin-company-container/admin-company-container.component';


const routes: Routes = [{
  path: 'companies',
  component: AdminCompanyContainerComponent,
  children: [
    {
      path: '',
      component: CompanyListComponent
    },
    {
      path: 'create',
      component: CreateComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCompanyRoutingModule { }
