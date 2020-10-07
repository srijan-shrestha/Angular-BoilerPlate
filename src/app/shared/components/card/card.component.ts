import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() rounded: 'sm' | 'md' | 'lg' = undefined;
  @Input() shadow: 'sm' | 'md' | 'lg' = undefined;
  @Input() background = undefined;
  @Input() padding: 'none' = undefined;
  @Input() borderRadius: 'none' = undefined;

  constructor() { }

  ngOnInit() {
  }

}
