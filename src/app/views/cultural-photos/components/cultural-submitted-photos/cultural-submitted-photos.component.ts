import {Component, OnInit} from '@angular/core';
import {CulturalPhotosService} from '../../_services/cultural-photos.service';

@Component({
  selector: 'app-cultural-submitted-photos',
  templateUrl: './cultural-submitted-photos.component.html',
  styleUrls: ['./cultural-submitted-photos.component.scss']
})
export class CulturalSubmittedPhotosComponent implements OnInit {

  public approvedPhotoList: any;
  submittedPhotosColumns = [
    'date',
    'fileName',
    'uploadedBy',
    'size'
  ];

  constructor(private culturalPhotosService: CulturalPhotosService) {
  }

  ngOnInit() {
    this.getApprovedPhotos();
  }

  getApprovedPhotos() {
    this.culturalPhotosService.getApprovedCulturalPhotos().subscribe(response => {
      this.approvedPhotoList = response;
    });
  }
}
