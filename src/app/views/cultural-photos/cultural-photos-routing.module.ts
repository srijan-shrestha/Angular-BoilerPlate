import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CulturalPhotosContainerComponent} from './cultural-photos-container/cultural-photos-container.component';
import {CulturalPhotosUploadComponent} from './components/cultural-photos-upload/cultural-photos-upload.component';
import {CulturalPhotosApproveComponent} from './components/cultural-photos-approve/cultural-photos-approve.component';
import {CulturalSubmittedPhotosComponent} from './components/cultural-submitted-photos/cultural-submitted-photos.component';


const routes: Routes = [{
  path: '',
  component: CulturalPhotosContainerComponent,
  children: [
    {path: '', redirectTo: 'upload', pathMatch: 'full'},
    {
      path: 'upload',
      component: CulturalPhotosUploadComponent
    },
    {
      path: 'approve',
      component: CulturalPhotosApproveComponent
    },
    {
      path: 'submitted',
      component: CulturalSubmittedPhotosComponent
    },
  ]
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CulturalPhotosRoutingModule {
}
