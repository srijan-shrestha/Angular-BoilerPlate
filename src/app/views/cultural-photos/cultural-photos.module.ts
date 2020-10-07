import {NgModule} from '@angular/core';

import {CulturalPhotosRoutingModule} from './cultural-photos-routing.module';
import {CulturalPhotosContainerComponent} from './cultural-photos-container/cultural-photos-container.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {PlaybooksWrapperModule} from '../playbooks/playbooks-wrapper.module';
import {CulturalPhotoEventDialogComponent} from './components/cultural-photo-event-dialog/cultural-photo-event-dialog.component';
import {CulturalPhotosStepperComponent} from './components/cultural-photos-stepper/cultural-photos-stepper.component';
import {CulturalSubmittedPhotosComponent} from './components/cultural-submitted-photos/cultural-submitted-photos.component';
import {AddToGalleryWizardComponent} from './components/add-to-gallery-wizard/add-to-gallery-wizard.component';
import {CulturalPhotosUploadComponent} from './components/cultural-photos-upload/cultural-photos-upload.component';
import {CulturalPhotosApproveComponent} from './components/cultural-photos-approve/cultural-photos-approve.component';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';


@NgModule({
  declarations: [CulturalPhotosContainerComponent, CulturalPhotoEventDialogComponent, CulturalPhotosStepperComponent,
    CulturalSubmittedPhotosComponent, AddToGalleryWizardComponent, CulturalPhotosUploadComponent, CulturalPhotosApproveComponent],
  imports: [
    SharedModule,
    CulturalPhotosRoutingModule,
    PlaybooksWrapperModule,
  ],
  entryComponents: [
    CulturalPhotoEventDialogComponent
  ],
  bootstrap: [CulturalPhotoEventDialogComponent]
})
export class CulturalPhotosModule {
}
