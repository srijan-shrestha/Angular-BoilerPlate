import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullComponent } from './full/full.component';
import { BlankComponent } from './blank/blank.component';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    FullComponent,
    BlankComponent,
    ContentComponent,
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
    ContentComponent,
  ]
})
export class LayoutsModule { }
