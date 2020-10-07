import {NgModule} from '@angular/core';

import {CompanyProfileSettingRoutingModule} from './company-profile-setting-routing.module';
import {CompanyProfileSettingComponent} from './company-profile-setting.component';
import {SharedModule} from '../../shared/shared.module';
import {CompanyProfileComponent} from './components/company-profile/company-profile.component';
import {StructureComponent} from './components/structure/structure.component';
import {SecurityInvitesComponent} from './components/security-invites/security-invites.component';
import {BillingComponent} from './components/billing/billing.component';
import {CompanyMembersComponent} from './components/company-members/company-members.component';
import {InviteMembersComponent} from './components/invite-members/invite-members.component';
import {CompanyMissionValuesComponent} from './components/company-mission-values/company-mission-values.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {EmployeeListComponent} from './components/employee-list/employee-list.component';
import {ExtraInformationComponent} from './components/extra-information/extra-information.component';
import {AddLocationComponent} from './components/add-location/add-location.component';
import {AddDivisionComponent} from './components/add-division/add-division.component';
import {AddDepartmentComponent} from './components/add-department/add-department.component';
import {StructureColumnComponent} from './components/structure-column/structure-column.component';
import {StructureColumnLeadershipComponent} from './components/structure-column-leadership/structure-column-leadership.component';
import {StructureColumnDivisionComponent} from './components/structure-column-division/structure-column-division.component';
import {StructureColumnDepartmentComponent} from './components/structure-column-department/structure-column-department.component';
import {StructureColumnTeamComponent} from './components/structure-column-team/structure-column-team.component';
import {StructureColumnMemberComponent} from './components/structure-column-member/structure-column-member.component';
import {QuillModule} from 'ngx-quill';
import {NgxPayPalModule} from 'ngx-paypal';
import { EditMemberEmailComponent } from './components/security-invites/edit-member-email/edit-member-email.component';
import { EditMemberRoleComponent } from './components/security-invites/edit-member-role/edit-member-role.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ProfileImageEditComponent } from './components/profile-image-edit/profile-image-edit.component';

@NgModule({
  declarations: [CompanyProfileSettingComponent,
    CompanyProfileComponent,
    StructureComponent,
    SecurityInvitesComponent, BillingComponent,
    CompanyMembersComponent,
    InviteMembersComponent,
    CompanyMissionValuesComponent,
    ExtraInformationComponent,
    EmployeeListComponent,
    AddLocationComponent,
    AddDivisionComponent,
    AddDepartmentComponent,
    StructureColumnComponent,
    StructureColumnLeadershipComponent,
    StructureColumnDivisionComponent,
    StructureColumnDepartmentComponent,
    StructureColumnTeamComponent,
    StructureColumnMemberComponent,
    EditMemberEmailComponent,
    EditMemberRoleComponent,
    ProfileImageEditComponent,
    ],
  imports: [
    SharedModule,
    CompanyProfileSettingRoutingModule,
    ColorPickerModule,
    QuillModule.forRoot({}),
    NgxPayPalModule,
    ImageCropperModule,
  ],
  entryComponents: [InviteMembersComponent, EditMemberEmailComponent, EditMemberRoleComponent, AddLocationComponent,
    AddDivisionComponent, AddDepartmentComponent, ProfileImageEditComponent]
})
export class CompanyProfileSettingModule {
}
