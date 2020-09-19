import { Component, OnInit } from '@angular/core';
import { LogicService } from 'src/app/modules/shared/services/logic.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Payment } from '../../models/payments.model';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  result = '';
  formGroup: FormGroup;

  constructor(private logicService: LogicService, private formBuilder: FormBuilder, public store: StoreService) { }

  ngOnInit(): void {
    this.createForm();
    this.logicService.getResultObs().subscribe(res => this.result = res);
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
    console.log(this.store.payments);
  }

}
