import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './button/button.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {InputComponent} from './input/input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PasswordStrengthMeterComponent} from './password-strength-meter/password-strength-meter.component';
import {SwitchComponent} from './switch/switch.component';
import {FileComponent} from './file/file.component';
import {CardComponent} from './card/card.component';
import {SelectComponent} from './select/select.component';
import {NgxMaskModule} from 'ngx-mask';
import {NavAccordionComponent} from './nav-accordion/nav-accordion/nav-accordion.component';
import {NavAccordionDropdownComponent} from './nav-accordion/nav-accordion-dropdown/nav-accordion-dropdown.component';
import {NavAccordionHeaderComponent} from './nav-accordion/nav-accordion-header/nav-accordion-header.component';
import {NavAccordionItemComponent} from './nav-accordion/nav-accordion-item/nav-accordion-item.component';
import {TableHeaderDirective} from './table/table-header.directive';
import {CdkTableModule} from '@angular/cdk/table';
import {TableComponent} from './table/table/table.component';
import {TabComponent} from './tabs/tab/tab.component';
import {TabsComponent} from './tabs/tabs/tabs.component';
import {TableDirective} from './table/table.directive';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {DoughnutChartComponent} from './doughnut-chart/doughnut-chart.component';
import {GoalCardComponent} from './goal-card/goal-card.component';
import {IconComponent} from './icon/icon.component';
import {UserCardComponent} from './user-card/user-card.component';
import {DivisionCardComponent} from './division-card/division-card.component';
import {MemberFilterDialogComponent} from './member-filter-dialog/member-filter-dialog.component';
import {ProfileModalComponent} from './profile-modal/profile-modal.component';
import {ImageMetadataModalComponent} from './image-metadata-modal/image-metadata-modal.component';
import {CustomStepperComponent} from './custom-stepper/custom-stepper.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {YearQuarterFilterComponent} from './year-quarter-filter/year-quarter-filter.component';
import {CustomRatingComponent} from './custom-rating/custom-rating.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {DatPickerComponent} from './dat-picker/dat-picker.component';
import {TimePickerComponent} from './time-picker/time-picker.component';
import {RouterModule} from '@angular/router';
import {PreviewAnnualInitiativesBarComponent} from '../../views/planning-and-execution/components/preview-annual-initiatives-bar/preview-annual-initiatives-bar.component';
import {ThemePreviewSideBarComponent} from './theme-preview-side-bar/theme-preview-side-bar.component';
import {Ng5SliderModule} from 'ng5-slider';
import {ConfirmationDeleteDialogComponent} from './confirmation-delete-dialog/confirmation-delete-dialog.component';
import {ConfirmationApproveDialogComponent} from './confirmation-approve-dialog/confirmation-approve-dialog.component';


@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    PasswordStrengthMeterComponent,
    ProgressBarComponent,
    SwitchComponent,
    ProgressBarComponent,
    FileComponent,
    CardComponent,
    SelectComponent,
    NavAccordionComponent,
    NavAccordionDropdownComponent,
    NavAccordionHeaderComponent,
    NavAccordionItemComponent,
    TableHeaderDirective,
    TableDirective,
    TableComponent,
    TabComponent,
    TabsComponent,
    ConfirmationDialogComponent,
    DoughnutChartComponent,
    GoalCardComponent,
    IconComponent,
    UserCardComponent,
    DivisionCardComponent,
    MemberFilterDialogComponent,
    ProfileModalComponent,
    ImageMetadataModalComponent,
    CustomStepperComponent,
    YearQuarterFilterComponent,
    CustomRatingComponent,
    DatPickerComponent,
    TimePickerComponent,
    PreviewAnnualInitiativesBarComponent,
    ThemePreviewSideBarComponent,
    ConfirmationDeleteDialogComponent,
    ConfirmationApproveDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CdkTableModule,
    CdkStepperModule,
    NgxMaskModule.forRoot(),
    ImageCropperModule,
    RouterModule,
    Ng5SliderModule,
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    ProgressBarComponent,
    PasswordStrengthMeterComponent,
    FileComponent,
    SwitchComponent,
    CardComponent,
    SelectComponent,
    NavAccordionComponent,
    NavAccordionHeaderComponent,
    NavAccordionDropdownComponent,
    NavAccordionItemComponent,
    // TableDirective,
    TableComponent,
    TableHeaderDirective,
    DoughnutChartComponent,
    TabsComponent,
    TabComponent,
    IconComponent,
    UserCardComponent,
    DivisionCardComponent,
    MemberFilterDialogComponent,
    ProfileModalComponent,
    ImageMetadataModalComponent,
    CustomStepperComponent,
    YearQuarterFilterComponent,
    CustomRatingComponent,
    DatPickerComponent,
    TimePickerComponent,
    PreviewAnnualInitiativesBarComponent,
    ThemePreviewSideBarComponent,
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    MemberFilterDialogComponent,
    ProfileModalComponent,
    ImageMetadataModalComponent,
    ConfirmationDeleteDialogComponent,
    ConfirmationApproveDialogComponent,
  ]
})
export class ComponentsModule {
}
