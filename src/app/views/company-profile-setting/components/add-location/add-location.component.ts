import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import {LocationService} from 'src/app/views/company-profile-setting/services/location.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  loading = false;

  constructor(private activeModal: NgbActiveModal,
              private locationService: LocationService) { }
      locationForm = new FormGroup({
     locationName: new FormControl(''),
   });

  ngOnInit() {
  }

  close() {
    this.activeModal.close();
  }

  onSubmit() {
    this.loading = true;
    this.locationService.addLocation(this.locationForm.value).subscribe(
      res => {
        this.loading = false;
        this.activeModal.close();
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }
}
