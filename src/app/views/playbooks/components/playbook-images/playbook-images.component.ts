import {Component, OnInit, Input, Output, EventEmitter, HostListener} from '@angular/core';
import {FileHandle} from './dragDrop.Directive';
import {PlaybookImagesService} from '../../services/playbook-images.service';
import {PlaybookActiveFormService} from '../../services/playbook-active-form.service';
import {ImageDetail} from '../../models/attach-image';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as cloneDeep from 'lodash/cloneDeep';
import {PlaybookImageEditComponent} from '../playbook-image-edit/playbook-image-edit.component';
import {PlaybookImageMetadataModalComponent} from '../playbook-image-metadata-modal/playbook-image-metadata-modal.component';
import {PlayBookService} from '../../../../shared/services/playbook.service';
import {PlayBook} from '../../../../shared/models/playbook.model';
import { CulturalPhotosService } from 'src/app/views/cultural-photos/_services/cultural-photos.service';
import { ActiveForm } from '../../models/active-form.model';
import { promise } from 'protractor';

@Component({
  selector: 'app-playbook-images',
  templateUrl: './playbook-images.component.html',
  styleUrls: ['./playbook-images.component.scss']
})
export class PlaybookImagesComponent implements OnInit {
  @Input() bottomBarState: 'expanded' | 'normal' | 'hidden' = 'normal';
  @Output() bottomBarStateChanged: EventEmitter<string> = new EventEmitter();

  files: FileHandle[] = [];
  isCreateNewGallerySelected = true;
  galleryTitle = null;
  galleries = [];
  selectedGallery = null;
  selectedQuarter = null;
  selectedYear = null;
  galleryImages = [];
  showAddNewImage = false;
  imageUploadStep = 1;
  sortBy: string = null;
  public photoArray: any = [];
  public photoArrayCopy;
  year = 2019;
  quarters = [1, 2, 3, 4];
  selectedGalleryTitle = null;
  isGallerySelected = true;
  lastScrollY = 0;
  playBook: PlayBook;
  initialized = false;
  public dupliactePhotoArray;
  copyCounter = 0;
  selectImageCounter = 0;
  duplicateImage;
  btnLoading: any = false;
  activeForm: ActiveForm;


  constructor(private playbookImageService: PlaybookImagesService,
              private playbookActiveFormService: PlaybookActiveFormService,
              private toastrService: ToastrService,
              private modalService: NgbModal,
              private playbookService: PlayBookService,
              private culturalPhotoService: CulturalPhotosService, ) {
  }

  ngOnInit() {
    this.playbookService.playbook.subscribe((playBook: PlayBook) => {
      this.playBook = playBook;
      if (!this.initialized) {
        this.setYearQuarterOfPlaybook();
      }
    });
    this.playbookActiveFormService.activeForm.subscribe((activeForm: ActiveForm) => {
      this.activeForm = activeForm;
    });
  }

  setYearQuarterOfPlaybook() {
    this.year = this.playBook.year;
    this.selectedYear = this.playBook.year;
    this.selectedQuarter = this.playBook.quarter;

    this.getGalleries(this.year, this.selectedQuarter);
  }

