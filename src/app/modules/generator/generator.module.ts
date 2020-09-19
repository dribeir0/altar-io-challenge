import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratorComponent } from './components/generator/generator.component';
import { GeneratorRoutingComponent } from './generator.routing';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [GeneratorComponent],
  imports: [
    CommonModule,
    GeneratorRoutingComponent,
    SharedModule
  ]
})
export class GeneratorModule { }
