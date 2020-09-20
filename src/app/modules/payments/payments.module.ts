import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './components/payments/payments.component';
import { PaymentsRoutingComponent } from './payments.routing';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [PaymentsComponent],
  imports: [
    CommonModule,
    PaymentsRoutingComponent,
    SharedModule
  ]
})
export class PaymentsModule { }
