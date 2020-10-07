import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {PlayBook} from '../../../../shared/models/playbook.model';
import {PlayBookService} from '../../../../shared/services/playbook.service';
import {ToastrService} from 'ngx-toastr';
import {CustomStepperComponent} from '../../../../shared/components/custom-stepper/custom-stepper.component';
import {FileHandle} from '../playbook-images/dragDrop.Directive';
import {PlaybookImagesService} from '../../services/playbook-images.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-playbook-creation-wizard',
  templateUrl: './playbook-creation-wizard.component.html',
  styleUrls: ['./playbook-creation-wizard.component.scss'],
  animations: [
    trigger('slideAnimation', [
      transition('void => bottom', [
        style({transform: 'translateY(25%)', opacity: 0}),
        animate('250ms ease-in-out', style({transform: 'translateY(0)', opacity: 1}))
      ]),
      transition('bottom => void', [
        style({transform: 'translateY(0)', opacity: 1}),
        animate('250ms ease-in-out', style({transform: 'translateY(25%)', opacity: 0}))
      ]),
      transition('void => left', [
        style({transform: 'translateX(-25%)', opacity: 0}),
        animate('250ms ease-in-out', style({transform: 'translateX(0)', opacity: 1}))
      ]),
      transition('left => void', [
        style({transform: 'translateX(0)', opacity: 1}),
        animate('250ms ease-in-out', style({transform: 'translateX(-25%)', opacity: 0}))
      ])
    ])
  ]
})

export class PlaybookCreationWizardComponent implements OnInit {

  @Input() position = 'bottom';

  @Input() hasSecondaryNav = false;

  @Output() showChange = new EventEmitter();

  @ViewChild('playbookTitle', {static: false})
  playbookTitle: any;

  @ViewChild('stepper', {static: false}) private stepper: CustomStepperComponent;

  playBook: PlayBook;
  _show = false;
  galleryStep = null;

  galleries = [];
  quarters = [1, 2, 3, 4];
  selectedQuarter = null;
  selectedYear = null;
  year = 2019;
  dropzoneHovered = false;
  wizardTitle: string;
  themes = [{name: 'Option Dark'} , {name: 'Option Light'}, {name: 'Option Color'}];
  selectedTheme = '';

  public files: FileHandle[] = [];

  get show() {
    return this._show;
  }

  @Input('show')
  set show(value: boolean) {
    this._show = value;
    this.showChange.emit(this._show);
  }


  constructor(private playBookService: PlayBookService,
              private playbookImageService: PlaybookImagesService,
              private toastrService: ToastrService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.playBookService.playbook.subscribe((playBook: PlayBook) => {
      this.playBook = playBook;
      this.selectedYear = this.playBook.year;
      this.selectedQuarter = this.playBook.quarter;
    });
    this.wizardTitle = this.getTitle(0);
    this.selectedTheme = this.themes[1].name;
  }

  close() {
    this.show = false;
  }

  addTitle(event) {
    if (!this.playBook.title) {
      this.toastrService.error('Title is required.', 'Error!');
      this.playbookTitle.nativeElement.focus();
      event.stopPropagation();
    } else {
      this.playBookService.updatePlaybook(+this.playBook.id, this.playBook).subscribe(
        (resp) => {
          if (this.files.length > 0) {
            this.uploadImage(this.selectedYear, this.selectedQuarter, null);
          }
          this.toastrService.success('Playbook data saved successfully.', 'Success!');
          this.show = false;
        }, (err) => {
          this.toastrService.error('Unable to saved.', 'Error!');
        });
    }
  }

  goForward(stepper: CustomStepperComponent) {
    stepper.goForward(stepper);
    this.wizardTitle = this.getTitle(stepper.selectedIndex);
  }

  goBack(stepper: CustomStepperComponent) {
    stepper.goBack(stepper);
    this.wizardTitle = this.getTitle(stepper.selectedIndex);
  }

  /*uploadFile(files: FileHandle[]) {
    const found = this.files.find(element => {
      return element.file.name === files[0].file.name;
    });
    if (found === undefined) {
      this.files.push(files[0]);
      this.files = [...this.files];
    }
    this.dropzoneHovered = false;
  }*/

  uploadAllFiles(files: FileHandle[]) {
    for (const file of files) {
      const found = this.files.find(element => {
        return element.file && element.file.name === file.file.name;
      });
      if (found === undefined) {
        this.files.push(file);
        this.files = [...this.files];
      }
    }
    this.dropzoneHovered = false;
  }

  public onFileInputChange(inputFiles: FileList) {
    const files: FileHandle[] = [];
    for (let i = 0; i < inputFiles.length; i++) {
      const file = inputFiles.item(i);
      const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      files.push({ file, url });
    }
    if (files.length > 0) {
      this.uploadAllFiles(files);
    }
  }

  // Method to upload gallery image
  uploadImage(year, quarter, galleryId) {
    const totalFiles = this.files.length;
    let totalUploads = 0;

    // const checkAllUploaded = () => {
    //   // console.log(totalUploads, totalFiles);
    //   if (totalFiles === totalUploads) {
    //     this.files = [];
    //     this.toastrService.success('Image(s) uploaded successfully.', 'Success!');
    //     this.getGalleryImage(this.selectedYear, this.selectedQuarter, {id: null});
    //     this.showAddNewImage = false;
    //   }
    // };


    for (const file of this.files) {
      const formData = new FormData();
      formData.append('image', file.file);
      this.playbookImageService.postImage(formData, year, quarter, galleryId).subscribe((result) => {
          totalUploads += 1;
          // checkAllUploaded();
        },
        error => {
          this.toastrService.error('Unable to upload image.', 'Error!');
        });
    }
  }

  galleryStepChange(step: string): void {
    this.galleryStep = step;
  }

  getTitle(index: number) {
    const titles = [/*'Select Playbook Theme', 'Add Your Photos',*/ 'Title My Playbook'];
    return titles[index];
  }

  setTheme(option: string) {
    // This is used for selecting theme
    // uncomment this to make theme selection work
    // this.selectedTheme = option;
  }

   // Fetch Image of selected gallery
   setGalleryImage(year, quarter) {
    this.selectedYear = year;
    this.selectedQuarter = quarter;

    this.galleryStepChange( 'upload');
  }

}
