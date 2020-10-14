import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardContainerComponent,
    children : [
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
