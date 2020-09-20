import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: 'generator',
  loadChildren: () => import('./modules/generator/generator.module').then(m => m.GeneratorModule)
},
{
  path: 'payments',
  loadChildren: () => import('./modules/payments/payments.module').then(m => m.PaymentsModule)
},
{ path: '', redirectTo: '/generator', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
