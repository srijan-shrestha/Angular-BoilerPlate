import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-add-to-gallery-wizard',
  templateUrl: './add-to-gallery-wizard.component.html',
  styleUrls: ['./add-to-gallery-wizard.component.scss'],
  animations: [
    trigger('slideAnimation', [
      transition('void => bottom', [
        style({transform: 'translateY(55%)', opacity: 0}),
        animate('10ms ease-in-out', style({transform: 'translateY(25%)', opacity: 9}))
      ]),
      transition('bottom => void', [
        style({transform: 'translateY(0)', opacity: 1}),
        animate('250ms ease-in-out', style({transform: 'translateY(25%)', opacity: 0}))
      ]),
      transition('void => left', [
        style({transform: 'translateX(-25%)', opacity: 0}),
        animate('250ms ease-in-out', style({transform: 'translateX(0)', opacity: 0}))
      ]),
      transition('left => void', [
        style({transform: 'translateX(0)', opacity: 1}),
        animate('250ms ease-in-out', style({transform: 'translateX(-25%)', opacity: 0}))
      ])
    ])
  ]
})
export class AddToGalleryWizardComponent implements OnInit {
  currentGallery:String = "";
  selectedGallery: any;
  @Input() fileLength;
  @Input() galleryList;

  @Input() position = 'bottom';

  @Input() hasSecondaryNav = false;

  @Output() galarySelected = new EventEmitter();

  @Output() showChange = new EventEmitter();
  _show = false;

  get show() {
    return this._show;
  }

  showSheet(){
    this.show= true;
  }

  @Input('show')
  set show(value: boolean) {
    this._show = value;
    this.showChange.emit(this._show);
  }


  constructor() {
  }

  ngOnInit() {}

  close() {
    this.show = false;
  }


  getGalleryInfo(gallery) {
    this.selectedGallery = gallery;
    console.log(gallery);
    // console.log(gallery);
    this.galarySelected.emit(gallery);

  }

  updateGalleryInfo() {
  this.show = false;
  }
}
