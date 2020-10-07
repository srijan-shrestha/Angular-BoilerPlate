import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LetterToEditorModel} from '../models/letter-to-editor.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(
    private http: HttpClient
  ) {
  }

  getLetterToEditor(params: any) {
    return this.http.get('/letter-to-editors/', {params}).pipe(
      map((data: any[]) => data.map(LetterToEditorModel.adapt))
    );
  }

  createLetterToEditor(data) {
    return this.http.post('/letter-to-editors/', data);
  }

  updateLetterToEditor(data) {
    return this.http.put(`/letter-to-editors/${data.id}/`, data);
  }

  viewedByLetterToEditor(data) {
    return this.http.post(`/letter-to-editor/${data.letter_id}/viewers/`, data);
  }

  getEmployeeDirectory(params: any) {
    return this.http.get('/employee-directory/', {params});
  }

  getUnAssignedEmployees(params: any) {
    return this.http.get('/unassigned-employees/', {params});
  }

  getGalleryImages() {
    return this.http.get('/cultural-photos');
  }

  saveCompanyThemes = (payload) => this.http.patch('/company-themes/', payload);

  // finds company theme or themes.
  findCompanyThemes = ({year, type}, themeId = null) => {
    if (themeId) {
      return this.http.get(`/company-themes/${themeId}`);
    } else {
      return this.http.get(`/find-company-themes?year=${year}&type=${type}`);
    }
  };

  getCompanyThemes = () => this.http.get('/company-themes');

  updateCompanyThemes = (payload) => this.http.patch('/update-company-themes/', payload);
}
