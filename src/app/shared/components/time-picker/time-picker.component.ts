import { Component, OnInit, Input, Injectable } from '@angular/core';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';

const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;


// @Injectable()
// export class NgbTimeStringAdapter extends TimePickerComponent<string> {

//   fromModel(value: string| null): NgbTimeStruct | null {
//     if (!value) {
//       return null;
//     }
//     const split = value.split(':');
//     return {
//       hour: parseInt(split[0], 10),
//       minute: parseInt(split[1], 10),
//       second: parseInt(split[2], 10)
//     };
//   }

//   toModel(time: NgbTimeStruct | null): string | null {
//     return time != null ? `${pad(time.hour)}:${pad(time.minute)}:${pad(time.second)}` : null;
//   }
// }
// @Component({
//   selector: 'app-time-picker',
//   templateUrl: './time-picker.component.html',
//   styleUrls: ['./time-picker.component.scss'],
//   providers: [{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}]
// })
// export class TimePickerComponent  {
//   time = {hour: 13, minute: 30};
//   timeString = '';
//   @Input() size: 'small' | 'medium' | 'large' = 'medium';
//   @Input() meridian: '' | true = '' ;
//   @Input() seconds = false;
//   @Input() spinners = true;
//   @Input() readonlyInputs = false;

//   constructor() { }

//   // ngOnInit() {
//   //   const now = new Date();
//   //   this.time = {hour: now.getHours(), minute: now.getMinutes()};
//   //   this.timeString = this.time.hour + '-' + this.time.minute;
//   // }

// }


@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {

  fromModel(value: string| null): NgbTimeStruct | null {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }

  toModel(time: NgbTimeStruct | null): string | null {
    return time != null ? `${pad(time.hour)}:${pad(time.minute)}` : null;
  }
}


@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will want to provide your main App Module
  providers: [{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}]
})
export class TimePickerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() meridian: '' | true = '' ;
  @Input() seconds = false;
  @Input() spinners = true;
  @Input() readonlyInputs = false;
  time: '13:30:00';

  open = () => document.getElementById('dropdownTimePicker').click();
}


