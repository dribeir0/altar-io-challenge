import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Payment } from '../models/payments.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {


  private _payments: BehaviorSubject<Payment[]> = new BehaviorSubject([]);
  paymentsObs$ = this._payments.asObservable();

  constructor() { }

  get payments(): Payment[] {
    return this._payments.getValue();
  }

  set payments(val: Payment[]) {
    this._payments.next(val);
  }

  addPayment(payment: Payment): void {
    this.payments = [
      ...this.payments,
      payment
    ];
  }

}
