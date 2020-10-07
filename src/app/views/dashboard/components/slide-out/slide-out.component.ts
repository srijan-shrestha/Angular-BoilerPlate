import { Component, OnInit } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-slide-out',
  templateUrl: './slide-out.component.html',
  styleUrls: ['./slide-out.component.scss']
})
export class SlideOutComponent implements OnInit {
  dataArray: Array<number>;
  dataTitle: string;
  percentage: string;


  constructor() { }

  ngOnInit() {
    this.dataArray = [8650, 1350];
    this.dataTitle = 'Testing';
    this.percentage = String(
      Math.round(this.dataArray[0] / this.dataArray.reduce((a, b) => a + b, 0) * 100)
    );
  }

}
