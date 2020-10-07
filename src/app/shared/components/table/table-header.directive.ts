import {Directive, Input, Output, EventEmitter, HostBinding, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: '[appTableHeader]'
})
export class TableHeaderDirective implements OnInit {
  @Input() currentOrder: string;
  @Input() orderKey: string;
  @Input() orderDir: string;

  @Output() ordered = new EventEmitter<any>();

  @HostBinding('class.table-header') tableHeader = true;

  @HostBinding('class.table-header--order') hasOrderKey: boolean;

  @HostBinding('class.table-header--order-asc')
  public get hasAsc(): boolean {
    return this.orderDir === 'asc' && this.orderKey === this.currentOrder;
  }

  @HostBinding('class.table-header--order-desc')
  public get hasDesc(): boolean {
    return this.orderDir === 'desc' && this.orderKey === this.currentOrder;
  }

  @HostListener('click') emitOrder() {
    if (this.orderKey) {
      this.orderDir = this.orderDir === 'asc' ? 'desc' : 'asc';
      this.ordered.emit({orderKey: this.orderKey, orderDir: this.orderDir});
    }
  }

  constructor() {
  }

  ngOnInit() {
    this.hasOrderKey = this.orderKey ? true : false;
  }
}
