import {Component, OnInit, Input} from '@angular/core';
import {Preview} from '../../models/preview';
import {ActivatedRoute} from '@angular/router';
import {Theme} from '../../models/themes';

@Component({
  selector: 'app-theme-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  @Input() theme: Theme;
  public pages;

  constructor() {
  }

  ngOnInit() {
    this.pages = this.theme.pages.filter(item => {
        if (Object.keys(this.theme.pages.filter(item1 => item1.pageGroup === item.pageGroup)).length > 1) {
          return item.isPagePreview === true;
        } else {
          return item.isPagePreview === false;
        }
      }
    );
  }
}

