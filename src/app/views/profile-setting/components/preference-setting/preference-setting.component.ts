import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {ProfileSettingService} from '../../services/profile-setting.service';
import {UserPreferenceSettings} from '../../../../shared/models/user-preference-settings';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../../shared/services/auth.service';
import {ProfileService} from '../../../../shared/services/profile.service';

@Component({
  selector: 'app-preference-setting',
  templateUrl: './preference-setting.component.html',
  styleUrls: ['./preference-setting.component.scss']
})
export class PreferenceSettingComponent implements OnInit, OnDestroy {

  preferenceSettingsForm: FormGroup;
  isAdmin = false;

  preferenceSettings: UserPreferenceSettings;

  subscription;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private profileSettingService: ProfileSettingService,
    private toastrService: ToastrService,
    public authService: AuthService,
    private profileService: ProfileService,
  ) {
  }

  ngOnInit() {
    this.preferenceSettingsForm = this.fb.group({
      setting: this.fb.group({
        emailAlertNotification: this.fb.group({
          value: [{value: false, disabled: true}, []],
          // playbookUpdates: [{value: false, disabled: true}, []],
          // goalsInitiativeUpdates: [{value: false, disabled: true}, []],
          playbookPublished: [{value: false, disabled: true}, []],
          // accountStatusChange: [{value: false, disabled: true}, []],
          dateReminders: this.fb.group({
            value: [{value: false, disabled: true}, []],
            oneWeekBeforeDue: [{value: false, disabled: true}, []],
            twoWeeksBeforeDue: [{value: false, disabled: true}, []],
            threeWeeksBeforeDue: [{value: false, disabled: true}, []],
          })
        }),
        adminNotification: this.fb.group({
          value: [{value: false, disabled: true}, []],
          newEmployeeAdded: [{value: false, disabled: true}, []],
          // userStatusChanges: [{value: false, disabled: true}, []],
          // securityAlerts: [{value: false, disabled: true}, []],
          subscriptionChanges: [{value: false, disabled: true}, []],
          billingCharges: [{value: false, disabled: true}, []],
          photosUploaded: [{value: false, disabled: true}, []],
        }),
      }),
      user: new FormControl()
    });
    this.getPreferenceSettings();
    this.subscription = this.preferenceSettingsForm.get('setting.emailAlertNotification.value').valueChanges.subscribe(
      (value) => {
        this.handleEmailNotificationChange(value);
        this.handleDateReminderChange(this.preferenceSettingsForm.get('setting.emailAlertNotification.dateReminders.value').value, value);
      }
    );
    this.subscription = this.preferenceSettingsForm.get('setting.emailAlertNotification.dateReminders.value').valueChanges.subscribe(
      value => this.handleDateReminderChange(value, this.preferenceSettingsForm.get('setting.emailAlertNotification.value').value)
    );
    this.subscription = this.preferenceSettingsForm.get('setting.adminNotification.value').valueChanges.subscribe(
      value => {
        this.handleAdminNotificationChange(value);
      }
    );
    this.profileService.getProfile().subscribe(user => this.preferenceSettingsForm.patchValue({user: user.id}));
    this.setIsAdmin();
  }

  getPreferenceSettings() {
    this.profileSettingService.getPreferenceSettings().subscribe((res) => {
      this.preferenceSettings = res;
      this.patchPreferenceSettings();
    });
  }

  setIsAdmin = () => {
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  };

  patchPreferenceSettings() {
    if (this.preferenceSettings.id) {
      this.preferenceSettingsForm.patchValue({
        setting: {
          emailAlertNotification: {
            value: this.preferenceSettings.setting.emailAlertNotification.value,
            // playbookUpdates: this.preferenceSettings.setting.emailAlertNotification.playbookUpdates,
            // goalsInitiativeUpdates: this.preferenceSettings.setting.emailAlertNotification.goalsInitiativeUpdates,
            playbookPublished: this.preferenceSettings.setting.emailAlertNotification.playbookPublished,
            // accountStatusChange: this.preferenceSettings.setting.emailAlertNotification.accountStatusChange,
            dateReminders: {
              value: this.preferenceSettings.setting.emailAlertNotification.dateReminders ?
                this.preferenceSettings.setting.emailAlertNotification.dateReminders.value : false,
              oneWeekBeforeDue: this.preferenceSettings.setting.emailAlertNotification.dateReminders ?
                this.preferenceSettings.setting.emailAlertNotification.dateReminders.oneWeekBeforeDue : false,
              twoWeeksBeforeDue: this.preferenceSettings.setting.emailAlertNotification.dateReminders ?
                this.preferenceSettings.setting.emailAlertNotification.dateReminders.twoWeeksBeforeDue : false,
              threeWeeksBeforeDue: this.preferenceSettings.setting.emailAlertNotification.dateReminders ?
                this.preferenceSettings.setting.emailAlertNotification.dateReminders.threeWeeksBeforeDue : false,
            },
          },
          adminNotification: {
            value: this.preferenceSettings.setting.adminNotification.value,
            newEmployeeAdded: this.preferenceSettings.setting.adminNotification.newEmployeeAdded ?
              this.preferenceSettings.setting.adminNotification.newEmployeeAdded : false,
            // userStatusChanges: this.preferenceSettings.setting.adminNotification.userStatusChanges ?
            //   this.preferenceSettings.setting.adminNotification.userStatusChanges : false,
            // securityAlerts: this.preferenceSettings.setting.adminNotification.securityAlerts ?
            //   this.preferenceSettings.setting.adminNotification.securityAlerts : false,
            photosUploaded: this.preferenceSettings.setting.adminNotification.photosUploaded ?
              this.preferenceSettings.setting.adminNotification.photosUploaded : false,
            subscriptionChanges: this.preferenceSettings.setting.adminNotification.subscriptionChanges ?
              this.preferenceSettings.setting.adminNotification.subscriptionChanges : false,
            billingCharges: this.preferenceSettings.setting.adminNotification.billingCharges ?
              this.preferenceSettings.setting.adminNotification.billingCharges : false,
          },
        },
      });
    }
  }

  handleDateReminderChange(dateRemainder: boolean, emailAlert: boolean): void {
    const oneWeekBeforeDueCtrl = this.preferenceSettingsForm.get('setting.emailAlertNotification.dateReminders.oneWeekBeforeDue');
    const twoWeeksBeforeDueCtrl = this.preferenceSettingsForm.get('setting.emailAlertNotification.dateReminders.twoWeeksBeforeDue');
    const threeWeeksBeforeDueCtrl = this.preferenceSettingsForm.get('setting.emailAlertNotification.dateReminders.threeWeeksBeforeDue');

    if (dateRemainder && emailAlert) {
      oneWeekBeforeDueCtrl.enable();
      twoWeeksBeforeDueCtrl.enable();
      threeWeeksBeforeDueCtrl.enable();
    } else {
      oneWeekBeforeDueCtrl.disable();
      twoWeeksBeforeDueCtrl.disable();
      threeWeeksBeforeDueCtrl.disable();
    }
  }

  handleEmailNotificationChange(value: boolean): void {
    const playbookUpdatesCtrl = this.preferenceSettingsForm.get('setting.emailAlertNotification.playbookUpdates');
    const goalsInitiativeUpdatesCtrl = this.preferenceSettingsForm.get('setting.emailAlertNotification.goalsInitiativeUpdates');
    const playbookPublishedCtrl = this.preferenceSettingsForm.get('setting.emailAlertNotification.playbookPublished');
    const accountStatusChangeCtrl = this.preferenceSettingsForm.get('setting.emailAlertNotification.accountStatusChange');
    const dateRemindersCtrl = this.preferenceSettingsForm.get('setting.emailAlertNotification.dateReminders');

    if (value) {
      // playbookUpdatesCtrl.enable();
      // goalsInitiativeUpdatesCtrl.enable();
      playbookPublishedCtrl.enable();
      // accountStatusChangeCtrl.enable();
      dateRemindersCtrl.enable();
    } else {
      // playbookUpdatesCtrl.disable();
      // goalsInitiativeUpdatesCtrl.disable();
      playbookPublishedCtrl.disable();
      // accountStatusChangeCtrl.disable();
      dateRemindersCtrl.disable();
    }
  }

  handleAdminNotificationChange(value: boolean): void {
    const newEmployeeAddedCtrl = this.preferenceSettingsForm.get('setting.adminNotification.newEmployeeAdded');
    const userStatusChangesCtrl = this.preferenceSettingsForm.get('setting.adminNotification.userStatusChanges');
    const securityAlertsCtrl = this.preferenceSettingsForm.get('setting.adminNotification.securityAlerts');
    const subscriptionChangesCtrl = this.preferenceSettingsForm.get('setting.adminNotification.subscriptionChanges');
    const billingChargesCtrl = this.preferenceSettingsForm.get('setting.adminNotification.billingCharges');
    const photosUploadedCtrl = this.preferenceSettingsForm.get('setting.adminNotification.photosUploaded');

    if (value) {
      newEmployeeAddedCtrl.enable();
      // userStatusChangesCtrl.enable();
      // securityAlertsCtrl.enable();
      subscriptionChangesCtrl.enable();
      billingChargesCtrl.enable();
      photosUploadedCtrl.enable();
    } else {
      newEmployeeAddedCtrl.disable();
      // userStatusChangesCtrl.disable();
      // securityAlertsCtrl.disable();
      subscriptionChangesCtrl.disable();
      billingChargesCtrl.disable();
      photosUploadedCtrl.disable();
    }
  }

  updatePreferenceSettings() {
    this.loading = true;
    this.profileSettingService.updatePreferenceSettings(this.preferenceSettingsForm.getRawValue()).subscribe((res) => {
      this.toastrService.success('User preference settings updated successfully.', 'Success!');
      this.loading = false;
    }, () => {
      this.loading = false;
      this.toastrService.error('Unable to update user preference settings.', 'Error!');
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
