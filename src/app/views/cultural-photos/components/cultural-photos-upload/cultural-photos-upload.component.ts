import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-cultural-photos-upload',
  templateUrl: './cultural-photos-upload.component.html',
  styleUrls: ['./cultural-photos-upload.component.scss']
})
export class CulturalPhotosUploadComponent implements OnInit {
  public photoArray: any = [];
  public submittedPhotosArray: any = [];

  // displayStepper = true;
  // displaySubmitting = false;
  // displaySubmitted = false;

  constructor() {
  }

  ngOnInit() {
  }

  getPhotos(event: any) {
    console.log(event);
    this.photoArray = event;
  }

  changeDisplayState(event: any) {
    console.log(event);
    // if (event === 'stepper') {
    //   this.displaySubmitting = false;
    //   this.displayStepper = true;
    //   this.displaySubmitted = false;
    // } else if (event === 'submitted') {
    //   this.displaySubmitting = false;
    //   this.displayStepper = false;
    //   this.displaySubmitted = true;
    // } else {
    //   this.displaySubmitting = true;
    //   this.displayStepper = false;
    //   this.displaySubmitted = false;
    // }
  }

  submittedImageDisplay(event: any) {
    this.submittedPhotosArray = event;
  }
}
