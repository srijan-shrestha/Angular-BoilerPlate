import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlaybookWrapperComponent} from './playbook-wrapper.component';
import {PlaybooksListComponent} from './components/playbooks-list/playbooks-list.component';
import {ThemesComponent} from './components/themes/themes.component';
import {PlaybookAppComponent} from './components/playbook-app/playbook-app.component';
import {AdminGuard} from '../../shared/guards/admin.guard';

const routes: Routes = [{
  path: '',
  component: PlaybookWrapperComponent,
  children: [
    {
      path: '',
      component: PlaybooksListComponent,
      canActivate: []
    },
    {
      path: 'editor',
      component: PlaybooksListComponent,
      canActivate: []
    },
    {
      path: 'themes',
      component: ThemesComponent,
      canActivate: [AdminGuard]
    },
    {
      path: ':playbookId',
      component: PlaybookAppComponent,
      canActivate: [AdminGuard]
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaybooksWrapperRoutingModule {
}
