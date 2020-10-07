import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() type = 'primary';
  @Input() block = false;
  @Input() size: 'sm' | 'md' | 'fullwidth' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() className: string;
  @Input() loading = false;
  @Input() textTransform: 'capitalize' | 'lowercase' | 'uppercase' = 'capitalize';

  constructor() { }

  ngOnInit() {
  }

}
