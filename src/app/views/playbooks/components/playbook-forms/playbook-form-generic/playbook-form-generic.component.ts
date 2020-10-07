import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {PlaybookActiveFormService} from '../../../services/playbook-active-form.service';
import {ImageDetail} from '../../../models/attach-image';
import {Subscription} from 'rxjs';
import {PlayBookService} from '../../../../../shared/services/playbook.service';


@Component({
  selector: 'app-playbook-form-generic',
  templateUrl: './playbook-form-generic.component.html',
  styleUrls: ['./playbook-form-generic.component.scss']
})
export class PlaybookFormGenericComponent implements OnInit {

  subscription: Subscription;

  private pFormData: any;

  clicked = false;

  get initialFormData() {
    return this.pFormData;
  }

  @Input()
  set initialFormData(formData: any) { // this is the data that will be fed to form in initial run
    this.pFormData = formData;
    this.setData();
  }

  form: FormGroup;

  constructor(public playbookActiveFormService: PlaybookActiveFormService, public playbookService: PlayBookService) {
  }

  ngOnInit() {
    this.setData();
  }

  setData() {
  } // !IMPORTANT: This needs to be implemented in all child component.

  save() {
    this.playbookActiveFormService.setActiveFormData(this.form.value);
    this.playbookActiveFormService.clear();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  cancel() {
    this.playbookActiveFormService.clear();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  scrollToBottom(event) {
    if (event) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }

  addImageFromGallery(id = 'imageid', url = 'imageurl') {
    this.clicked = true;
    this.playbookService.imageTabSource.next('images');
    this.playbookService.imageTabBottomBarShow.next('normal');
    this.subscription = this.playbookActiveFormService.data.subscribe((res: ImageDetail) => {
      if (res) {
        this.clicked = false;
        const data = {};
        data[id] = res.id;
        data[url] = res.url;
        this.form.patchValue(data);
        // this.subscription.unsubscribe();
        this.playbookActiveFormService.setImageDetailData(null);
      }
    });
  }

}
