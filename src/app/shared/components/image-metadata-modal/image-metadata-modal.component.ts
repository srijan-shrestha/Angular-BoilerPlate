import {Component, Input, OnInit, ViewChild, Renderer2, ElementRef} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ImageCroppedEvent, ImageCropperComponent, ImageTransform} from 'ngx-image-cropper';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CulturalPhotoEventDialogComponent } from '../../../views/cultural-photos/components/cultural-photo-event-dialog/cultural-photo-event-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDeleteDialogComponent } from '../confirmation-delete-dialog/confirmation-delete-dialog.component';
import { ConfirmationApproveDialogComponent } from '../confirmation-approve-dialog/confirmation-approve-dialog.component';
// import {CulturalPhotoEventDialogComponent} from '../cultural-photo-event-dialog/cultural-photo-event-dialog.component';

@Component({
  selector: 'app-image-metadata-modal',
  templateUrl: './image-metadata-modal.component.html',
  styleUrls: ['./image-metadata-modal.component.scss'],
})
export class ImageMetadataModalComponent implements OnInit {
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
  photosArray: any;
  imageDimension: any;
  culturalSideDivStatus: string;
  fileCopy: any;
  angle = 0;
  rotationCanvas: any;
  context: any;
  rotatingImage: any;
  transform: ImageTransform = {};
  imageContainer: any;


  @ViewChild(ImageCropperComponent, {static: false}) imageCropper: ImageCropperComponent;
  @ViewChild('wrapper', {static: true}) wrapper: ElementRef;
  private inputValue;

  constructor(public activeModal: NgbActiveModal,
              public toast: ToastrService,
              private modalService: NgbModal,
              private renderer: Renderer2,
              private elementRef: ElementRef,

  ) {
  }

  get images() {
    return this.inputValue;
  }

  @Input()
  set images(file) {
    this.fileCopy = {...file};
    this.setImageInModal(file);
  }

  get imageIdx() {
    return this.imageIndex;
  }

  @Input()
  set imageIdx(index) {
    this.setCurrentImageIndex(index);
  }

  get galleryDetails() {
    console.log(this.galleryDetails);
    return this.gallery;
  }

  @Input()
  set photoArray(photoArray) {
    this.photosArray = photoArray;
  }

  @Input() photoArrayCopy;

