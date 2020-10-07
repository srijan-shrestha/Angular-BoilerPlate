import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {CdkTable} from '@angular/cdk/table';

@Component({
  selector: 'app-table, table[app-table]',
  exportAs: 'appTable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,

  // See note on CdkTable for explanation on why this uses the default change detection strategy.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TableComponent<T> extends CdkTable<T> {
  /** Overrides the sticky CSS class set by the `CdkTable`. */
  protected stickyCssClass = 'table--header-sticky';
  @Input() height: string;
  @Input() border = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() noData: string;
}
