import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { CulturalPhotoEventDialogComponent } from 'src/app/views/cultural-photos/components/cultural-photo-event-dialog/cultural-photo-event-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageCropperComponent, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CulturalPhotosService } from 'src/app/views/cultural-photos/_services/cultural-photos.service';
import { ConfirmationDeleteDialogComponent } from 'src/app/shared/components/confirmation-delete-dialog/confirmation-delete-dialog.component';
import { ConfirmationApproveDialogComponent } from 'src/app/shared/components/confirmation-approve-dialog/confirmation-approve-dialog.component';
import { PlaybookImagesService } from '../../services/playbook-images.service';

@Component({
  selector: 'app-playbook-image-edit',
  templateUrl: './playbook-image-edit.component.html',
  styleUrls: ['./playbook-image-edit.component.scss']
})
export class PlaybookImageEditComponent implements OnInit {
  imageForm: FormGroup;
  fileName: any;
  fileType: any;
  fileSize: any;
  publishDate: any;
  width: number;
  height: number;
  gallery: any;
  imageIndex: number;
  croppedImage: any = '';
  imageBase64: any;
  showCropper = false;
  imageDimension: any;
  culturalSideDivStatus: string;
  fileCopy: any;
  base64String: any;
  angle = 0;
  rotationCanvas: any;
  context: any;
  rotatingImage: any;
  imageContainer: any;
  transform: ImageTransform = {};
  imageMetadata: any;
  imageAfterEdit: any;
  btnLoading = false;
  trySubmit = false;

  @ViewChild(ImageCropperComponent, {static: false}) imageCropper: ImageCropperComponent;
  private inputValue;

  @Output() editedImage = new EventEmitter<any>();

  constructor(public activeModal: NgbActiveModal,
              public toast: ToastrService,
              private modalService: NgbModal,
              private elementRef: ElementRef,
              private culturalPhotoService: CulturalPhotosService,
              private playbookImageService: PlaybookImagesService
  ) {
  }


  get selectedImage() {
    this.fileCopy = {...this.inputValue};
    return this.inputValue;
  }

  @Input()
  set selectedImage(file) {
    this.inputValue = file;
    this.setImageInModal(file);
  }

  @Input() duplicateImage;
  @Input() year;
  @Input() quarter;

  @Input()
  set images(file) {
    this.inputValue = file;
    this.setImageInModal(file);
  }

  setImageInModal(file) {
    if (!this.selectedImage.id) {
      this.fileName = this.selectedImage.fileName;
      this.fileSize = this.selectedImage.fileSize;
      this.fileType = this.selectedImage.fileType;
      this.imageDimension = this.selectedImage.fileDimension;
      this.publishDate = this.selectedImage.publishDate;
    } else {
      this.getImageDimension(file.image).subscribe(response => {
      this.imageDimension = response;
    });
    }
  }

  setCurrentImageIndex(index) {
    this.imageIndex = index;
  }

  bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
      return '0 Byte';
    }
    const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))), 10);
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  }


  getImageDimension(image): Observable<any> {
    return new Observable(observer => {
      const img = new Image();
      img.onload = (event) => {
        const loadedImage: any = event.currentTarget;
        this.imageDimension = loadedImage.width + ' * ' + loadedImage.height;
      };
      img.src = image;
    });
  }

  ngOnInit() {
    this.initCropper();
    // this.selectedImage.id ?  this.culturalSideDivStatus = 'addMetaData' :
    //  this.culturalSideDivStatus = 'edit';

    if (this.selectedImage.id) {
      this.culturalSideDivStatus = 'addMetaData';
      this.loadMetadata();
    } else {
      this.culturalSideDivStatus = 'edit';
    }
    if (this.culturalSideDivStatus === 'edit') { setTimeout(() => {this.loadCanvas(); }, 10);  }
    this.imageForm = new FormGroup({
      location: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required]),
      caption: new FormControl('', [Validators.required]),
      people: new FormControl(''),
      imageIdx: new FormControl('')
    });
  }

  loadMetadata() {
    this.culturalPhotoService.getCulturalPhotosFromGalleryImage(Number(this.selectedImage.id)).subscribe((resp) => {
      this.imageMetadata = resp[0];
      this.imageForm.patchValue({
        location: this.imageMetadata ? this.imageMetadata.location : '',
        tags: this.imageMetadata ? this.imageMetadata.tags : '',
        caption: this.imageMetadata ? this.imageMetadata.caption : '',
        people: this.imageMetadata ? this.imageMetadata.listPeople : ''
      });
    });
  }


  initCropper() {
    if (this.selectedImage.id) {
      this.imageBase64 = this.getBase64(this.selectedImage.image);
    } else {
      this.imageBase64 = this.inputValue.image.imageUrl;
    }


    if (this.showCropper) {
      this.selectedImage.id ? this.imageBase64 = this.getBase64(this.duplicateImage.image) :
      this.imageBase64 = this.duplicateImage.image.imageUrl;
    }
  }

  getBase64(imgUrl) {
    const self = this;
    const xhr = new XMLHttpRequest();
    imgUrl = imgUrl.replace(/^https:\/\//i, 'http://');
    xhr.open('get', imgUrl, true);
    xhr.responseType = 'blob';
    xhr.send();
    xhr.addEventListener('load', () => {
        const reader = new FileReader();
        reader.readAsDataURL(xhr.response);
        reader.onloadend = () => {
            self.imageBase64 = reader.result;
        };
    });
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.selectedImage.id ? this.selectedImage.image = event.base64 : this.selectedImage.imageURL = event.base64;
  }

  cancel(cancelType: string) {
    // this.resetImage();
    this.setImageInModal(this.fileCopy);
    this.showCropper = false;
    this.selectedImage = this.fileCopy;
    this.resetImage();
    if (cancelType === 'cancelEdit') {
      this.imageBase64 = this.fileCopy.image.imageUrl;
      if (!this.selectedImage.id) {
        this.activeModal.close();
      }
      this.culturalSideDivStatus = 'addMetaData';
    } else {
      this.activeModal.close();
    }
  }

  dataURLtoFile(dataUrl, filename) {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }

  deleteImage() {
    this.culturalSideDivStatus = 'addMetaData';
    this.culturalSideDivStatus = 'addMetaData';
    const modalRef = this.modalService.open(ConfirmationDeleteDialogComponent,
      {centered: true,  windowClass: 'confirmation-modal-size'});
    modalRef.componentInstance.title = 'Are you sure?';
    modalRef.componentInstance.body = 'Do you want to delete? This action cannot be undone';
    modalRef.componentInstance.type = 'danger';
    modalRef.componentInstance.acceptText = 'Confirm';
    modalRef.componentInstance.declineText = 'Cancel';
    modalRef.result.then((result: 'accept' | 'decline') => {
      if (result === 'accept') {
        this.playbookImageService.deleteImage(Number(this.selectedImage.id), this.year, this.quarter).subscribe(() => {
          // this.toast.success('Image deleted sucessfully');
          const modalRef1 = this.modalService.open(ConfirmationApproveDialogComponent, {size: 'sm', centered: true ,
          windowClass: 'confirmation-modal-size'});
          modalRef1.componentInstance.title = 'Success!';
          modalRef1.componentInstance.body = 'Your photo was successfully removed.';
          modalRef1.componentInstance.type = 'primary';
          modalRef1.componentInstance.body = 'Your Photo was successfully removed.';
          modalRef1.componentInstance.acceptText = 'Okay';
          this.activeModal.close();
          }, error => {
            this.toast.error('Error Deleting the image');
          });
      }
    });
  }

  editImage() {
    this.culturalSideDivStatus = 'edit';
    this.showCropper = false;
    setTimeout(() => {this.loadCanvas(); }, 10);
  }

  expandCropOption() {
    this.culturalSideDivStatus = 'crop';
  }

  swicthToSelected() {
    this.culturalSideDivStatus = 'addMetaData';
  }

  applyCrop() {
    this.culturalSideDivStatus = 'addMetaData';
  }

  applyEdit() {
    if (!this.showCropper) {
      const rotatedImage = this.rotationCanvas.toDataURL();
      this.imageBase64 = rotatedImage;
      this.selectedImage.id ? this.selectedImage.image = this.imageBase64 : this.selectedImage.imageURL = this.imageBase64;
    } else {
      this.imageBase64 = this.croppedImage;
    }
    this.culturalSideDivStatus = 'addMetaData';
    this.showCropper = false;
    this.resetImage();
    if (!this.selectedImage.id) {
      this.onEditedImage(this.croppedImage ? this.croppedImage : this.imageBase64 );
      this.activeModal.close({formValue: this.imageForm.value, croppedFiles: this.croppedImage});
    } else {
      this.imageAfterEdit = this.dataURLtoFile(this.imageBase64, this.imageMetadata.filename);
    }
  }

  onEditedImage(editedImage) {
    this.editedImage.emit(editedImage);
  }

  rotateImage(direction) {
    this.angle += direction === 'left' ? -90 : 90;
    this.angle = Math.abs(this.angle) >= 360 ? 0 : this.angle;
    if (this.showCropper) {
      this.transform = {
        rotate: this.angle
      };
    } else {
      this.drawRotated(this.angle);
      this.imageBase64 = this.rotationCanvas.toDataURL();

    }
  }

  resetImage() {
    this.angle = 0;
    this.transform = {};
  }

  onCropClick() {
    this.showCropper = true;
    this.initCropper();
  }


  saveMetaData() {
    if (this.selectedImage.id) {
      this.btnLoading = true;
      console.log(this.imageForm.value, this.selectedImage);
      this.culturalPhotoService.updatePhotos({formValue: this.imageForm.value, croppedFiles: this.imageAfterEdit},
        Number(this.imageMetadata.id)).subscribe((resp) => {
          this.btnLoading = false;
          this.toast.success('Successfuly updated image and image metadata');
        },
        error => {
          this.btnLoading = false;
          this.toast.error('Error updating the image and image metadata.', 'Error!');
        });
    } else {
      this.onEditedImage(this.croppedImage ? this.croppedImage : this.imageBase64 );
      this.activeModal.close({formValue: this.imageForm.value, croppedFiles: this.croppedImage});
    }
  }

  loadCanvas() {
    this.rotationCanvas = this.elementRef.nativeElement.querySelector('.myCanvas');
    this.context = this.rotationCanvas.getContext('2d');
    this.rotatingImage = new Image();
    this.rotatingImage.onload = () => {
      this.fitImageInCanvas(0, 0);
    };
    this.rotatingImage.src = this.imageBase64;
  }

  drawRotated(degrees) {
    let cw = this.rotatingImage.width;
    let ch = this.rotatingImage.height;
    let cx = 0;
    let cy = 0;
    switch (degrees) {
      case 90:
      case -270:
        cw = this.rotatingImage.height;
        ch = this.rotatingImage.width;
        cy = this.rotatingImage.height * (-1);
        break;

      case 180:
      case -180:
        cx = this.rotatingImage.width * (-1);
        cy = this.rotatingImage.height * (-1);
        break;

      case -90:
      case 270:
        cw = this.rotatingImage.height;
        ch = this.rotatingImage.width;
        cx = this.rotatingImage.width * (-1);
        break;
    }
    this.context.clearRect(0, 0, this.rotationCanvas.width, this.rotationCanvas.height);
    this.context.save();
    this.rotationCanvas.setAttribute('width', cw);
    this.rotationCanvas.setAttribute('height', ch);
    this.rotationCanvas.style.height = this.imageContainer.clientHeight + 'px';
    this.rotationCanvas.style.width = this.imageContainer.clientWidth + 'px';
    this.context.rotate(degrees * Math.PI / 180);
    this.context.drawImage(this.rotatingImage, cx, cy);
    this.context.restore();
  }

  fitImageInCanvas(x , y) {
    this.imageContainer =  this.elementRef.nativeElement.querySelector('.image-container');
    const canvasStyle = getComputedStyle(this.rotationCanvas);
    const canvasWidth = Number(canvasStyle.width.replace('px', ''));
    const imageRatio = this.rotatingImage.width / this.rotatingImage.height;
    const canvasHeight = canvasWidth / imageRatio;
    this.rotationCanvas.style.height = this.imageContainer.clientHeight + 'px';
    this.rotationCanvas.style.width = this.imageContainer.clientWidth + 'px';
    this.rotationCanvas.width = canvasWidth;
    this.rotationCanvas.height = canvasHeight;
    this.context.drawImage(this.rotatingImage, x, y, canvasWidth, canvasHeight);
  }

  get f() { return this.imageForm.controls; }

  showValidationText() {
    this.trySubmit = true;
  }

}
