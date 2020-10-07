import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CulturalPhotosService {

  constructor(private http: HttpClient) {
  }

  getApprovedCulturalPhotos() {
    return this.http.get('/cultural-photos/', {params: {is_approved: 'True'}});
  }

  getCulturalPhotosFromGalleryImage(galleryImageId) {
    return this.http.get('/cultural-photos/', {params: {gallery_image_id: galleryImageId}});
  }

  getSubmittedCulturalPhotos() {
    return this.http.get('/cultural-photos/');
  }

  postSubmittedCulturalPhotos(id, galleryId) {
    const data = {gallery_image_id: galleryId, update_approval: true};
    return this.http.patch('/cultural-photos/' + id + '/', data);
  }

  postSubmittedPhotos(data): Observable<any> {
    console.log(data);
    const imageMetadata = {
      location: data.imageMetadata.location,
      tags: data.imageMetadata.tags,
      caption: data.imageMetadata.caption,
      list_people: data.imageMetadata.people,
      date: data.date,
      title: '',
      year: data.year,
      quarter: data.quarter,
      image: data.image
    };
    const formData = new FormData();
    Object.keys(imageMetadata).forEach((k) => {
      if (imageMetadata[k]) {
        formData.append(k, imageMetadata[k]);
      }
    });
    return this.http.post('/cultural-photos/', formData);
  }

  updatePhotos(data, imageId): Observable<any> {
    console.log(data);
    const imageMetadata = {
      location: data.formValue.location,
      tags: data.formValue.tags,
      caption: data.formValue.caption,
      list_people: data.formValue.people ? data.formValue.people : '',
      update_approval: false
      // image: data.croppedFiles
    };
    if (data.croppedFiles) {
      const key = 'image';
      imageMetadata[key] = data.croppedFiles;
    }
    const formData = new FormData();
    Object.keys(imageMetadata).forEach((k) => {
      if (imageMetadata[k]) {
        formData.append(k, imageMetadata[k]);
      }
    });
    return this.http.patch(`/cultural-photos/${imageId}/`, formData);
  }

  deletePhotos(imageId) {
    return this.http.delete(`/cultural-photos/${imageId}/`);
  }

  // getCulturalPhoto() {

  // }


}
