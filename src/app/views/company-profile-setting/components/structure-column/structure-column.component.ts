import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user.model';
import { UserCardComponent } from 'src/app/shared/components/user-card/user-card.component';

@Component({
  selector: 'app-structure-column',
  templateUrl: './structure-column.component.html',
  styleUrls: ['./structure-column.component.scss']
})
export class StructureColumnComponent implements OnInit {
  @Input() background: 'light' | 'dark' = 'light';

  @Input() parentY: number;  // y coodinate of parent
  currentY: number;  // y coodinate of clicked elem
  currentHeaderY: number; // y coordinate of parent elem

  @Output() selectedY = new EventEmitter<number>();
  @Output() selectedHeaderY = new EventEmitter<number>();

  // This is set to true when next column has a selected value.
  @Input() showNextArrow: boolean;

  @Input() selectedNewUserCard: UserCardComponent;

  selectedHeaderElem: Element;
  selectedUserCardElem: Element;

  constructor(private element: ElementRef, public changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
  }

  // onCoordinateUpdated(cardRect?: DOMRect, headerCardRect?: DOMRect) {
  //   const pRect: DOMRect = this.element.nativeElement.getBoundingClientRect();
  //   if (headerCardRect) {
  //     this.currentHeaderY = headerCardRect.y - pRect.y + (headerCardRect.height / 2);
  //   } else {
  //     this.currentHeaderY = undefined;
  //   }
  //   if (cardRect) {
  //     this.currentY = cardRect.y - pRect.y + (cardRect.height / 2);
  //     console.log("CURRENT Y >> ", this.currentY);
  //     this.selectedY.emit(this.currentY);
  //   } else {
  //     this.currentY = undefined;
  //     this.selectedY.emit(undefined);
  //   }
  // }

  updateSelectedHeaderElem(e: Element) {
    this.selectedHeaderElem = e;
  }

  updateSelectedUserCardElem(e: Element) {
    this.selectedUserCardElem = e;
  }

  updateCoordinate() {
    this.changeDetector.detectChanges();
    const pRect: DOMRect = this.element.nativeElement.getBoundingClientRect();
    if (this.selectedHeaderElem) {
      setTimeout(() => {
        const headerCardRect = this.selectedHeaderElem.getBoundingClientRect() as DOMRect;
        this.currentHeaderY = headerCardRect.y - pRect.y + (headerCardRect.height / 2);
      }, 100);
    } else {
      this.currentHeaderY = undefined;
    }

    if (this.selectedUserCardElem) {
      const cardRect = this.selectedUserCardElem.getBoundingClientRect() as DOMRect;
      if (cardRect.y) {
        this.currentY = cardRect.y - pRect.y + (cardRect.height / 2);
      } else {
        this.selectedUserCardElem = undefined;
        this.currentY = undefined;
      }
    } else {
      this.currentY = undefined;
    }
    setTimeout(() => {
      this.selectedHeaderY.emit(this.currentHeaderY);
      this.selectedY.emit(this.currentY);
      this.changeDetector.detectChanges();
    });
  }

}
