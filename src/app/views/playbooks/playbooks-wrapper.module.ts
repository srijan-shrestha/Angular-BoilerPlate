import {NgModule} from '@angular/core';
import {PlaybookDetailComponent} from './components/playbook-detail/playbook-detail.component';
import {PlaybookAccordionComponent} from './components/accordion/playbook-accordion.component';
import {PlaybooksWrapperRoutingModule} from './playbooks-wrapper-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from 'src/app/shared/shared.module';
import {PlaybookWrapperComponent} from './playbook-wrapper.component';
import {PlaybooksListComponent} from './components/playbooks-list/playbooks-list.component';
import {ThemesComponent} from './components/themes/themes.component';
import {PreviewComponent} from './components/preview/preview.component';
import {PlaybookSidebarComponent} from './components/playbook-sidebar/playbook-sidebar.component';
import {PlaybookLayoutsComponent} from './components/playbook-layouts/playbook-layouts.component';
import {PlaybookAppComponent} from './components/playbook-app/playbook-app.component';
import {PlaybookAppContentComponent} from './components/playbook-app-content/playbook-app-content.component';
import {PlaybookBottombarComponent} from './components/playbook-bottombar/playbook-bottombar.component';
import {PlaybookImagesComponent} from './components/playbook-images/playbook-images.component';
import {DragDirective} from './components/playbook-images/dragDrop.Directive';
import {ThemeSkyBlueComponent} from './themes/theme-sky-blue/theme-sky-blue.component';
import {PlaybookFormWrapperComponent} from './components/playbook-form-wrapper/playbook-form-wrapper.component';
import {EmployeeBioComponent} from './components/playbook-forms/employee-bio/employee-bio.component';
import {PlaybookFormGenericComponent} from './components/playbook-forms/playbook-form-generic/playbook-form-generic.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {PlaybookCreationWizardComponent} from './components/playbook-creation-wizard/playbook-creation-wizard.component';
import {Theme1Toc1Component} from './page-groups/toc/theme1-toc1/theme1-toc1.component';
import {TocFormComponent} from './components/playbook-forms/toc-form/toc-form.component';
import {PageGroupGenericComponent} from './page-groups/page-group-generic/page-group-generic.component';
import {ImageFormComponent} from './components/playbook-forms/image-form/image-form.component';
import {Theme1ArticleOneComponent} from './page-groups/article/theme1-article-one/theme1-article-one.component';
import {Theme1ArticleTwoComponent} from './page-groups/article/theme1-article-two/theme1-article-two.component';
import {Theme1CorporateEventsOneComponent} from './page-groups/corporate-events/theme1-corporate-events-one/theme1-corporate-events-one.component';
import {Theme1CorporateEventsTwoComponent} from './page-groups/corporate-events/theme1-corporate-events-two/theme1-corporate-events-two.component';
import {TopInitiativesComponent} from './page-groups/initiative/top-initiatives/top-initiatives.component';
import {Theme1CoverOneColumnComponent} from './page-groups/cover/theme1-cover-one-column/theme1-cover-one-column.component';
import {Theme1CoverTwoColumnComponent} from './page-groups/cover/theme1-cover-two-column/theme1-cover-two-column.component';
import {Theme1SectionDividerOneComponent} from './page-groups/section-divider/theme1-section-divider-one/theme1-section-divider-one.component';
import {Theme1SectionDividerTwoComponent} from './page-groups/section-divider/theme1-section-divider-two/theme1-section-divider-two.component';
import {MissionStatementCompanyValuesComponent} from './page-groups/mission-statement-company-values/mission-statement-company-values/mission-statement-company-values.component';
import {Theme1WhatsNewOneComponent} from './page-groups/whats-new/theme1-whats-new-one/theme1-whats-new-one.component';
import {Theme1BusinessDevelopmentOneComponent} from './page-groups/business-development/theme1-business-development-one/theme1-business-development-one.component';
import {Theme1ArticleThreeComponent} from './page-groups/article/theme1-article-three/theme1-article-three.component';
import {Theme1BusinessDevelopmentTwoComponent} from './page-groups/business-development/theme1-business-development-two/theme1-business-development-two.component';
import {Theme1LetterToEditor1Component} from './page-groups/letter-to-editor/theme1-letter-to-editor1/theme1-letter-to-editor1.component';
import {SingleLineTextComponent} from './components/playbook-forms/single-line-text/single-line-text.component';
import {MultiLineTextComponent} from './components/playbook-forms/multi-line-text/multi-line-text.component';
import {Theme1ProblemSolutionComponent} from './page-groups/problem-solution/theme1-problem-solution/theme1-problem-solution.component';
import {Theme1JourneyOneComponent} from './page-groups/journey/theme1-journey-one/theme1-journey-one.component';
import {Theme1JourneyTwoComponent} from './page-groups/journey/theme1-journey-two/theme1-journey-two.component';
import {PhilosophiesComponent} from './page-groups/philosophies/philosophies.component';
import {GrowthComponent} from './page-groups/growth/growth.component';
import {ArrayFormComponent} from './components/playbook-forms/array-form/array-form.component';
import {Theme1UpcomingEventsOneComponent} from './page-groups/upcoming-events/theme1-upcoming-events-one/theme1-upcoming-events-one.component';
import {Theme1CompanyWideInitiativeComponent} from './page-groups/initiative/theme1-company-wide-initiative/theme1-company-wide-initiative.component';
import {TwoArrayFormComponent} from './components/playbook-forms/two-array-form/two-array-form.component';
import {Theme1BackCoverComponent} from './page-groups/back-cover/theme1-back-cover/theme1-back-cover.component';
import {PlaybookPreviewComponent} from './components/playbook-preview/playbook-preview.component';
import {Theme1GoalOneComponent} from './page-groups/goals/theme1-goal-one/theme1-goal-one.component';
import { PlaybookImageMetadataModalComponent } from './components/playbook-image-metadata-modal/playbook-image-metadata-modal.component';
import { CompanyBiosOneComponent } from './page-groups/company-bios/company-bios-one/company-bios-one.component';
import { PlaybookPublishComponent } from './components/playbook-publish/playbook-publish.component';
import { PlaybookEventModalComponent } from './components/playbook-event-modal/playbook-event-modal.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import { PlaybookGalleriesComponent } from './components/playbook-galleries/playbook-galleries.component';
import { PlaybookImageEditComponent } from './components/playbook-image-edit/playbook-image-edit.component';
import { PlaybookDetailFormComponent } from './components/playbook-forms/playbook-detail-form/playbook-detail-form.component';
import { PlaybookThemePreviewComponent } from './components/playbook-theme-preview/playbook-theme-preview.component';

