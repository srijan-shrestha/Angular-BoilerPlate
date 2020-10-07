import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quarterly-plan-preview',
  templateUrl: './quarterly-plan-preview.component.html',
  styleUrls: ['./quarterly-plan-preview.component.scss']
})
export class QuarterlyPlanPreviewComponent implements OnInit {
  titleText = 'You are previewing Team Goals. What would you like to do next?';
  teamName = 'Quarterly';
  teamPlan = 'Q1 2020';
  profiles = [{name: 'Silvester', role: 'Role/Title Here', image: 'app/assets/images/playbook/profileimg.jpg'},
              {name: 'Silvester', role: 'Role/Title Here', image: 'app/assets/images/playbook/profileimg.jpg'},
              {name: 'Silvester', role: 'Role/Title Here', image: 'app/assets/images/playbook/profileimg.jpg'},
              {name: 'Silvester', role: 'Role/Title Here', image: 'app/assets/images/playbook/profileimg.jpg'}];


  @Input() year: any;
  @Input() quarter: any;

  constructor() { }

  ngOnInit() {
    console.log(this.year);
    console.log(this.quarter);
  }

}