  uploadFile(event: any) {
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
        // if (this.files.length > 0) {
        //   this.editImage(this.files[0], 0);
        // }
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

  async uploadFolder(files) {
    for (let i = 0; i < files.length; i++) {
      const image = files[i];
      await this.readFile(image);
      if (i === files.length - 1) {
        this.editImage(this.files[0], 0);
      }
    }
    // if (this.files.length > 0) {
    //   this.editImage(this.files[0], 0);
    // }
  }

  async readFile(image) {
    return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    const found = this.files.find(e => {
      return e.file.name === image.name;
    });
    if (!found) {
      reader.onload = () => {
        const fileToPush: FileHandle = {
          file: image,
          url: reader.result
        };
        this.files.push(fileToPush);
        resolve();
      };
    }
  });
  }


  deleteAttachment(index) {
    this.files.splice(index, 1);
  }

  createImage() {
    // Call Upload Image Service
    this.playbookImageService.postGallery({title: this.galleryTitle}).subscribe((res: any) => {
        // !IMPORTANT : enable uploadImage if creating new gallery is enabled.
        // this.uploadImage(res.id);

        // res.image = this.fileUrl;
        // this.galleries.splice(0, 0, res);
      },
      error => {
        this.toastrService.error('Unable to create gallery.', 'Error!');
      });
  }

  editImage(image, index) {
    if (this.photoArray === undefined || this.photoArray.length === 0) {
      this.next();
    }
    image = this.photoArray.filter(file => file.image.name === image.file.name)[0];
    const modalRef = this.modalService.open(PlaybookImageMetadataModalComponent, {size: 'xl', centered: true,
    windowClass: 'playbook-image-metadata-modal'});
    modalRef.componentInstance.images = image;
    modalRef.componentInstance.imageIdx = index;
    modalRef.componentInstance.photoArray = this.photoArray;
    modalRef.componentInstance.photoArrayCopy = this.dupliactePhotoArray;
    modalRef.result.then((result) => {
      if (result) {
        const arraycopy = this.photoArrayCopy;
        const years = arraycopy[result.formValue.imageIdx].year;
        const quarters = arraycopy[result.formValue.imageIdx].quarter;
        this.photoArrayCopy[result.formValue.imageIdx] = {
          ...result.croppedFiles[index],
          year: years,
          quarter: quarters
        };
        this.photoArrayCopy[result.formValue.imageIdx] = {
          ...this.photoArrayCopy[index],
          imageMetadata: result.formValue
        };
        if (index < this.files.length - 1) {
          this.editImage(this.files[index + 1], index + 1);
        }
      }
    });
  }

  deleteIdex(i: number) {
    if (this.photoArray === undefined || this.photoArray.length === 0) {
      this.next();
    }
    this.toastrService.success('Images has been removed.');
    this.files.splice(i, 1);
    this.photoArray.splice(i, 1);
    this.photoArrayCopy.splice(i, 1);
  }

  addImage() {
    this.uploadImage(this.selectedYear, this.selectedQuarter, {id: 1});
    // Call Upload Image Service
  }

  openImageModal(image, index) {
    const modalRef = this.modalService.open(PlaybookImageEditComponent, {
      size: 'xl', centered: true,
      windowClass: 'playbook-image-metadata-modal'
    });
    modalRef.componentInstance.images = image;
    modalRef.componentInstance.year = this.selectedYear;
    modalRef.componentInstance.quarter = this.selectedQuarter;
    if (this.selectImageCounter === 0) {
      this.duplicateImage = cloneDeep(image);
    }
    modalRef.componentInstance.duplicateImage = this.duplicateImage;
    this.selectImageCounter++;
    modalRef.result.then((result) => {
      if (result) {
        const arraycopy = this.photoArrayCopy;
        const years = arraycopy[result.formValue.imageIdx].year;
        const quarters = arraycopy[result.formValue.imageIdx].quarter;
        this.photoArrayCopy[result.formValue.imageIdx] = {
          ...result.croppedFiles[index],
          year: years,
          quarter: quarters
        };
        this.photoArrayCopy[result.formValue.imageIdx] = {
          ...this.photoArrayCopy[index],
          imageMetadata: result.formValue
        };
      }
      this.getGalleryImage(this.selectedYear, this.selectedQuarter, {id: 1});
    });


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

  formatDate(date) {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }


  // Method to upload gallery image
  uploadImage(year, quarter, gallery) {
    const totalFiles = this.files.length;
    // let totalUploads = 0;
    let galleryCount = 0;
    let postedImageCount = 0;
    if (this.photoArrayCopy === undefined) {
      this.next();
    }

    // const checkAllUploaded = () => {
    //   // console.log(totalUploads, totalFiles);
    //   if (totalFiles === totalUploads) {
    //     this.files = [];
    //     this.toastrService.success('Image(s) uploaded successfully.', 'Success!');
    //     this.getGalleryImage(this.selectedYear, this.selectedQuarter, {id: null});
    //     this.showAddNewImage = false;
    //   }
    // };


    // for (const file of this.photoArrayCopy) {
    //   const formData = new FormData();
    //   formData.append('image', file.image);
    //   this.playbookImageService.postImage(formData, year, quarter, galleryId).subscribe((result) => {
    //       this.galleryTitle = null;
    //       totalUploads += 1;
    //       checkAllUploaded();
    //     },
    //     error => {
    //       this.toastrService.error('Unable to upload image.', 'Error!');
    //     });
    // }
    this.photoArrayCopy.forEach(item => {
      item.quarter = quarter;
      item.year = year;
      if (item.year && item.imageMetadata) {
        galleryCount = galleryCount + 1;
      } else {
        if (item.imageMetadata === undefined) {
          this.toastrService.warning('Have you fill up the image metadata correctly?');
        } else {
          this.toastrService.warning('Please choose year or quarter');
        }
      }
    });
    if (galleryCount === this.photoArrayCopy.length) {
      this.btnLoading = true;
      this.photoArrayCopy.forEach(item => {
        this.culturalPhotoService.postSubmittedPhotos(item).subscribe(response => {
          if (response) {
            postedImageCount = postedImageCount + 1;
            if (this.photoArrayCopy.length === postedImageCount) {
              this.btnLoading = false;
              this.toastrService.success('Images has been uploaded successfully.');
              this.getBackToGallery(year, quarter, gallery);
            }
          }
        });
      });
    } else {
      this.btnLoading = false;
      this.toastrService.error('Error uploading images.');
      // this.getBackToGallery(year, quarter, gallery);
    }
  }

  clearPhotos() {
    this.files = [];
    this.photoArray = [];
    this.photoArrayCopy = [];
  }

  getBackToGallery(year, quarter, gallery) {
    this.clearPhotos();
    this.showAddNewImage = false;
    this.getGalleryImage(year, quarter, {id: gallery.id});
  }

  openExitingGallery(value) {
    this.isCreateNewGallerySelected = value;
  }

  // Get all galleries
  getGalleries(year, quarter) {
    this.isGallerySelected = true;
    this.selectedYear = year;
    this.selectedQuarter = quarter;

    // !IMPORTANT: if gallery folder is enabled, use this:

    this.playbookImageService.getGalleries(year, quarter).subscribe((res) => {
        this.galleries = res as Array<any>;
      },
      error => {
        this.toastrService.error('Unable to fetch gallery.', 'Error!');
      });
  }

  // Fetch Image of selected gallery
  getGalleryImage(year, quarter, gallery) {
    this.selectedYear = year;
    this.selectedQuarter = quarter;
    this.isGallerySelected = false;
    this.selectedGallery = gallery;
    this.playbookImageService.getImages(year, quarter, gallery.id).subscribe((res) => {
        this.galleryImages = res as Array<any>;
      },
      error => {
        this.toastrService.error('Unable to fetch images.', 'Error!');
      });
  }

  attachImage(gallery, url, index) {
    if (this.activeForm.code === 'image-form') {
      this.playbookActiveFormService.setImageDetailData({
        id: gallery.id, url
      });
    } else {
      this.openImageModal(gallery, index);
    }
  }

  toggleBottomBarState() {
    if (this.bottomBarState === 'expanded') {
      this.bottomBarStateChanged.emit('normal');
    } else {
      this.bottomBarStateChanged.emit('expanded');
    }
  }

  setSortOption(option: string) {
    this.sortBy = option;
    console.log(option + ' Selected');
  }

  onImageListScroll(event) {
    if (event.deltaY > 0 && this.bottomBarState === 'normal') {
      this.toggleBottomBarState();
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const tempOffset = 5; // Near the end
    if (document.body.offsetHeight + window.scrollY + tempOffset >= document.body.scrollHeight &&
      this.lastScrollY < window.scrollY && this.bottomBarState === 'normal') {
      this.toggleBottomBarState();
    }
    this.lastScrollY = window.scrollY;
  }

}
