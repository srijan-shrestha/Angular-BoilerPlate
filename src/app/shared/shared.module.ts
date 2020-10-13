import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkTableModule} from '@angular/cdk/table';
import {ComponentsModule} from './components/components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutsModule} from './layouts/layouts.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CdkStepperModule} from '@angular/cdk/stepper';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CdkTableModule,
    LayoutsModule,
    DragDropModule,
    NgbModule,
    CdkStepperModule
  ],
  exports: [
    CommonModule,
    CdkTableModule,
    CdkStepperModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutsModule,
    NgbModule,
    DragDropModule,
  ]
})
export class SharedModule {
}
