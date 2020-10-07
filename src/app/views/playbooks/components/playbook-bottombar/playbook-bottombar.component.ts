import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlayBookService} from '../../../../shared/services/playbook.service';

@Component({
  selector: 'app-playbook-bottombar',
  templateUrl: './playbook-bottombar.component.html',
  styleUrls: ['./playbook-bottombar.component.scss']
})
export class PlaybookBottombarComponent implements OnInit {
  @Input() state: 'expanded' | 'normal' | 'hidden' = 'normal';
  @Output() stateUpdated: EventEmitter<any> = new EventEmitter();

  currentTab: 'layouts' | 'images' = 'layouts';

  constructor(private playbookService: PlayBookService, private elRef: ElementRef) {
  }

  ngOnInit() {
    this.playbookService.imageActive.subscribe(response => {
      this.changeTab(response);
    });
    this.playbookService.bottomBarActive.subscribe(response => {
      this.changeState(response);
    });
  }

  changeTab(tab: 'layouts' | 'images') {
    if (this.state === 'hidden') {
      this.changeState('normal');
    }
    this.currentTab = tab;
  }

  changeState(state: 'expanded' | 'normal' | 'hidden') {
    this.stateUpdated.emit(state);
  }

  toggleShowHide() {
    // document.body.scrollTop = document.body.offsetTop;
    // document.body.scrollTop = 1067;

    if (this.state === 'hidden') {
      this.changeState('normal');
      setTimeout(() => {
        window.scrollTo(0, 1800);
      }, 150);
    } else {
      this.changeState('hidden');
    }

  }
}
