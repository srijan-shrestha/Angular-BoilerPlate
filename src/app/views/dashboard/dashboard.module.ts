import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [DashboardComponent, DashboardContainerComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ],
})
export class DashboardModule { }
