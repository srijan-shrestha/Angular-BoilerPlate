import {Component, Input} from '@angular/core';
import {CdkStepper} from '@angular/cdk/stepper';

@Component({
  selector: 'app-custom-stepper',
  templateUrl: './custom-stepper.component.html',
  styleUrls: ['./custom-stepper.component.scss'],
  providers: [{provide: CdkStepper, useExisting: CustomStepperComponent}]
})
export class CustomStepperComponent extends CdkStepper {
  @Input() files;
  @Input() stepperFromCulturePhoto = true;
  @Input() title = null;

  @Input()
  set activeIndex(index) {
    this.onClick(0);
  }

  onClick(index: number): void {
    if (this.files.length) {
      this.selectedIndex = index;
    }
  }

  goForward(stepper: CdkStepper) {
    stepper.next();
  }

  goBack(stepper: CdkStepper) {
    stepper.previous();
  }

}
