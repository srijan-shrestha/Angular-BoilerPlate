import { Component } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { WorkspaceService } from './shared/services/workspace.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Blaast';

  constructor(
    platformLocation: PlatformLocation,
    workspaceService: WorkspaceService,
  ) {
    const workspaceName = workspaceService.extractWorkspace((platformLocation as any).location.host);
    workspaceService.setData({
      name: workspaceName
    });
  }
}
