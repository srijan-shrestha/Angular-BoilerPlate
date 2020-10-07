import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuillModule} from 'ngx-quill';

import {CompanyRoutingModule} from './company-routing.module';
import {LetterToEditorComponent} from './components/letter-to-editor/letter-to-editor.component';
import {CompanyContainerComponent} from './company-container/company-container.component';
import {SharedModule} from '../../shared/shared.module';
import {EmployeeDirectoryComponent} from './components/employee-directory/employee-directory.component';
import { MissionValuesComponent } from './components/mission-values/mission-values.component';
import { InviteMembersComponent } from '../company-profile-setting/components/invite-members/invite-members.component';
import { CompanyProfileSettingModule } from '../company-profile-setting/company-profile-setting.module';
import { CompanyFormWrapperComponent } from './components/company-form-wrapper/company-form-wrapper.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AnnualGoalsComponent } from './components/annual-goals/annual-goals.component';
import { BlankComponent } from './components/blank/blank.component';
import {CreateThemeComponent} from './components/create-theme/create-theme.component';
import {PreviewThemeComponent} from './components/preview-theme/preview-theme.component';
import {SelectVisualMarkComponent} from './components/select-visual-mark/select-visual-mark.component';
import {AnnualGoalDetailComponent} from './components/annual-goal-detail/annual-goal-detail.component';
import {AnnualGoalCreateComponent} from './components/annual-goal-create/annual-goal-create.component';

@NgModule({
  declarations: [
    LetterToEditorComponent,
    CompanyContainerComponent,
    EmployeeDirectoryComponent,
    MissionValuesComponent,
    CompanyFormWrapperComponent,
    AnnualGoalsComponent,
    BlankComponent,
    CreateThemeComponent,
    PreviewThemeComponent,
    AnnualGoalCreateComponent,
    SelectVisualMarkComponent,
    AnnualGoalDetailComponent,
    ],
  imports: [
    CommonModule,
    SharedModule,
    CompanyRoutingModule,
    CompanyProfileSettingModule,
    QuillModule.forRoot({}),
    ScrollingModule
  ],
  entryComponents: [InviteMembersComponent],
})
export class CompanyModule { }