@NgModule({
  declarations: [
    PlaybookDetailComponent,
    PlaybookAccordionComponent,
    PlaybookWrapperComponent,
    PlaybooksListComponent,
    ThemesComponent,
    PreviewComponent,
    PlaybookSidebarComponent,
    PlaybookLayoutsComponent,
    PlaybookAppComponent,
    PlaybookAppContentComponent,
    PlaybookBottombarComponent,
    PlaybookImagesComponent,
    DragDirective,
    ThemeSkyBlueComponent,
    PlaybookFormWrapperComponent,
    EmployeeBioComponent,
    PlaybookFormGenericComponent,
    PlaybookCreationWizardComponent,
    Theme1Toc1Component,
    TocFormComponent,
    PageGroupGenericComponent,
    ImageFormComponent,
    Theme1CoverOneColumnComponent,
    Theme1CoverTwoColumnComponent,
    Theme1SectionDividerOneComponent,
    Theme1SectionDividerTwoComponent,
    Theme1ArticleOneComponent,
    Theme1ArticleTwoComponent,
    MissionStatementCompanyValuesComponent,
    Theme1CorporateEventsOneComponent,
    Theme1CorporateEventsTwoComponent,
    TopInitiativesComponent,
    Theme1WhatsNewOneComponent,
    Theme1BusinessDevelopmentOneComponent,
    Theme1ArticleThreeComponent,
    Theme1LetterToEditor1Component,
    SingleLineTextComponent,
    MultiLineTextComponent,
    Theme1BusinessDevelopmentTwoComponent,
    Theme1JourneyOneComponent,
    Theme1JourneyTwoComponent,
    Theme1ProblemSolutionComponent,
    PhilosophiesComponent,
    GrowthComponent,
    ArrayFormComponent,
    TwoArrayFormComponent,
    Theme1UpcomingEventsOneComponent,
    Theme1CompanyWideInitiativeComponent,
    TwoArrayFormComponent,
    Theme1BackCoverComponent,
    PlaybookPreviewComponent,
    Theme1GoalOneComponent,
    PlaybookImageMetadataModalComponent,
    CompanyBiosOneComponent,
    PlaybookPublishComponent,
    PlaybookEventModalComponent,
    PlaybookGalleriesComponent,
    PlaybookImageEditComponent,
    PlaybookDetailFormComponent,
    PlaybookThemePreviewComponent,
  ],
  imports: [
    // CommonModule,
    SharedModule,
    PlaybooksWrapperRoutingModule,
    NgbModule,
    OverlayModule,
    ImageCropperModule,
  ],
  exports: [
    DragDirective,
    PlaybookImageMetadataModalComponent
  ],
  entryComponents: [
    ThemeSkyBlueComponent,
    PlaybookPreviewComponent,
    PlaybookImageMetadataModalComponent,
    PlaybookPublishComponent,
    PlaybookEventModalComponent,
    PlaybookImageEditComponent,
    PlaybookThemePreviewComponent
  ]
})
export class PlaybooksWrapperModule {
}
