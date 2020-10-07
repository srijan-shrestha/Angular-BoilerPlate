import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})

export class OnboardingComponent implements OnInit {
  counter = 0;
  count = 0;
  departments = [
     {
      id: '1',
      name: 'Marketing'
    },
  ];
  image: any;

  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });

  dateForm = new FormGroup({
    birthDate: new FormControl(''),
    hiringDate: new FormControl('')
  });

  companyForm = new FormGroup({
    department: new FormControl(''),
    jobTitle: new FormControl('')
  });

  photoUpload = new FormGroup({
    image: new FormControl(''),
    isNew: new FormControl(true)
  });

  passwordForm = new FormGroup({
    password: new FormControl(''),
    rePassword : new FormControl(''),
  });


  constructor() {}
  ngOnInit() {}

  imageData($event) {
    this.image = $event;
  }
  nextClick() {
    this.counter++;
  }
  prevClick() {
    this.counter--;
  }

  countNext() {
    this.count++;
  }
  countPrev() {
    this.count--;
  }

  userSubmit() {
    this.counter++;
  }

  dateSubmit() {
    this.counter++;
  }

  companySubmit() {
    this.counter++;
  }

  imageSubmit() {
    this.counter++;
  }

  formSubmit() {
    this.count++;
    this.counter ++;
  }
}
