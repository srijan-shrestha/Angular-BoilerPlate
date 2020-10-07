import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActiveForm } from '../models/active-form.model';
import { ImageDetail } from '../models/attach-image';

@Injectable({
  providedIn: 'root'
})
export class PlaybookActiveFormService {
  private activeFormSource = new BehaviorSubject<ActiveForm>(new ActiveForm());

  activeForm = this.activeFormSource.asObservable();

  private imageDetail = new BehaviorSubject<ImageDetail>(null);
  data = this.imageDetail.asObservable();

  setImageDetailData(data: ImageDetail) {
    this.imageDetail.next(data);
  }

  constructor() {
  }

  setActiveFormCodeData(code: string, formData: any) {
    const saving = false;
    this.activeFormSource.next({
      code,
      formData,
      saving
    });
  }

  setActiveFormData(formData: any) {
    const saving = true;
    const data = this.activeFormSource.value;
    this.activeFormSource.next({
      ...data,
      formData,
      saving
    });
  }

  clear() {
    this.activeFormSource.next(new ActiveForm());
  }

}
