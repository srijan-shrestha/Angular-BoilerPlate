import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkTableModule} from '@angular/cdk/table';
import {ComponentsModule} from './components/components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutsModule} from './layouts/layouts.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TextColorDirective} from './directive/text-color.directive';
import {BackgroundColorDirective} from './directive/background-color.directive';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { NumberSuffixPipe } from './pipes/number-suffix.pipe';

@NgModule({
  declarations: [TextColorDirective, BackgroundColorDirective, NumberSuffixPipe],
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
    TextColorDirective,
    BackgroundColorDirective,
    NumberSuffixPipe
  ]
})
export class SharedModule {
}
