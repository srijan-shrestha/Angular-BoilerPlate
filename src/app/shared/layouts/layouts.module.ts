import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullComponent } from './full/full.component';
import { BlankComponent } from './blank/blank.component';
import { HeaderComponent } from './header/header.component';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { TopNavItemComponent } from './top-nav/top-nav-item/top-nav-item.component';
import { PlansLayoutComponent } from './plans-layout/plans-layout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PlanPreviewLayoutComponent } from './plans-layout/plan-preview-layout/plan-preview-layout.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PlanTopbarComponent } from './plans-layout/plan-topbar/plan-topbar.component';

@NgModule({
  declarations: [
    FullComponent,
    BlankComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    SideNavComponent,
    TopNavComponent,
    TopNavItemComponent,
    PlansLayoutComponent,
    PlanPreviewLayoutComponent,
    PlanTopbarComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ComponentsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule
  ],
  exports: [
    FullComponent,
    BlankComponent,
    SidebarComponent,
    ContentComponent,
    SideNavComponent,
    TopNavComponent,
    TopNavItemComponent,
    PlansLayoutComponent,
    PlanPreviewLayoutComponent,
    PlanTopbarComponent,
  ]
})
export class LayoutsModule { }
