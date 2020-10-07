import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {CustomStepperComponent} from '../../../../shared/components/custom-stepper/custom-stepper.component';
import {ImageMetadataModalComponent} from '../../../../shared/components/image-metadata-modal/image-metadata-modal.component';
import {FileHandle} from '../../../playbooks/components/playbook-images/dragDrop.Directive';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CulturalPhotoEventDialogComponent} from '../cultural-photo-event-dialog/cultural-photo-event-dialog.component';
import * as cloneDeep from 'lodash/cloneDeep';
import {CulturalPhotosService} from '../../_services/cultural-photos.service';
import {Router} from '@angular/router';
import {isHebrewLeapYear} from "@ng-bootstrap/ng-bootstrap/datepicker/hebrew/hebrew";

@Component({
  selector: 'app-cultural-photos-stepper',
  templateUrl: './cultural-photos-stepper.component.html',
  styleUrls: ['./cultural-photos-stepper.component.scss']
})
export class CulturalPhotosStepperComponent implements OnInit {
  // @ts-ignore
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  public files: FileHandle[] = [];
  public photoArray: any = [];
  public photoArrayCopy;
  public dupliactePhotoArray;
  copyCounter = 0;
  selectedGallery: any;
  yearQuarter: any;
  @Output() photoList: EventEmitter<any> = new EventEmitter();
  @Output() state: EventEmitter<any> = new EventEmitter();

  uploadFileEvent: any;

  btnLoading: any = false;
  gallery = [
    {year: '2019', quarter: 1},
    {year: '2019', quarter: 2},
    {year: '2019', quarter: 3},
    {year: '2019', quarter: 4}
  ];

  constructor(private toastrService: ToastrService,
              private modalService: NgbModal,
              private culturalPhotoService: CulturalPhotosService,
              private router: Router
  ) {
  }

  ngOnInit() {
  }

  formatDate(date) {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }

  uploadFile(event: any) {
    this.uploadFileEvent = event;
    console.log(this.uploadFileEvent);
    if (event.type === 'change') {
      if (event.target.files.length !== 0) {
        const file = (event.target as HTMLInputElement).files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        const found = this.files.find(e => {
          return e.file.name === event.target.files[0].name;
        });
        if (found === undefined) {
          reader.onload = () => {
            const fileToPush: FileHandle = {
              file,
              url: reader.result
            };
            this.files.push(fileToPush);
          };
        }
      }
    } else {
      const found = this.files.find(e => {
        return e.file.name === event[0].file.name;
      });
      if (found === undefined) {
        this.files.push(event[0]);
        this.files = [...this.files];
      }
    }
  }

  uploadFolder(files) {
    for (const image of files) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      const found = this.files.find(e => {
        return e.file.name === image.name;
      });
      if (found === undefined) {
        reader.onload = () => {
          const fileToPush: FileHandle = {
            file: image,
            url: reader.result
          };
          this.files.push(fileToPush);
        };
      }
    }
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
    if (this.files.length === 0) {
     this.clearPhotos();
    }
  }

  cancelUpload() {
    this.clearPhotos();
    this.toastrService.info('Canceled');
  }

  goBack(stepper: CustomStepperComponent) {
    stepper.goBack(stepper);
  }

  goForward(stepper: CustomStepperComponent) {
    stepper.goForward(stepper);
  }

  openModal(image, index) {
    image = this.photoArray.filter(file => file.image.name === image.file.name)[0];
    const modalRef = this.modalService.open(ImageMetadataModalComponent, {size: 'xl', centered: true});
    modalRef.componentInstance.images = image;
    modalRef.componentInstance.imageIdx = index;
    modalRef.componentInstance.photoArray = this.photoArray;
    modalRef.componentInstance.photoArrayCopy = this.dupliactePhotoArray;
    modalRef.result.then((result) => {
      if (result.croppedFiles.length === 0) {
        this.clearPhotos();
        return 0;
      }
      if (result) {
        this.files = this.reloadFiles(result.croppedFiles);
        const arraycopy = this.photoArrayCopy;
        const years = arraycopy[result.formValue.imageIdx].year;
        const quarters = arraycopy[result.formValue.imageIdx].quarter;
        this.photoArrayCopy[result.formValue.imageIdx] = {...result.croppedFiles[index], year: years, quarter: quarters};
        this.photoArrayCopy[result.formValue.imageIdx] = {...this.photoArrayCopy[index], imageMetadata: result.formValue};
      }
    });
  }

  reloadFiles(editedFiles) {
    const newFiles = [];
    editedFiles.forEach(e => {this.files.forEach(f => {
      if (e.image.name === f.file.name) {
        newFiles.push(f);
       }
      });
    });
    return newFiles;
  }

  getGalleryInfo(file, event, index) {
    this.yearQuarter = event.target.value.split('|');
    const year = this.yearQuarter[0];
    const quarter = +this.yearQuarter[1][2];
    if (file) {
      this.photoArrayCopy[index] = {...this.photoArrayCopy[index], year, quarter};
    }
  }

  next() {
    if (this.photoArray.length === 0) {
      this.files.forEach(photo => {
        if (photo) {
          this.photoArray.push({date: this.formatDate(new Date()), uploadBy: 'General Tenant', image: photo.file, imageUrl: photo.url});
        }
      });
      this.photoArrayCopy = cloneDeep(this.photoArray);
      if (this.copyCounter === 0) {
        this.dupliactePhotoArray = cloneDeep(this.photoArray);
      }
      this.copyCounter++;
    }
  }


  submitImages() {
    this.btnLoading = true;
    let galleryCount = 0;
    let postedImageCount = 0;
    this.photoArrayCopy.forEach(item => {
      if (item.year && item.imageMetadata && item.imageMetadata.location) {
        galleryCount = galleryCount + 1;
      }
    });
    if (galleryCount === this.photoArrayCopy.length) {
      this.photoList.emit(this.photoArrayCopy);
      this.photoArrayCopy.forEach(item => {
        this.culturalPhotoService.postSubmittedPhotos(item).subscribe(response => {
          if (response) {
            postedImageCount = postedImageCount + 1;
            if (this.photoArrayCopy.length === postedImageCount) {
              this.btnLoading = false;
              this.toastrService.success('Images has been uploaded successfully.');
              this.router.navigate(['cultural-photos/approve']);
            }
          }
        });
      });
      // this.state.emit('submitting');
    } else {
      const modalRef = this.modalService.open(CulturalPhotoEventDialogComponent, {size: 'sm', centered: true});
      modalRef.componentInstance.title = 'Oops..';
      modalRef.componentInstance.body = 'Please select galleries and enter image meta data for the uploaded images';
      this.btnLoading = false;
    }
  }

  clearPhotos() {
    this.files = [];
    this.photoArray = [];
    this.photoArrayCopy = [];
    this.photoList.emit('this.photoArray');
  }

  deleteIdex(i: number) {
    this.toastrService.success('Images has been removed.');
    this.files.splice(i, 1);
    this.photoArray.splice(i, 1);
    this.photoArrayCopy.splice(i, 1);
  }

  updategallery(event) {
    const data = event.split('|');
    this.selectedGallery = +data[1][2];
    const year = data[0];
    const quarter = +data[1][2];
    this.photoArrayCopy.forEach(photo => {
      photo.year = year;
      photo.quarter = quarter;

    });
  }


  scrollToBottom() {
    this.myScrollContainer.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }
}
