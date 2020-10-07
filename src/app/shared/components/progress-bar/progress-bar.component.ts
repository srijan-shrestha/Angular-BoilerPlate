import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PasswordStrengthMeterService} from '../../services/password-strength-meter.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, OnChanges {

  @Input() value: any;

  @Input() password: string;

  @Input() minPasswordLength = 8;

  @Input() enableFeedback = false;

  @Output() strengthChange = new EventEmitter<number>();

  feedback: { suggestions: string[]; warning: string } = null;

  colors = ['#F44336', '#F44336', '#FDD835', '#FDD835', '#1E88E5'];

  public prevPasswordStrength = null;

  constructor(private passwordStrengthMeterService: PasswordStrengthMeterService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.password) {
      this.calculatePasswordStrength();
    }
  }

  private calculatePasswordStrength() {
    // TODO validation logic optimization
    if (!this.password) {
      this.value = 0;
    // } else if (this.password && this.password.length < this.minPasswordLength) {
    //   // } else if (this.password && this.password.length < this.minPasswordLength) {
    //   this.value = 0;
    } else {
      if (this.enableFeedback) {
        const result = this.passwordStrengthMeterService.scoreWithFeedback(
          this.password
        );
        this.value = result.score;
        this.feedback = result.feedback;
      } else {
        this.value = this.passwordStrengthMeterService.score(
          this.password
        );
        this.feedback = null;
      }
    }

    // Only emit the passwordStrength if it changed
    if (this.prevPasswordStrength !== this.value) {
      this.strengthChange.emit(this.value);
      this.prevPasswordStrength = this.value;
    }
  }

  getMeterFillColor(strength) {
    if (!strength || strength < 0 || strength > 5) {
      return this.colors[0];
    }

    return this.colors[strength];
  }
}
