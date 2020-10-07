import {Component, OnInit} from '@angular/core';
import orderBy from 'lodash/orderBy';
import { ICreateOrderRequest } from 'ngx-paypal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BillingService } from '../../../../shared/services/billing.service';
import { environment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  showCardView = true;
  cardForm: FormGroup;
  billings = [];
  paymentSubmitting = false;
  billingHistoryFetching = false;
  billingsColumns = [
    'date',
    'description',
    'amount',
    'action'
  ];
  public payPalConfig: any;
  showError = false;
  showSuccess = false;
  showCancel = false;
  page = 1;
  planTypes = [
    {
      type: 1,
      name: 'Silver Plan',
      amount: 500,
      slug: 'silver-plan',
    },
    {
      type: 2,
      name: 'Gold Plan',
      amount: 700,
      slug: 'gold-plan',
    },
  ];
  paymentFor = this.planTypes[0].name;
  planType = this.planTypes[0].type;
  paymentDescription = `Payment for ${this.paymentFor}`;
  amount = 0;
  changePlanClicked = 0;
  paymentMethod = 'STRIPE';
  currentSubscribedPlan = null;
  constructor(private fb: FormBuilder, private modalService: NgbModal,
              private billingService: BillingService,
              private toastrService: ToastrService,
              ) {
  }

  ngOnInit() {
    this.cardForm = this.fb.group({
      full_name: ['', Validators.required],
      card_number: ['', Validators.required],
      expiration_date: ['', Validators.required],
      cvv: ['', Validators.required],
      postal_code: ['', Validators.required]
    });
    const selectedPlan = this.planTypes.find(obj => {
      return obj.type === this.planType;
    });
    this.amount = selectedPlan.amount;
    this.initPaypalConfig();
    this.billingHistory();
    this.getCompanyBillingCurrentPlan();
  }

  initPaypalConfig = (): void => {
    this.payPalConfig = {
      currency: 'USD',
      clientId: environment.PAYPAL_CLIENT_ID,
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: this.amount.toString(),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.amount.toString()
              }
            }
          },
          items: [{
            name: this.paymentDescription,
            quantity: '1',
            category: 'DIGITAL_GOODS',
            description: this.paymentDescription,
            unit_amount: {
              currency_code: 'USD',
              value: this.amount.toString(),
            },
          }]
        }]
      },
      advanced: {
        commit: 'true',
        extraQueryParams: [ { name: 'disable-funding', value: 'card' } ]
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        actions.order.get().then(details => {
          if (details.status === 'APPROVED') {
            this.toastrService.success('Payment successful.', 'Success!');
            const paymentDetails = {
              full_name: details.payer.name.given_name + ' ' + details.payer.name.surname,
            };
            this.saveBilling(paymentDetails);
          }
        });
      },
      onClientAuthorization: (data) => {
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
      },
    };
  };

  resetStatus = (): void => {
    this.showCancel = this.showSuccess = this.showError = false;
  };

  sort = ({orderKey, orderDir}): void => this.billings = orderBy(this.billings, [orderKey], [orderDir]);

  cardViewActive = (): void => {
    this.showCardView = true;
    this.paymentMethod = 'STRIPE';
  }

  paypalViewActive = (): void => {
    this.showCardView = false;
    this.paymentMethod = 'PAYPAL';
  }

  openModal(content: any) {
    this.modalService.open(content, {centered: true});
  }

  sendFormPayment() {
      const paymentDetails = this.cardForm.value;
      this.saveBilling(paymentDetails);
  }

  saveBilling(paymentDetails) {
    this.paymentSubmitting = true;
    if (this.paymentMethod === 'STRIPE') {
      paymentDetails.payment_method = 1;
    } else if (this.paymentMethod === 'PAYPAL') {
      paymentDetails.payment_method = 2;
    } else {
      paymentDetails.payment_method = null;
    }
    paymentDetails.type = this.planType;
    paymentDetails.amount = this.amount;
    paymentDetails.description = this.paymentDescription;
    this.billingService.savePaymentDetails(paymentDetails).subscribe(
      res => {
        this.currentSubscribedPlan = this.planType;
        this.paymentSubmitting = false;
        this.billings = [res, ...this.billings];
        this.toastrService.success('Payment successful.', 'Success!');
        this.cardForm.reset();
      }
    );
  }

  saveCard(option) {
    this.modalService.dismissAll();
    if (!this.paymentRequired()) {
      this.toastrService.info(`${this.paymentFor} is already subscribed.`, 'Payment not required!');
      return false;
    }
    this.sendFormPayment();
    if (option === 'Yes') {
      const cardDetails = this.cardForm.value;
      this.paymentSubmitting = true;
      this.billingService.saveCard(cardDetails).subscribe(
        res => {
          this.paymentSubmitting = false;
        }
      );
    }
  }

  billingHistory() {
    this.billingHistoryFetching = true;
    this.billingService.getBillingHistory(this.page).subscribe(
      (data: any) => {
        this.billingHistoryFetching = false;
        this.billings = [...this.billings, ...data.results];
        const url = data.next;
        if (url) {
          this.page = url.substr(url.lastIndexOf('=') + 1);
        } else {
          this.page = null;
        }
      }
    );
  }

  changePlan(planName, triggerFrom = 'changePlanFromForm') {
    const plan = this.planTypes.find((value => {
      return value.name === planName;
    }));
    if (plan) {
      this.paymentFor = plan.name;
      this.paymentDescription = `Payment for ${this.paymentFor}`;
      this.amount = plan.amount;
      this.planType = plan.type;
      if (triggerFrom === 'currentPlan') {
        this.currentSubscribedPlan = plan.type;
      }
    } else {
      this.paymentFor = '';
      this.paymentDescription = '';
      this.amount = 0;
      this.planType = null;
    }
    if (triggerFrom === 'changePlanFromForm') {
      this.changePlanClicked = 0;
      if (this.paymentRequired()) {
        this.toastrService.success(`${this.paymentFor} selected. Please proceed for payment`, 'Success!');
      }
    } else if (triggerFrom === 'defaultPlan') {
      this.toastrService.success(`By default, You have ${this.paymentFor} selected. Please procced for payment`, 'Success!');
    }

    this.initPaypalConfig();
  }

  getPlanNameFromPlanType(type) {
    const plan = this.planTypes.find((value => {
      return value.type === type;
    }));
    if (plan) {
      return plan.name;
    }
    return '';
  }

  getCompanyBillingCurrentPlan() {
    this.billingService.getCompanyCurrentPlan().subscribe(
      (data: any) => {
        let name = '';
        if (data) {
          name = this.getPlanNameFromPlanType(data.type);
          if (name) {
            this.changePlan(name, 'currentPlan');
          }
        }
        if (!!data === false && !!name === false) {
          this.changePlan(this.paymentFor, 'defaultPlan');
        }
      }
    );
  }

  changePlanBtnClicked() {
    this.changePlanClicked = 1;
  }

  paymentRequired() {
    return this.currentSubscribedPlan !== this.planType;
  }
}
