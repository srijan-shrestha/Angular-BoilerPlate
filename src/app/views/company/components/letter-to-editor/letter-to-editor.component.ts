import { ApplicationRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { LetterToEditorModel } from '../../models/letter-to-editor.model';
import { ImageMetadataModalComponent } from '../../../../shared/components/image-metadata-modal/image-metadata-modal.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../../../shared/services/profile.service';
import { UserModel } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-letter-to-editor',
  templateUrl: './letter-to-editor.component.html',
  styleUrls: ['./letter-to-editor.component.scss'],
  providers: [NgbActiveModal]
})
export class LetterToEditorComponent implements OnInit {
  letterToEditors: LetterToEditorModel[];
  galleryImages: any;

  selectedYear = 2019;
  selectedQuarter = 1;

  editing = {};
  quillEditorRef;
  userId;

  addLetterToEditorForm: FormGroup;

  @ViewChild('content', { static: false }) contentRef: TemplateRef<any>;

  constructor(
    private companyService: CompanyService,
    private modalService: NgbModal,
    private appRef: ApplicationRef,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private profileService: ProfileService,
    private activeModel: NgbActiveModal
  ) {}

  ngOnInit() {
    this.profileService.data.subscribe(
      (res: UserModel) => {
        if (res) {
          this.userId = res.id;
          this.getLetterToEditors({
            year: this.selectedYear,
            quarter: this.selectedQuarter
          });
        }
      }
    );
    this.addLetterToEditorForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      quarter: [this.selectedQuarter],
      year: [this.selectedYear],
    });
    this.getGalleryImages();
  }

  getGalleryImages() {
    this.companyService.getGalleryImages().subscribe((res) => {
      this.galleryImages = res;
    });
  }

  getLetterToEditors(yearAndQuarter: any) {
    this.selectedQuarter = yearAndQuarter.quarter;
    this.selectedYear = yearAndQuarter.year;

    this.companyService.getLetterToEditor({
      quarter: this.selectedQuarter,
      year: this.selectedYear
    }).subscribe(
      (res) => {
        this.letterToEditors = res;
        let isAlreadyViewed = false;
        if (this.letterToEditors.length) {
          if (this.letterToEditors[0].viewers.length) {
            isAlreadyViewed = this.letterToEditors[0].viewers.map((viewer) => {
              if (viewer.viewer.id === this.userId) {
                const index = this.letterToEditors[0].viewers.indexOf(viewer);
                if (index !== -1) {
                  this.letterToEditors[0].viewers.splice(index, 1);
                }
              }
              return viewer.viewer.id === this.userId;
            }).reduce((a, b) => {
              return a || b;
            });
          }
          if (!isAlreadyViewed) {
            this.viewedBy({
              letter_id: this.letterToEditors[0].id,
              viewer: this.userId
            });
          }
        }
      }
    );
  }

  viewedBy(data) {
    this.companyService.viewedByLetterToEditor(data).subscribe(() => {
    }, () => {
    });
  }

  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;
    const toolbar = editorInstance.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler);
  }

  imageHandler = () => {
    this.activeModel = this.modalService.open(this.contentRef, { size: 'lg' });
    this.appRef.tick();
  };

  insertImageToEditor(imagePath) {
    const editorInstance = this.quillEditorRef;
    const range = editorInstance.getSelection(true);
    editorInstance.setSelection(range.index + 1);
    editorInstance.insertEmbed(range.index, 'image', imagePath);
    this.activeModel.dismiss();
  }

  updateLetterContent(event, letter) {
    letter.content = event.html;
  }

  updateLetter(letter) {
    this.editing[letter.id] = false;
    letter['user'] = letter.user.id;
    this.companyService.updateLetterToEditor(letter).subscribe(
      () => {
        this.toastrService.success('Letter to editor updated successfully.', 'Success!');
        this.getLetterToEditors({
          year: this.selectedYear,
          quarter: this.selectedQuarter
        });
      }, () => {
        this.toastrService.error('Unable to update letter to editor.', 'Error!');
      }
    );
  }

  openModal() {
    const modalRef = this.modalService.open(ImageMetadataModalComponent, { size: 'xl', centered: true });
  }

  openAddLetterToEditorModal(content) {
    this.activeModel = this.modalService.open(content, { size: 'lg' });
  }

  createLetterToEditor() {
    const data = this.addLetterToEditorForm.value;
    data['user'] = this.userId;
    data['quarter'] = this.selectedQuarter;
    data['year'] = this.selectedYear;

    this.companyService.createLetterToEditor(data).subscribe(() => {
      this.modalService.dismissAll();
      this.toastrService.success('Letter to editor added successfully.', 'Success!');
      this.getLetterToEditors({
        year: this.selectedYear,
        quarter: this.selectedQuarter
      });
    }, () => {
      this.modalService.dismissAll();
      this.toastrService.error('Unable to add letter to editor.', 'Error!');
    });
  }
}
