import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import {DivisionService} from '../../services/division.service';

@Component({
  selector: 'app-add-division',
  templateUrl: './add-division.component.html',
  styleUrls: ['./add-division.component.scss']
})
export class AddDivisionComponent implements OnInit {
  locations: any;
  loading = false;
  constructor(private activeModal: NgbActiveModal,
              private locationService: LocationService,
              private divisionService: DivisionService) { }

  divisionForm = new FormGroup({
    name: new FormControl(''),
    location: new FormControl('')
  });

  ngOnInit() {
    this.getLocations();
  }

  close() {
    this.activeModal.close();
  }

  onSubmit() {
    this.loading = true;
    this.divisionService.addDivision(this.divisionForm.value).subscribe(
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

  getLocations() {
    this.locationService.getLocation().subscribe(
      res => {
        this.locations = res;
      },
      err => {
        console.log(err);
      }
    );
  }
}
