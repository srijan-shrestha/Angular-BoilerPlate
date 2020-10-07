import { Component, OnInit, Input } from '@angular/core';
import { Theme } from '../../models/themes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-playbook-theme-preview',
  templateUrl: './playbook-theme-preview.component.html',
  styleUrls: ['./playbook-theme-preview.component.scss']
})
export class PlaybookThemePreviewComponent implements OnInit {

@Input() themes;
theme: any;

  constructor( public ngModal: NgbModal) {
   }

  ngOnInit() {
    this.theme = this.themes[0];

  }

  updateNextPrev(isNext) {
    const totalThemes = this.themes.length;
    const currentThemeId = this.theme.id;
    if (isNext) {
      this.theme = this.themes[(this.themes.indexOf(currentThemeId) + 1) % totalThemes];
    } else {
      this.theme = this.themes[(this.themes.indexOf(currentThemeId) - 1) % totalThemes];
    }
  }

}
