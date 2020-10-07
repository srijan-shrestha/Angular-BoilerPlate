import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { DivisionService } from '../../services/division.service';
import {LeadershipService} from '../../services/leadership.service';
import {DepartmentService} from '../../services/department.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {
  divisionList: any;
  leadershipList: any;
  loading = false;

  departmentForm = new FormGroup({
    name: new FormControl(''),
    // leader: new FormControl(''),
    // division : new FormControl('')
  });

  constructor(private activeModal: NgbActiveModal,
              private divisionService: DivisionService,
              private leadershipService: LeadershipService,
              private departmentService: DepartmentService) { }

  ngOnInit() {
    // this.getDivisions(); // if department needs division this should be implemented
    // this.getLeadership();
  }

  close() {
    this.activeModal.close();
  }

  getDivisions() {
    this.divisionService.getDivisions().subscribe(
      res => {
        this.divisionList = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  getLeadership() {
    this.leadershipService.getLeadership().subscribe(
      res => {
        this.leadershipList = res;
      },
      err => {
        console.log(err);
      }
    );
  }
   onSubmit() {
     this.loading = true;
     this.departmentService.addDepartment(this.departmentForm.value).subscribe(
       res => {
         this.loading = false;
         this.activeModal.close('success');
       },
       err => {
        this.loading = false;
        console.log(err);
       }
     );
   }
}
