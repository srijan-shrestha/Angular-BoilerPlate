import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CreateThemeComponent} from '../create-theme/create-theme.component';

@Component({
  selector: 'app-preview-theme',
  templateUrl: './preview-theme.component.html',
  styleUrls: ['./preview-theme.component.scss']
})
export class PreviewThemeComponent implements OnInit, OnChanges {

  @Input() theme;
  @Input() showPreview;
  @Input() annualTheme;
  @Input() companyName;
  @Input() quarterlyTheme;
  @Input() currentFormGroup;
  @Input() currentlySelectedView;
  @Input() currentlySelectedYear;
  @Input() yearsToDisplay;

  @Output() published = new EventEmitter();
  @Output() editClicked = new EventEmitter();
  @Output() yearChanged = new EventEmitter();
  @Output() savedAsDraft = new EventEmitter();

  companySubTitle = null;
  quarterlyThemeTitle = '';
  updatedAnnualThemes = null;
  updatedQuarterlyTheme: any = [];
  allowEdit = false;
  updatedCurrentYear = null;

  constructor(public createThemeComponent: CreateThemeComponent) {
  }

  ngOnInit(): void {
    this.updatedCurrentYear = this.currentlySelectedYear || this.yearsToDisplay[0];
    this.setOtherData();
  }

  setOtherData = () => {
    this.updatedAnnualThemes = this.annualTheme;
    this.updatedQuarterlyTheme = this.quarterlyTheme;
    this.quarterlyThemeTitle = '';
    if (this.annualTheme) {
      this.quarterlyThemeTitle = this.annualTheme.year + ' QUARTERLY THEMES';
      this.companySubTitle = `${this.companyName} - ${this.annualTheme.year} ${this.annualTheme.type} theme`;
    }
    return false;
  };

  shouldShowTheme = () => this.showPreview ||
    (this.currentlySelectedView === 'preview-annual' && this.updatedAnnualThemes && this.updatedAnnualThemes.status === 'published') ||
    (this.currentlySelectedView === 'preview-quarterly' && this.updatedQuarterlyTheme && this.updatedQuarterlyTheme.status === 'published');

  edit = () => {
    this.allowEdit = true;
    this.editClicked.emit();
  };

  // @ts-ignore
  blurDynamically = () => setTimeout(() => [...document.getElementsByClassName('preview-action-buttons')]
    .forEach(elem => elem.blur()), 1000);

  save = () => {
    this.savedAsDraft.emit({currentFormGroup: this.currentFormGroup});
    this.blurDynamically();
  };

  publish = (type = this.currentlySelectedView) => {
    this.published.emit({type});
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.setOtherData();
    this.updatedCurrentYear = this.currentlySelectedYear;
  }

  currentThemeYearChanged = (year) => {
    this.updatedCurrentYear = year;
    this.yearChanged.emit({year});
  };

  isPreviewPage = (): boolean => this.currentlySelectedView === 'preview-annual' || this.currentlySelectedView === 'preview-quarterly';

  isThemeDraft = (): boolean => {
    if (this.currentlySelectedView === 'annual' || this.currentlySelectedView === 'preview-annual') {
      return this.updatedAnnualThemes && this.updatedAnnualThemes.status !== 'published';
    }

    if (this.currentlySelectedView === 'quarterly' || this.currentlySelectedView === 'preview-quarterly') {
      return this.updatedQuarterlyTheme && this.updatedQuarterlyTheme.status !== 'published';
    }
  }
}
