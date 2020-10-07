import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaybookImagesService {

  constructor(private readonly http: HttpClient) {
  }

  getGalleries(year, quarter) {
    return this.http.get(`/galleries?year=${year}&quarter=${quarter}`).pipe(
      retry(1)
    );
  }

  postGallery(gallery) {
    return this.http.post('/galleries/', gallery);
  }

  postImage(image, year, quarter, galleryId) {
    return this.http.post(`/galleries/${year}/${quarter}/images/`, image);
  }

  getImages(year, quarter, galleryId) {
    return this.http.get(`/galleries/${year}/${quarter}/images/`).pipe(
      retry(1)
    );
  }

  deleteImage(imageId, year, quarter) {
    return this.http.delete(`/galleries/${year}/${quarter}/images/${imageId}/`);
  }
}
