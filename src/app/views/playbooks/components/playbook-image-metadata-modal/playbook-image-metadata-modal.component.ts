import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PlaybookImageEditComponent } from '../playbook-image-edit/playbook-image-edit.component';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-playbook-image-metadata-modal',
  templateUrl: './playbook-image-metadata-modal.component.html',
  styleUrls: ['./playbook-image-metadata-modal.component.scss'],
})
export class PlaybookImageMetadataModalComponent implements OnInit {
  imageForm: FormGroup;
  selectedImage: any;
  fileName: any;
  fileType: any;
  fileSize: any;
  publishDate: any;
  fileDimension: any;
  width: number;
  height: number;
  imageIndex: number;
  gallery: any;
  imageBase64: any;
  imageDimension: any;
  // photoArray: any;
  imageURL: any;
  imageCopyCounter = 0;
  duplicateImage;
  private inputValue;
  trySubmit = false;
  constructor(
    public activeModal: NgbActiveModal,
    public toast: ToastrService,
    private modalService: NgbModal,
    private elementRef: ElementRef,
) { }

  get images() {
    return this.inputValue;
  }

  @Input()
  set images(file) {
    this.setImageInModal(file);
  }

  get imageIdx() {
    return this.imageIndex;
  }

  @Input()
  set imageIdx(index) {
    this.setCurrentImageIndex(index);
  }

  @Input() photoArray;

  get galleryDetails() {
    return this.gallery;
  }

  setImageInModal(file) {
    const date = new Date();
    this.inputValue = file;
    this.fileName = file.image.name;
    this.fileType = file.image.type;
    this.publishDate = date;
    this.fileSize = this.bytesToSize(file.image.size);
    this.setSelectedImageData(file);
    this.getImageDimension(file.imageUrl).subscribe(response => {
      this.fileDimension = response.width + ' * ' + response.height;
    });
  }

  // setImageInModal(image) {
  //   const date = new Date();
  //   this.inputValue = image.file;
  //   this.fileName = image.file.name;
  //   this.fileType = image.file.type;
  //   this.publishDate = date;
  //   this.imageURL = image.url;
  //   this.fileSize = this.bytesToSize(image.file.size);
  //   this.getImageDimension(image).subscribe(response => {
  //     this.fileDimension = response.width + ' * ' + response.height;
  //     this.setSelectedImageData(image);
  //   });
  // }


  setSelectedImageData(image) {
    this.selectedImage = {
      image,
      fileName: this.fileName,
      fileType: this.fileType,
      fileSize: this.fileSize,
      publishDate: this.publishDate,
      imageURL: this.imageURL,
      fileDimension: this.fileDimension
    };
    console.log(this.selectedImage);
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
    this.imageForm = new FormGroup({
      location: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required]),
      caption: new FormControl('', [Validators.required]),
      people: new FormControl(''),
      imageIdx: new FormControl('')
    });
    const file = this.inputValue;
    const reader = new FileReader();
    reader.readAsDataURL(file.image);
    reader.onloadend = () => {
      this.imageBase64 = reader.result;
    };
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


  saveMetaData() {
  if (this.imageForm.valid) {
  this.imageForm.patchValue({
    imageIdx: this.imageIndex
  });
  this.photoArray[this.imageIndex].image = this.dataURLtoFile(this.imageBase64, this.fileName);
  this.photoArray[this.imageIndex].imageUrl = this.imageBase64;
  this.activeModal.close({formValue: this.imageForm.value, croppedFiles: this.photoArray});
  } else {
    this.toast.error('Please fill up the required fields in the form', 'Invalid Form');
    // this.activeModal.close({formValue: this.imageForm.value, croppedFiles: this.photoArray});
  }

  }

  get f() { return this.imageForm.controls; }

  showValidationText() {
    this.trySubmit = true;
  }


  editImage() {
    if (this.imageCopyCounter === 0 ) {
      this.duplicateImage = cloneDeep(this.selectedImage);
    }
    const modalRef = this.modalService.open(PlaybookImageEditComponent, {size: 'xl', centered: true,
    windowClass: 'playbook-image-metadata-modal'});
    modalRef.componentInstance.images = this.selectedImage;
    modalRef.componentInstance.duplicateImage = this.duplicateImage;
    modalRef.componentInstance.editedImage.subscribe((recievedImage) => {
      this.elementRef.nativeElement.querySelector('.image').src = recievedImage;
      this.imageBase64 = recievedImage;
      this.selectedImage.image.imageUrl = recievedImage;
    });
    this.imageCopyCounter++;
  }
}
