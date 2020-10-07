import {Location} from '@angular/common';
import {Component, OnInit, TemplateRef, ViewChild, OnDestroy, ChangeDetectorRef, AfterContentChecked} from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ThemePreviewSideBarComponent} from '../../../../shared/components/theme-preview-side-bar/theme-preview-side-bar.component';
import {CompanyService} from '../../services/company.service';
import {ToastrService} from 'ngx-toastr';
import {FullComponent} from '../../../../shared/layouts/full/full.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../../../shared/services/auth.service';
import {PdfPrintService} from '../../../../shared/services/pdf-print.service';
import {CompanyProfileService} from '../../../company-profile-setting/services/company-profile.service';
import uniq from 'lodash/uniq';

@Component({
  selector: 'app-create-theme',
  templateUrl: './create-theme.component.html',
  styleUrls: ['./create-theme.component.scss']
})
export class CreateThemeComponent implements OnInit, OnDestroy, AfterContentChecked {
  show = false;
  currentlyEditing = null;
  selectedTheme = 'annual';
  annualThemeFormGroup = null;
  quarterlyThemeFormGroup = null;
  quarterlyThemeFormGroupToPublish = null;
  currentTheme: any = null;
  currentSelectedYear = 2020;
  companyName = null;
  ANNUAL_THEME_FORM = 'annual';
  QUARTERLY_THEME_FORM = 'quarterly';
  annualYearListing = [];
  quarterlyYearListing = [];
  showPreview = false;
  mobileMenuName = 'Select Menu';
  currentFormGroup = null;
  shouldShowEditButtons = false;
  eventSubscriber = null;
  yearsToDisplay = [];
  annualTheme = null;
  quarterlyTheme = null;
  isAdmin = false;
  publishedAnnualYearList = [];
  publishedQuarterlyYearList = [];

  @ViewChild('publishContent', {static: false}) publishContent: TemplateRef<any>;
  @ViewChild(ThemePreviewSideBarComponent, {static: false}) child: ThemePreviewSideBarComponent;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private companyService: CompanyService,
    private toasterService: ToastrService,
    private fullComponent: FullComponent,
    private ngbModal: NgbModal,
    public authService: AuthService,
    private pdfPrintService: PdfPrintService,
    private companyProfileService: CompanyProfileService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  quarterlyThemeDataObject = (id = null, title: string = '', description: string = '', viewable = false) => this.formBuilder
    .group({
      id: new FormControl(id),
      title: new FormControl(title),
      description: new FormControl(description),
      viewable: new FormControl(viewable, Validators.required)
    });

  quarterlyPublishThemeDataObject = (id = null, title = null, description = null, viewable = null) => this.formBuilder
    .group({
      id: new FormControl(id),
      year: new FormControl(this.currentSelectedYear),
      title: new FormControl(title),
      description: new FormControl(description),
      viewable: new FormControl(viewable, Validators.required)
    });

  getQuarterlyFormArray = (): FormArray => this.quarterlyThemeFormGroup.controls.details.controls as FormArray;

  getQuarterlyFormArrayToPublish = (): FormArray => this.quarterlyThemeFormGroupToPublish.controls.details.controls as FormArray;

  ngOnInit() {
    this.setSelectedTheme();
    this.initializeAnnualThemeForm();
    this.initializeQuarterlyThemeForm();
    this.eventSubscriber = this.router.events.subscribe(event => this.respondRouterEventsChanges(event));
    this.setCompanyName();
    this.setYearAndOtherData(true, true);
    this.setSelectedMenuItem();
    this.setDynamicCurrentFormGroup();
    this.prepareCreatePreviewPage();
    this.setIsAdmin();
    this.navigateToRespectiveThemeCreatePage();
  }

