import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './button/button.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {InputComponent} from './input/input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableHeaderDirective} from './table/table-header.directive';
import {CdkTableModule} from '@angular/cdk/table';
import {TableComponent} from './table/table/table.component';
import {TableDirective} from './table/table.directive';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {TimePickerComponent} from './time-picker/time-picker.component';
import {RouterModule} from '@angular/router';
import {ConfirmationApproveDialogComponent} from './confirmation-approve-dialog/confirmation-approve-dialog.component';


@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    ProgressBarComponent,
    ProgressBarComponent,
    TableHeaderDirective,
    TableDirective,
    TableComponent,
    ConfirmationDialogComponent,
    TimePickerComponent,
    ConfirmationApproveDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CdkTableModule,
    CdkStepperModule,
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    ProgressBarComponent,
    TableComponent,
    TableHeaderDirective,
    TimePickerComponent,

  ],
  entryComponents: [
    ConfirmationDialogComponent,
    ConfirmationApproveDialogComponent,
  ]
})
export class ComponentsModule {
}
