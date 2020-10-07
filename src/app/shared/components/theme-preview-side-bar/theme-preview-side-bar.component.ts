import {Options} from 'ng5-slider';
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompanyProfileService} from 'src/app/views/company-profile-setting/services/company-profile.service';

@Component({
  selector: 'app-theme-preview-side-bar',
  templateUrl: './theme-preview-side-bar.component.html',
  styleUrls: ['./theme-preview-side-bar.component.scss'],
  providers: [NgbPopoverConfig]
})
export class ThemePreviewSideBarComponent implements OnInit {
  dateObj: number = Date.now();
  selectedPrincipleElement = null;

  @Input() show = false;
  @Output() wizardClosed = new EventEmitter<any>();

  value = 5;
  options: Options = {
    step: 5,
    floor: 10,
    ceil: 100,
  };

  principles: any = [];

  constructor(private companyProfileService: CompanyProfileService) {
  }

  ngOnInit() {
    this.getPrinciples();
  }

  getPrinciples = () => {
    this.companyProfileService.getPrinciples().subscribe(principleResponse => {
      this.principles = principleResponse;
      const totalValue = this.principles.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.value, 10), 0);
      this.value = Math.ceil(totalValue / 3);
    });
  };

  sidebarToggle() {
    this.show = !this.show;
    if (!this.show) {
      this.wizardClosed.emit();
    }
  }

  slideValueChanged = (slideValue, principle) => {
    if (principle && principle.id) {
      return this.companyProfileService.updatePrinciple(principle.id, {
        title: principle.title,
        description: principle.description,
        value: slideValue,
        company: principle.company,
      }).subscribe(() => this.getPrinciples());
    }
  };

  principleClicked = (principleId) => {
    this.selectedPrincipleElement = principleId;
  };

  getPopoverPlacement = () => {
    return window.innerWidth <= 1400 ? 'bottom' : 'left';
  }

  getPopoverContainer = () => {
    return window.innerWidth <= 1400 ? '' : 'body';
  }
}