  setImageInModal(file) {
    const date = new Date();
    this.inputValue = file;
    this.fileName = file.image.name;
    this.fileType = file.image.type;
    this.publishDate = date;
    this.fileSize = this.bytesToSize(file.image.size);
    this.getImageDimension(file.imageUrl).subscribe(response => {
      this.imageDimension = response;
    });
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
        image.width = loadedImage.width;
        image.height = loadedImage.height;
        observer.next(image);
        observer.complete();
      };
      img.src = image.url;
    });
  }

  ngOnInit() {
    this.culturalSideDivStatus = 'addMetaData';
    this.imageForm = new FormGroup({
      location: new FormControl('', [Validators.required]),
      tags: new FormControl(''),
      caption: new FormControl('', [Validators.required]),
      people: new FormControl(''),
      imageIdx: new FormControl(this.imageIndex)
    });
    this.initCropper();
  }


  initCropper() {
    let file;
    if (this.showCropper) {
      file = this.photoArrayCopy.
      filter(item => this.photoArrayCopy.indexOf(item) === this.imageIndex)[0];
    } else {
      file = this.inputValue;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file.image);
    reader.onloadend = () => {
      this.imageBase64 = reader.result;
    };
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // const originalFile = this.photosArray[this.imageIndex].image;
    // const fileName = originalFile.name;
    // this.photosArray[this.imageIndex].image = this.dataURLtoFile(event.base64, fileName);
    // this.photosArray[this.imageIndex].imageUrl = event.base64;
  }

  cancel(cancelType: string) {
    this.setImageInModal(this.fileCopy);
    this.showCropper = false;
    this.photosArray.forEach(element => {
      if (element.image.name === this.fileCopy.image.name) {
        element.image = this.fileCopy.image;
        element.imageUrl = this.fileCopy.imageUrl;
      }
    });
    // this.photosArray[this.imageIndex].image = this.fileCopy.image;
    // this.photosArray[this.imageIndex].imageUrl = this.fileCopy.imageUrl;
    this.resetImage();
    if (cancelType === 'cancelEdit') {
      this.imageBase64 = this.fileCopy.imageUrl;
      this.culturalSideDivStatus = 'addMetaData';
    } else {
      this.activeModal.close({formValue: this.imageForm.value, croppedFiles: this.photosArray});
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

  openFolder() {
    console.log('Folder icon clicked');
  }

  deleteImage() {
    // this.activeModal.close();
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
        this.photosArray.splice(this.imageIndex, 1);
        this.photoArrayCopy.splice(this.imageIndex, 1);
        if (this.photosArray.length === 0 ) {
          this.activeModal.close({formValue: this.imageForm.value, croppedFiles: this.photosArray});
        } else {
          this.setImageInModal(this.photosArray[0]);
          this.inputValue = this.photosArray[0];
          this.initCropper();
        }
        const modalRef1 = this.modalService.open(ConfirmationApproveDialogComponent, {size: 'sm', centered: true ,
        windowClass: 'confirmation-modal-size'});
        modalRef1.componentInstance.title = 'Success!';
        modalRef1.componentInstance.body = 'Your photo was successfully removed.';
        modalRef1.componentInstance.type = 'primary';
        modalRef1.componentInstance.body = 'Your Photo was successfully removed.';
        modalRef1.componentInstance.acceptText = 'Okay';
      }
    });

  }

  editImage() {
    this.culturalSideDivStatus = 'edit';
    this.showCropper = false;
    setTimeout(() => {this.loadCanvas(); }, 10);
  }

  onCropClick() {
    this.showCropper = true;
    this.initCropper();
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
    if (this.showCropper) {
      const originalFile = this.photosArray[this.imageIndex].image;
      const fileName = originalFile.name;
      this.photosArray[this.imageIndex].image = this.dataURLtoFile(this.croppedImage, fileName);
      this.photosArray[this.imageIndex].imageUrl = this.croppedImage;
      this.imageBase64 = this.croppedImage;
      // this.initCropper();
    } else {
      // const imageWithoutCrop = this.elementRef.nativeElement.querySelector('.imageWithoutCrop').src;
      const rotatedImage = this.rotationCanvas.toDataURL();
      this.imageBase64 = rotatedImage;
      this.photosArray[this.imageIndex].image = this.dataURLtoFile(this.imageBase64, this.fileName);
      this.photosArray[this.imageIndex].imageUrl = this.imageBase64;
    }
    this.culturalSideDivStatus = 'addMetaData';
    this.showCropper = false;
    this.resetImage();

  }

  previousImage() {
    if (this.imageIndex > 0) {
      this.imageIndex -= 1;
    }
    this.setImageInModal(this.photosArray[this.imageIndex]);
    this.inputValue = this.photosArray[this.imageIndex];
    this.initCropper();
  }

  saveMetaData() {
    this.imageForm.patchValue({
      imageIdx: this.imageIndex
    });
    this.activeModal.close({formValue: this.imageForm.value, croppedFiles: this.photosArray});
    // else{
    //   this.toast.error('Please Fill up the Form', 'Invalid Form');
    //   this.activeModal.close({formValue: this.imageForm.value, croppedFiles: this.photosArray});
    // }

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

  nextImage() {
    if (this.imageIndex < this.photosArray.length - 1) {
      this.imageIndex += 1;
    }
    this.setImageInModal(this.photosArray[this.imageIndex]);
    this.initCropper();
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
    console.log(ch);
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


}
