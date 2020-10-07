import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlaybookImagesService } from '../../services/playbook-images.service';
import { PlaybookActiveFormService } from '../../services/playbook-active-form.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileHandle } from '../playbook-images/dragDrop.Directive';
import { PlaybookImageMetadataModalComponent } from '../playbook-image-metadata-modal/playbook-image-metadata-modal.component';

@Component({
  selector: 'app-playbook-galleries',
  templateUrl: './playbook-galleries.component.html',
  styleUrls: ['./playbook-galleries.component.scss']
})
export class PlaybookGalleriesComponent implements OnInit {
  @Input() bottomBarState: 'expanded' | 'normal' | 'hidden' = 'normal';
  @Output() bottomBarStateChanged: EventEmitter<string> = new EventEmitter();

  files: FileHandle[] = [];
  isCreateNewGallerySelected = true;
  galleryTitle = null;
  selectedGallery = null;
  selectedQuarter = null;
  selectedYear = null;
  galleries = [];
  galleryImages = [];
  year = 2019;
  showAddNewImage = false;
  quarters = [1 , 2, 3 , 4];
  imageUploadStep = 1;
  public photoArray: any = [];
  public photoArrayCopy;

  constructor(private playbookImageService: PlaybookImagesService,
              private playbookActiveFormService: PlaybookActiveFormService,
              private toastrService: ToastrService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.getGalleries(2019, 1);
    // this.generateQuarters();
  }

  generateQuarters() {
    for (let i = 0; i < 23; i++) {
      this.quarters.push(i);
    }
  }

  toggleBottomBarState() {
    if (this.bottomBarState === 'expanded') {
      this.bottomBarStateChanged.emit('normal');
    } else {
      this.bottomBarStateChanged.emit('expanded');
    }
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

  deleteAttachment(index) {
    this.files.splice(index, 1);
  }

  createImage() {
    // Call Upload Image Service
    this.playbookImageService.postGallery({ title: this.galleryTitle }).subscribe((res: any) => {
      // !IMPORTANT : enable uploadImage if creating new gallery is enabled.
        // this.uploadImage(res.id);

        // res.image = this.fileUrl;
        // this.galleries.splice(0, 0, res);
      },
      error => {
        this.toastrService.error('Unable to create gallery.', 'Error!');
      });
  }


  addImage() {
    this.uploadImage(this.selectedYear, this.selectedQuarter, null);
    // Call Upload Image Service
  }

  openImageModal(image, index) {
    const modalRef = this.modalService.open(PlaybookImageMetadataModalComponent, {size: 'xl', centered: true,
     windowClass: 'playbook-image-metadata-modal'});
    modalRef.componentInstance.images = image;
    modalRef.componentInstance.imageIdx = index;
    modalRef.componentInstance.photoArray = this.photoArray;
    modalRef.result.then((result) => {
      if (result) {
        const arraycopy = this.photoArrayCopy;
        const years = arraycopy[result.formValue.imageIdx].year;
        const quarters = arraycopy[result.formValue.imageIdx].quarter;
        this.photoArrayCopy[result.formValue.imageIdx] = {...result.croppedFiles[index], year: years, quarter: quarters};
        this.photoArrayCopy[result.formValue.imageIdx] = {...this.photoArrayCopy[index], imageMetadata: result.formValue};
      }
    });

  }

   // Method to upload gallery image
  uploadImage(year, quarter, galleryId) {
    const totalFiles = this.files.length;
    let totalUploads = 0;

    const checkAllUploaded = () => {
      // console.log(totalUploads, totalFiles);
      if (totalFiles === totalUploads) {
        this.files = [];
        this.toastrService.success('Image(s) uploaded successfully.', 'Success!');
        this.getGalleryImage(this.selectedYear, this.selectedQuarter, {id: null});
        this.showAddNewImage = false;
      }
    };
  }

  // Get all galleries
  getGalleries(year, quarter) {
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

  attachImage(gallery, url) {
    this.playbookActiveFormService.setImageDetailData({
      id: gallery.id, url
    });
    this.openImageModal(url, gallery.id);
  }

    // Fetch Image of selected gallery
    getGalleryImage(year, quarter, gallery) {
      this.selectedGallery = gallery;
      this.playbookImageService.getImages(year, quarter, gallery.id).subscribe((res) => {
        this.galleryImages = res as Array<any>;
      },
      error => {
        this.toastrService.error('Unable to fetch images.', 'Error!');
      });
    }

  openExitingGallery(value) {
    this.isCreateNewGallerySelected = value;
  }

}
