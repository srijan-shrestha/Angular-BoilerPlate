import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PersonalOverviewComponent } from './components/personal-overview/personal-overview.component';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { SharedModule } from '../../shared/shared.module';
import { SlideOutComponent } from './components/slide-out/slide-out.component';


@NgModule({
  declarations: [DashboardComponent, PersonalOverviewComponent, DashboardContainerComponent, SlideOutComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ],
})
export class DashboardModule { }