  initializeAnnualThemeForm = () => {
    this.annualThemeFormGroup = this.formBuilder.group({
      id: new FormControl(null),
      year: new FormControl(this.currentSelectedYear, Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  };

  setIsAdmin = () => {
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  };

  setCompanyName = () => {
    if (!this.fullComponent.child) {
      this.companyProfileService.getCompanyProfile().subscribe(({name}) => {
        this.companyName = name;
      });
    } else {
      this.companyName = this.fullComponent.child.companyName;
    }
  };

  isCreatePreviewPage = () => this.getCurrentUrl().includes('create-preview');

  prepareCreatePreviewPage = () => {
    if (this.isCreatePreviewPage()) {
      this.showPreview = true;
      this.shouldShowEditButtons = true;
    }

    if (this.isPreviewSelected()) {
      this.showPreview = true;
    }
  };

  onYearChange = (updatedCurrentYear) => {
    if (updatedCurrentYear !== this.currentSelectedYear) {
      this.currentSelectedYear = updatedCurrentYear;
      if (this.getCurrentThemeYear()) {
        this.location.replaceState(`company/${this.selectedTheme}/themes/create`);
      }
      this.findCurrentThemeAndPrepareForm(this.selectedTheme, this.currentSelectedYear);
    }
  };

  setDynamicCurrentFormGroup = () => {
    if (this.selectedTheme === this.ANNUAL_THEME_FORM) {
      this.currentFormGroup = this.annualThemeFormGroup;
    }
    if (this.selectedTheme === this.QUARTERLY_THEME_FORM) {
      this.currentFormGroup = this.quarterlyThemeFormGroup;
    }
  };

  populateAnnualAndQuarterlyTheme = () => {
    if (this.isViewAnnualThemeSelected() || this.isAnnualThemeSelected()) {
      this.annualTheme = this.currentTheme;
      if (this.annualTheme) {
        this.currentSelectedYear = this.annualTheme.year;
      }
    }

    if (this.isViewQuarterlyThemeSelected() || this.isQuarterlyThemeSelected()) {
      this.quarterlyTheme = this.currentTheme;
      if (this.quarterlyTheme) {
        this.currentSelectedYear = this.quarterlyTheme.year;
      }
      this.findCurrentTheme('annual', true, this.currentSelectedYear)
        .subscribe(annualThemeResponse => {
          this.annualTheme = annualThemeResponse;
        });
    }
  };

  findCurrentThemeAndPrepareForm = (themeType = 'annual', year = null, prepareForm = true) => {
    const apiCall = this.findCurrentTheme(themeType, true, year);
    if (apiCall) {
      apiCall.subscribe((theme) => {
        this.currentTheme = theme;
        this.populateAnnualAndQuarterlyTheme();

        if (prepareForm) {
          this.prepareThemeForm(themeType);
        }
      });
    } else {
      this.setDynamicHeightWhenNoQuarterlyThemeDatesAreFound();
    }
  };

  setDynamicHeightWhenNoQuarterlyThemeDatesAreFound = () => {
    if (this.isQuarterlyThemeSelected() && this.quarterlyThemeFormGroup.controls) {
      this.quarterlyThemeFormGroup.controls.details.controls.forEach((control, index) => this.setDynamicHeightForQuarterlyTheme(index));
    }
  };

  setSelectedTheme = (theme?) => {
    if (theme) {
      this.selectedTheme = theme;
      return;
    }

    const {theme_type, type} = this.getActivatedRouteParams();
    if (type === 'create' || type === 'create-preview') {
      this.selectedTheme = theme_type;
    }
    if (type === 'preview-annual' || type === 'preview-quarterly') {
      this.selectedTheme = type;
    }
  };

  toggle = () => this.show = !this.show;

  initializeQuarterlyThemeForm = (defaultYear = 2020) => {
    this.quarterlyThemeFormGroup = this.formBuilder.group(({
      year: new FormControl(defaultYear, Validators.required),
      details: this.formBuilder.array([
        this.quarterlyThemeDataObject(), this.quarterlyThemeDataObject(),
        this.quarterlyThemeDataObject(), this.quarterlyThemeDataObject()
      ]),
    }));
  };

  navigated = (selectedTheme) => {
    this.selectedTheme = selectedTheme;
    let url = '';
    if (this.selectedTheme === this.ANNUAL_THEME_FORM || this.selectedTheme === this.QUARTERLY_THEME_FORM) {
      this.showPreview = false;
      url = `/company/${this.selectedTheme}/themes/create`;
      this.router.navigate([url]).then(() => {
        this.prepareCreatePreviewPage();
        this.setYearAndOtherData(true, true);
      });
      this.shouldShowEditButtons = false;
    }

    if (this.selectedTheme === 'preview-annual' || this.selectedTheme === 'preview-quarterly') {
      const themeType = this.selectedTheme === 'preview-annual' ? 'annual' : 'quarterly';
      const queryParams = this.shouldHideCreateLinks() ? {hdc: true} : {};
      url = `/company/${themeType}/themes/${this.selectedTheme}`;
      this.router.navigate([url], {queryParams}).then(() => {
        this.prepareCreatePreviewPage();
        this.setYearAndOtherData(true, true);
      });
    }
    this.setSelectedMenuItem();
  };

  respondRouterEventsChanges = (event): void => {
    // This is done since the router navigate was not being fired while navigating through the child component.
    if (this.shouldHideCreateLinks() && (event instanceof NavigationEnd || event.navigationTrigger === 'popstate')) {
      this.navigated(event.url.split('/')[4].split('?')[0]);
    }

    if (
      (event instanceof NavigationEnd && this.isAnnualThemeSelected()) ||
      (event instanceof NavigationEnd && this.isQuarterlyThemeSelected())
    ) {
      if (!this.isCreatePreviewPage() && !this.isAnnualThemePreviewSelected() && !this.isQuarterlyThemePreviewSelected()) {
        this.navigated(event.url.split('/')[2]);
      }
    }

    if (event.navigationTrigger === 'popstate') {
      if (this.isAnnualThemePreviewSelected() || this.isQuarterlyThemePreviewSelected()) {
        const previewType = this.isAnnualThemePreviewSelected() ? 'preview-annual' : 'preview-quarterly';
        this.setSelectedTheme(previewType);
        this.showPreview = true;
        this.navigated(previewType);
      }
      this.navigateToRespectiveThemeCreatePage();
      if (this.isCreateAnnualThemeSelected() || this.isQuarterlyThemeSelected()) {
        this.setSelectedTheme(this.isCreateAnnualThemeSelected() ? 'annual' : 'quarterly');
        this.showPreview = false;
        this.setYearAndOtherData();
        this.conditionallyResetThemeForm();
      }
    }
  };

  conditionallyResetThemeForm = () => {
    if (this.isQuarterlyThemeSelected() && !this.quarterlyYearListing.includes(this.currentSelectedYear)) {
      this.initializeQuarterlyThemeForm();
    }

    if (this.isAnnualThemeSelected() && !this.annualYearListing.includes(this.currentSelectedYear)) {
      this.initializeAnnualThemeForm();
    }
  };

  navigateToRespectiveThemeCreatePage = () => {
    if (this.isAnnualCreatePreviewSelected() || this.isQuarterlyCreatePreviewSelected()) {
      const themeType = this.isAnnualCreatePreviewSelected() ? this.ANNUAL_THEME_FORM : this.QUARTERLY_THEME_FORM;
      this.router.navigate([`company/${themeType}/themes/create`]).then(() => {
        this.showPreview = false;
        this.selectedTheme = themeType;
      });
    }
  };

  // @ts-ignore
  getActivatedRouteParams = () => this.activatedRoute.params.getValue();

  edited = (id: number) => {
    this.currentlyEditing = id;
  };

  isAnnualThemeSelected = (): boolean => {
    const isCreateAnnualThemeSelected = this.selectedTheme === 'annual' || this.isCreateAnnualThemeSelected();
    if (isCreateAnnualThemeSelected) {
      this.setSelectedTheme(this.ANNUAL_THEME_FORM);
    }
    return isCreateAnnualThemeSelected;
  };

  isQuarterlyThemeSelected = (): boolean => {
    const isQuarterlyCreateThemeSelected =
      this.selectedTheme === 'quarterly' || this.getCurrentUrl().includes('company/quarterly/themes/create');
    if (isQuarterlyCreateThemeSelected) {
      this.setSelectedTheme(this.QUARTERLY_THEME_FORM);
      this.showPreview = this.isQuarterlyCreatePreviewSelected();
    }
    return isQuarterlyCreateThemeSelected;
  };

  getCurrentUrl = (): string => window.location.href;

  isViewAnnualThemeSelected = (): boolean => {
    return this.getCurrentUrl().includes('company/annual/themes/preview-annual');
  };

  isCreateAnnualThemeSelected = (): boolean => {
    const isCreateAnnualThemeFormSelected = this.getCurrentUrl().includes('company/annual/themes/create');
    if (isCreateAnnualThemeFormSelected) {
      this.setSelectedTheme(this.ANNUAL_THEME_FORM);
      this.showPreview = false;
    }
    return isCreateAnnualThemeFormSelected;
  };

  isAnnualCreatePreviewSelected = (): boolean => {
    return this.getCurrentUrl().includes('company/annual/themes/create-preview');
  };

  isQuarterlyCreatePreviewSelected = (): boolean => {
    return this.getCurrentUrl().includes('company/quarterly/themes/create-preview');
  };

  isAnnualThemePreviewSelected = (): boolean => {
    return this.getCurrentUrl().includes('company/annual/themes/preview-annual');
  };

  isQuarterlyThemePreviewSelected = (): boolean => {
    return this.getCurrentUrl().includes('company/quarterly/themes/preview-quarterly');
  };

  isPreviewSelected = (): boolean => {
    const type = this.getActivatedRouteParams().type;
    return type === 'preview-annual' || type === 'preview-quarterly';
  };

  isViewQuarterlyThemeSelected = (): boolean => this.selectedTheme === 'preview-quarterly' && this.isQuarterlyThemePreviewSelected();

  setSelectedMenuItem() {
    if (this.selectedTheme === 'annual' || this.selectedTheme === 'preview-annual') {
      this.mobileMenuName = 'Annual';
    }

    if (this.selectedTheme === 'quarterly' || this.selectedTheme === 'preview-quarterly') {
      this.mobileMenuName = 'Quarterly';
    }
  }

  preparePayload = (status) => {
    let payload = {};
    let selectedForm = null;
    if (this.isAnnualThemeSelected() || this.isViewAnnualThemeSelected()) {
      const annualThemeFormValues = this.annualThemeFormGroup.value;
      payload = {
        status,
        type: 'annual',
        year: annualThemeFormValues.year,
        published_at: null,
        details: [{
          id: annualThemeFormValues.id,
          title: annualThemeFormValues.title,
          description: annualThemeFormValues.description
        }],
      };
      selectedForm = 'annual-theme-form';
    } else {
      payload = {
        status,
        type: 'quarterly',
        published_at: null,
        id: this.quarterlyThemeFormGroup.value.id,
        year: this.quarterlyThemeFormGroup.value.year,
        details: this.quarterlyThemeFormGroup.value.details,
      };
      selectedForm = 'quarterly-theme-form';
    }
    return {payload, selectedForm};
  };

  submit = (status): any => {
    const {payload, selectedForm} = this.preparePayload(status);
    if (document.getElementById(selectedForm)) {
      document.getElementById(selectedForm).querySelectorAll('input,textarea').forEach(element => {
        // @ts-ignore
        element.focus();
        // @ts-ignore
        element.blur();
      });
    }
    if (status === 'preview') {
      this.showPreview = true;
      if (this.isAnnualThemeSelected()) {
        this.yearsToDisplay = uniq(this.annualYearListing);
      }

      if (this.isQuarterlyThemeSelected()) {
        this.yearsToDisplay = uniq(this.quarterlyYearListing);
      }
      this.shouldShowEditButtons = true;
    }
    this.save(payload, status);
  };

  save = (payload, status) => {
    this.setDynamicCurrentFormGroup();
    if (this.currentFormGroup.valid || this.isViewAnnualThemeSelected()) {
      this.companyService.saveCompanyThemes(payload).subscribe((newlySavedTheme: any) => {
        this.toasterService.success('Company theme saved.', '', {timeOut: 800});
        this.currentTheme = newlySavedTheme;
        this.annualTheme = newlySavedTheme;
        this.redirectConditionally(newlySavedTheme, status);
        if (this.isQuarterlyThemeSelected()) {
          this.findCurrentThemeAndPrepareForm(this.selectedTheme);
        }
      });
    }
  };

  redirectConditionally = (newlySavedTheme, status) => {
    if (status === 'published') {
      this.selectedTheme = this.isAnnualThemeSelected() ? 'preview-annual' : 'preview-quarterly';
      this.router.navigate([`company/annual/themes/preview-annual`]).then(() => {
        this.showPreview = true;
        this.setYearAndOtherData();
      });
    }
    if (status === 'draft' && !this.isCreatePreviewPage()) {
      this.showPreview = false;
    }

    if (status === 'preview') {
      this.router.navigate([`company/${this.selectedTheme}/themes/create-preview`]).then(() => {});
    }
  };

  isThemeCreationPage = () => window.location.href.includes('create');

  // @ts-ignore
  getCurrentThemeYear = () => this.activatedRoute.params.value.theme_id || this.activatedRoute.params.value.theme_year;

  findCurrentTheme = (themeType = 'annual', findByQueryParams = true, year = null) => {
    let dynamicApiCall = null;
    const queryParams = {
      year: year || this.getCurrentThemeYear() || (this.currentSelectedYear ? this.currentSelectedYear : 2020),
      type: (themeType === 'annual' || themeType === 'preview-annual') ? 'annual' : 'quarterly',
    };
    if (this.currentSelectedYear) {
      if (findByQueryParams || this.isThemeCreationPage()) {
        dynamicApiCall = this.companyService.findCompanyThemes(queryParams);
      } else {
        dynamicApiCall = this.companyService.findCompanyThemes(queryParams, this.getCurrentThemeYear());
      }
    }
    return dynamicApiCall;
  };

  prepareThemeForm = (themeType) => {
    const companyTheme = this.currentTheme;
    if (companyTheme) {
      if (themeType === this.ANNUAL_THEME_FORM) {
        const details = companyTheme.details[0];
        this.annualThemeFormGroup.setValue(
          {id: details.id, title: details.title, year: companyTheme.year, description: details.description}
        );
        // Done to make the text area scroll height automatic for annual theme.
        setTimeout(() => {
          if (document.getElementById('annual_theme_title')) {
            document.getElementById('annual_theme_title').click();
            document.getElementById('annual_theme_description').click();
          }
        });
      }
      if (themeType === this.QUARTERLY_THEME_FORM) {
        this.initializeQuarterlyThemeForm(this.currentSelectedYear);
        companyTheme.details.forEach((detail, index) => {
          this.quarterlyThemeFormGroup.controls.details.controls[index]
            .setValue({id: detail.id, title: detail.title, description: detail.description, viewable: detail.viewable});
          this.setDynamicHeightForQuarterlyTheme(index);
        });
      }
      // This handles a case when the user navigates through the back button and come to the same place from the url.
      // If the user happens to open up the form for already published we simply navigate resulting in initiating the component.
      if (
        companyTheme.status === 'published' &&
        (this.selectedTheme === this.ANNUAL_THEME_FORM || this.selectedTheme === this.QUARTERLY_THEME_FORM)) {
        this.router.navigate([`/company/${this.selectedTheme}/themes/create`]).then();
      }
    } else {
      if (themeType === this.ANNUAL_THEME_FORM) {
        this.annualThemeFormGroup.setValue({id: '', title: '', year: this.currentSelectedYear, description: ''});
      }
      if (themeType === 'quarterly') {
        this.initializeQuarterlyThemeForm(this.currentSelectedYear);
        this.quarterlyThemeFormGroup.controls.details.controls.forEach((control, index) => this.setDynamicHeightForQuarterlyTheme(index));
      }
    }
  };

  setDynamicHeightForQuarterlyTheme = (quarterIndex) => {
    // Done to make the text area scroll height automatic for quarterly theme.
    setTimeout(() => {
      if (document.getElementById(`quarterly_theme_description_${quarterIndex}`)) {
        document.getElementById(`quarterly_theme_description_${quarterIndex}`).click();
        document.getElementById(`quarterly_theme_title${quarterIndex}`).click();
      }
    });
  };

  preview = () => {
    this.showPreview = true;
  };


  edit = () => {
    this.selectedTheme = this.selectedTheme === 'preview-annual' ? 'annual' : 'quarterly';
  };

  wizardClosed = () => this.show = false;

  deleteQuarterlyTheme = (themeIndex) => {
    this.quarterlyThemeFormGroup.controls.details.removeAt(themeIndex);
    this.quarterlyThemeFormGroup.controls.details.push(
      this.quarterlyThemeDataObject(null, '', '', false)
    );
  };

  duplicateQuarterlyTheme = (themeIndex): void => {
    const emptyQuarterSlotIndex = this.quarterlyThemeFormGroup.controls.details.controls.findIndex((quarterControl) => {
      return !quarterControl.value.description && !quarterControl.value.title;
    });
    if (emptyQuarterSlotIndex === -1) {
      this.toasterService.error('There needs to be at least one empty slot without title and description.');
      return;
    }
    const themeValue = this.getQuarterlyFormArray()[themeIndex].value;
    this.quarterlyThemeFormGroup.controls.details.controls[emptyQuarterSlotIndex]
      .patchValue({
        id: null,
        title: themeValue.title,
        viewable: themeValue.viewable,
        description: themeValue.description,
      });
  };

  exportPdf = () => {
    const type = (this.selectedTheme === 'annual' || this.selectedTheme === 'preview-annual') ? 'ANNUAL_THEME' :
      'QUARTERLY_THEME';
    return this.pdfPrintService.getPdf(type, this.annualTheme.id).subscribe(pdf => {
      const link = document.createElement('a');
      link.href = 'data:application/pdf;base64,' + pdf;
      link.download = 'REPORT.pdf';
      document.body.appendChild(link);
      link.click();
    }, error => {
      console.log('Error => ', error);
      this.toasterService.error('Error generating pdf', 'Error');
    });
  };

  print = () => this.pdfPrintService.printWindow('previewElement');

  initializeQuarterlyThemeToPublish = () => {
    this.quarterlyThemeFormGroupToPublish = this.formBuilder.group(({
      details: this.formBuilder.array([
        this.quarterlyPublishThemeDataObject(), this.quarterlyPublishThemeDataObject(),
        this.quarterlyPublishThemeDataObject(), this.quarterlyPublishThemeDataObject()
      ]),
    }));
    this.quarterlyThemeFormGroup.controls.details.controls.forEach((formControl, index) => {
      this.quarterlyThemeFormGroupToPublish.controls.details.controls[index]
        .setValue({
          id: formControl.value.id,
          title: formControl.value.title,
          year: this.currentSelectedYear,
          viewable: formControl.value.viewable,
          description: formControl.value.description,
        });
    });
  };

  open(content) {
    if ((this.isQuarterlyThemeSelected() || this.isViewQuarterlyThemeSelected()) && this.getQuarterlyFormArray().length < 4) {
      this.toasterService.error('At least 4 quarterly themes are required.');
      return false;
    }

    if (this.isQuarterlyThemeSelected()) {
      this.initializeQuarterlyThemeToPublish();
    }
    this.ngbModal.open(content, {centered: true, windowClass: 'theme-publish-modal'})
      .result.then((result) => {
      if (result === 'confirm-quarterly') {
        this.companyService.updateCompanyThemes(this.quarterlyThemeFormGroupToPublish.value.details)
          .subscribe((newlySavedQuarterlyTheme) => {
            this.setSelectedTheme('preview-quarterly');
            this.currentTheme = newlySavedQuarterlyTheme;
            this.quarterlyTheme = newlySavedQuarterlyTheme;
            this.toasterService.success('Quarterly Theme Updated.');
            this.router.navigate([`company/quarterly/themes/preview-quarterly`]).then(() => {
              this.showPreview = true;
              this.setYearAndOtherData();
            });
          });
      }

      if (result === 'confirm-annual') {
        this.submit('published');
      }
    }, () => {});
  }

  saveClickedFromDraft = (event) => {
    const {payload, selectedForm} = this.preparePayload('draft');
    this.save(payload, status);
  };

  published = (event) => this.open(this.publishContent);

  setYearAndOtherData = (resetThemeValue = false, shouldPrepareThemeForm = false) => {
    this.publishedQuarterlyYearList = [];
    this.publishedAnnualYearList = [];
    let annualThemes = [];
    const availableYears = [2020, 2021, 2022, 2023, 2024, 2025];
    this.companyService.getCompanyThemes().subscribe((companyThemes: any) => {
      annualThemes = companyThemes;
      this.annualYearListing = availableYears
        .filter(year => {
          const companyTheme = companyThemes.find(theme => (theme.year === year && theme.type === this.ANNUAL_THEME_FORM));
          if (!companyTheme) {
            return true;
          } else {
            const companyThemeIsNotPublished = companyTheme.type === this.ANNUAL_THEME_FORM && companyTheme.status !== 'published';
            if (!companyThemeIsNotPublished) {
              this.publishedAnnualYearList.push(companyTheme.year);
            }
            return companyThemeIsNotPublished;
          }
        }).sort();

      this.quarterlyYearListing = availableYears
        .filter(year => {
          const companyTheme = companyThemes.find(theme => (theme.year === year && theme.type === this.QUARTERLY_THEME_FORM));
          if (!companyTheme) {
            return true;
          } else {
            const companyThemeIsNotPublished = companyTheme.type === this.QUARTERLY_THEME_FORM && companyTheme.status !== 'published';
            if (!companyThemeIsNotPublished) {
              this.publishedQuarterlyYearList.push(companyTheme.year);
            }
            const someDetailIsUnviewable = companyTheme.details.some(detail => detail.viewable === false);
            return companyThemeIsNotPublished || someDetailIsUnviewable;
          }
        })
        .filter(year => {
          return !!annualThemes.find(theme => theme.year === year && (theme.status === 'draft' || theme.status === 'published'));
        })
        .sort();
      this.setOtherData(resetThemeValue, shouldPrepareThemeForm);
    });
  };

  setOtherData = (resetThemeValue, shouldPrepareThemeForm) => {
    this.setYearsToDisplay();
    this.setCurrentSelectedYear(resetThemeValue, shouldPrepareThemeForm);
    this.conditionallyResetThemeForm();
  };

  setYearsToDisplay = () => {
    if (this.isPreviewSelected()) {
      if (this.isAnnualThemePreviewSelected()) {
        this.yearsToDisplay = uniq(this.publishedAnnualYearList);
      }
      if (this.isViewQuarterlyThemeSelected()) {
        this.yearsToDisplay = uniq(this.publishedQuarterlyYearList);
      }
    } else {
      if (this.isAnnualThemeSelected() || this.isAnnualThemeSelected()) {
        this.yearsToDisplay = uniq(this.annualYearListing);
      }

      if (this.isQuarterlyThemeSelected()) {
        this.yearsToDisplay = uniq(this.quarterlyYearListing);
      }
    }
  };

  setCurrentSelectedYear = (resetThemeValue = false, shouldPrepareThemeForm = false) => {
    const previouslySelectedYear = this.currentSelectedYear;
    if (!this.yearsToDisplay.includes(this.currentSelectedYear)) {
      this.currentSelectedYear = this.yearsToDisplay[0];
    }
    if (shouldPrepareThemeForm || (resetThemeValue || !this.yearsToDisplay.includes(previouslySelectedYear))) {
      this.findCurrentThemeAndPrepareForm(this.selectedTheme);
    }
    if (!this.yearsToDisplay.includes(previouslySelectedYear)) {
      this.annualTheme = null;
      this.quarterlyTheme  = null;
    }
  };

  editClicked() {
    this.showPreview = false;
    this.shouldShowEditButtons = true;
    this.router.navigate([`/company/${this.selectedTheme}/themes/create`]).then(() => {
      this.findCurrentThemeAndPrepareForm(this.selectedTheme);
    });
  }

  yearChanged({year}) {
    this.currentSelectedYear = year;
    this.findCurrentThemeAndPrepareForm(this.selectedTheme, this.currentSelectedYear, false);
  }

  shouldHideCreateLinks = () => window.location.href.includes('hdc');

  shouldShowDotMenu = (themeIndex) => {
    return (this.getQuarterlyFormArray()[themeIndex].value.title) || (this.getQuarterlyFormArray()[themeIndex].value.description);
  };

  shouldDisableQuarterlyThemeForm = (): boolean => {
    return !(this.currentSelectedYear &&
      this.quarterlyThemeFormGroup.value.details.some(themeValue => (themeValue.title.trim() || themeValue.description.trim())));
  };

  auto_grow(elementId) {
    const textArea = document.getElementById(elementId);
    if (textArea) {
      const height = textArea.scrollHeight;
      textArea.style.overflow = 'hidden';
      textArea.style.height = 'auto';
      textArea.style.height = height + 'px';
    }
  }

  shouldDisableQuarterlyThemeEdit = (dynamicFormGroup, quarterlyThemeIndex) => {
    if (this.currentTheme && this.currentTheme.details && this.currentTheme.details[quarterlyThemeIndex]) {
      return this.currentTheme.details[quarterlyThemeIndex].viewable && this.currentTheme.status === 'published';
    }
    return false;
  };

  ngAfterContentChecked(): void {
    // To solve out this one: ngIf - Expression has changed after it was checked in many cases.
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.eventSubscriber.unsubscribe();
  }
}
