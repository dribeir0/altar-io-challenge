import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Payment } from '../models/payments.model';
import { State } from '../models/state.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private _state: BehaviorSubject<State> = new BehaviorSubject({
    result: '0',
    payments: [],
    currentGrid: [[]],
    canLetterChange: true
  });
  state$ = this._state.asObservable();

  constructor() { }

  get state(): State {
    return this._state.getValue();
  }

  set state(val: State) {
    this._state.next(val);
  }

  addPayment(payment: Payment): void {
    this.state.payments.push(payment);
    this.state = { ...this.state };
  }

  setResult(result: string): void {
    this.state.result = result;
    this.state = { ...this.state };
  }

  setGrid(grid: number[][]): void {
    this.state.currentGrid = grid;
    this.state = { ...this.state };
  }

  setCanLetterChange(value: boolean): void {
    this.state.canLetterChange = value;
    this.state = { ...this.state };
  }

}
