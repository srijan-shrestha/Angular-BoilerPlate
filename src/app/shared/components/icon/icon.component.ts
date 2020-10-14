import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() icon: 'trash' |'card' | 'lock';
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' = 'md';
  @Input() type: 'primary' | 'secondary' | 'gray' | 'white' | 'light-gray' | 'success' | 'warning' | 'danger' | 'black';
  @Input() shape: 'regular' | 'rounded';

  constructor() {
  }

  ngOnInit() {
  }

}
