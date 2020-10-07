import { NgModule } from '@angular/core';

import { ProfileSettingRoutingModule } from './profile-setting-routing.module';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ProfileSettingComponent } from './profile-setting.component';
import { SecurityLoginComponent } from './components/security-login/security-login.component';
import { PreferenceSettingComponent } from './components/preference-setting/preference-setting.component';
import { SharedModule } from '../../shared/shared.module';
import {ColorPickerModule} from 'ngx-color-picker';
import { QuillModule } from 'ngx-quill';
import { ProfileImageEditComponent } from './components/profile-image-edit/profile-image-edit.component';
import { ImageCropperModule } from 'ngx-image-cropper';
// import { SidebarComponent } from 'src/app/shared/layouts/sidebar/sidebar.component';


@NgModule({
  declarations: [
    MyProfileComponent,
    ProfileSettingComponent,
    SecurityLoginComponent,
    PreferenceSettingComponent,
    ProfileImageEditComponent,
    // SidebarComponent
  ],
  imports: [
    SharedModule,
    ProfileSettingRoutingModule,
    ColorPickerModule,
    QuillModule.forRoot({}),
    ImageCropperModule
  ],
  entryComponents: [
    ProfileImageEditComponent
  ]
})
export class ProfileSettingModule { }
