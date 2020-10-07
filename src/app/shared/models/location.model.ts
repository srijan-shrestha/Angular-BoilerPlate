import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/core/adapter';

export class Location {

  id: number;
  name: string;

  constructor(
    id?: number,
    name?: string,
  ) {
    this.id = id;
    this.name = name;
  }
}

@Injectable({
  providedIn: 'root'
})
export class LocationAdapter implements Adapter<Location> {
  adapt(item: any): Location {
    return new Location(
      item.id,
      item.locationName
    );
  }
}
