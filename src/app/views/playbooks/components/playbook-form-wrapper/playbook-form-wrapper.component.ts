import {Component, HostListener, OnInit} from '@angular/core';
import {PlaybookActiveFormService} from '../../services/playbook-active-form.service';
import {ActiveForm} from '../../models/active-form.model';

@Component({
  selector: 'app-playbook-form-wrapper',
  templateUrl: './playbook-form-wrapper.component.html',
  styleUrls: ['./playbook-form-wrapper.component.scss']
})
export class PlaybookFormWrapperComponent implements OnInit {
  activeForm: ActiveForm;
  sideIcon = true;
  sidebarFormCollapsed = false;
  showIcon = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.hideShowRightSidebar()
  }

  constructor(
    public playbookActiveFormService: PlaybookActiveFormService
  ) {
  }

  ngOnInit() {
    this.playbookActiveFormService.activeForm.subscribe((activeForm: ActiveForm) => {
      this.activeForm = activeForm;
      if (activeForm && activeForm.code) {
        this.showFormSidebar();
      }
    });
    this.hideShowRightSidebar();
  }

  toggleFormSidebar() {
    this.sidebarFormCollapsed = !this.sidebarFormCollapsed;
    this.sideIcon = !this.sideIcon;
  }

  hideShowRightSidebar() {
    if (window.innerWidth >= 1400) {
      this.sidebarFormCollapsed = false;
      this.sideIcon = true;
      this.showIcon = false;
    }
    if (window.innerWidth <= 1400) {
      this.sidebarFormCollapsed = true;
      this.sideIcon = false;
      this.showIcon = true;
    }
  }

  showFormSidebar() {
    this.sidebarFormCollapsed = false;
    this.sideIcon = true;
  }
}
