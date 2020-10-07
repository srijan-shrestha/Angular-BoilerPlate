import { Component, OnInit, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-theme-sky-blue',
  templateUrl: './theme-sky-blue.component.html',
  styleUrls: ['./theme-sky-blue.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ThemeSkyBlueComponent implements OnInit {
  @Input()
  // childViewContainer: ViewContainerRef;
  childViewContainer: TemplateRef<any>;
  constructor() {
  }

  ngOnInit() {
  }
}
