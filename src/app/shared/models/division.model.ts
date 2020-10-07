import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/core/adapter';
import { Location, LocationAdapter } from './location.model';


export class Division {

  id: number;
  location: Location;
  name: string;

  constructor(
    id?: number,
    location?: Location,
    name?: string
  ) {
    this.id = id;
    this.location = location;
    this.name = name;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DivisionAdapter implements Adapter<Division> {
  constructor(
    private locationAdapter: LocationAdapter
  ) {}

  adapt(item: any): Division {
    return new Division(
      item.id,
      this.locationAdapter.adapt(item.location),
      item.name
    );
  }
}
