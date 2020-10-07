import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ChangeDetectorRef } from '@angular/core';
import { StructureColumnComponent } from '../structure-column/structure-column.component';
import { Division } from 'src/app/shared/models/division.model';
import { Location } from 'src/app/shared/models/location.model';
import { UserCardComponent } from 'src/app/shared/components/user-card/user-card.component';

@Component({
  selector: 'app-structure-column-division',
  templateUrl: './structure-column-division.component.html',
  styleUrls: ['./structure-column-division.component.scss']
})
export class StructureColumnDivisionComponent extends StructureColumnComponent implements OnInit {

  private pDivisions: Division[];
  @Input() selected: Division;

  divisionCardHover: Division;

  @Output() divisionSelected = new EventEmitter<Division>();

  sortedLocations: {
    location: Location,
    divisions: Division[],
    collapse: boolean,
  }[] = [];

  get divisions() {
    return this.pDivisions;
  }

  @Input()
  set divisions(divisions: Division[]) {
    this.pDivisions = divisions;

    const l = {};
    divisions.forEach((division) => {
      if (!(division.location.id in l)) {
        l[division.location.id] = {
          location: division.location,
          divisions: [division],
          collapse: true
        };
      } else {
        l[division.location.id].divisions.push(division);
      }
      // TODO: sort by location name.
    });

    this.sortedLocations = [];
    Object.entries(l).forEach((x: any) => {
      this.sortedLocations.push(x[1]);
    });

  }

  constructor(
    private elDivision: ElementRef,
    private cd: ChangeDetectorRef,
  ) {
    super(elDivision, cd);
  }

  ngOnInit() {
  }

  showCardHoverOptions(division) {
    this.divisionCardHover = division;
  }

  hideCardHoverOptions() {
    this.divisionCardHover = undefined;
  }

  onDivisionSelected(division: Division, event) {
    this.divisionSelected.emit(division);
    // this.currentY = event.currentTarget.getBoundingClientRect();
    // this.onCoordinateUpdated(event.currentTarget.getBoundingClientRect());
  }
}
