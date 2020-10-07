import { Directive, HostBinding, Component, TemplateRef, ViewContainerRef, ComponentFactoryResolver, OnInit } from '@angular/core';


@Directive({
  selector: '[appTable]'
})
export class TableDirective implements OnInit {

  @HostBinding('class') class = 'table table--header-sticky table-sm table-striped table--body-bordered';

  constructor() {}

  ngOnInit() {
  }

}
