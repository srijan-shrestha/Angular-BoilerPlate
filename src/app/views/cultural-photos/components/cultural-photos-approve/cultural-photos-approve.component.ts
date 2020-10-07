import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {CulturalPhotosService} from '../../_services/cultural-photos.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cultural-photos-approve',
  templateUrl: './cultural-photos-approve.component.html',
  styleUrls: ['./cultural-photos-approve.component.scss']
})
export class CulturalPhotosApproveComponent implements OnInit {

  dataColumns = [
    'date',
    'uploadBy',
    'image',
    'size',
    'filename'
  ];
  public photoList: any;
  private submittedPhotoList = [];
  @Output() state: EventEmitter<any> = new EventEmitter();
  @Output() submittedImages: EventEmitter<any> = new EventEmitter();
  loading: number;
  showSubmit = true;

  constructor(private toastrService: ToastrService,
              private culturalPhotoService: CulturalPhotosService,
              private router: Router
  ) {
  }

  // get photos() {
  //   return this.photoList;
  // }
  //
  // @Input()
  // set photos(photo: any) {
  //   this.photoList = photo;
  //   console.log(this.photoList);
  // }

  ngOnInit() {
    this.getSubmittedCulturalPhotos();
  }

  getSubmittedCulturalPhotos() {
    this.culturalPhotoService.getSubmittedCulturalPhotos().subscribe(response => {
      this.photoList = response;
    });
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }


  uploadImage(id, galleryId, index) {
    console.log('=>>>>>>>>>>', galleryId);
    this.loading = index;
    this.showSubmit = false;
    this.culturalPhotoService.postSubmittedCulturalPhotos(id, galleryId).subscribe(response => {
      this.showSubmit = true;
      this.loading = -1;
      if (response) {
        this.toastrService.success('Image Approved', 'Success!');
        this.submittedPhotoList.push(response);
        this.photoList.splice(index, 1);
      }
      this.photoList = [...this.photoList];
      if (!this.photoList.length) {
        // this.state.emit('submitted');
        this.submittedImages.emit(this.submittedPhotoList);
        this.toastrService.success('All images approved successfully.', 'Success!');
        this.router.navigate(['cultural-photos/submitted']);
      }
    }, () => {
      this.showSubmit = true;
      this.loading = -1;
    });
  }


  deleteImage(index) {
    this.photoList.splice(index, 1);
    if (!this.photoList.length) {
      if (this.submittedPhotoList.length) {
        this.state.emit('submitted');
      } else {
        this.state.emit('stepper');
      }
      this.submittedImages.emit(this.submittedPhotoList);
    }
    this.photoList = [...this.photoList];
  }

}
