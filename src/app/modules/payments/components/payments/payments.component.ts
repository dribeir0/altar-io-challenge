import { Component, OnInit } from '@angular/core';
import { LogicService } from 'src/app/modules/shared/services/logic.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StoreService } from 'src/app/modules/shared/services/store.service';
import { State } from 'src/app/modules/shared/models/state.model';
import { Payment } from 'src/app/modules/shared/models/payments.model';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  result = '';
  formGroup: FormGroup;
  payments: Payment[] = [];

  constructor(private logicService: LogicService, private formBuilder: FormBuilder, public store: StoreService) { }

  ngOnInit(): void {
    this.createForm();
    this.store.state$.subscribe((res: State) => {
      this.result = res.result;
      this.payments = res.payments;
    });
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      amount: [null, [Validators.required]]
    });
  }

  submit(): void {
    this.store.addPayment({
      name: this.formGroup.get('name').value,
      amount: this.formGroup.get('amount').value,
      code: +this.result,
      grid: [...this.logicService.getCurrentGrid()]
    });
  }

  sendToApi(): void {
    console.log(this.store.state.payments);
  }

}
