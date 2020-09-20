import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { State } from 'src/app/modules/shared/models/state.model';
import { LogicService } from 'src/app/modules/shared/services/logic.service';
import { StoreService } from 'src/app/modules/shared/services/store.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {

  result = '';
  formGroup: FormGroup;
  grid = [[]];
  canChange = false;

  constructor(private formBuilder: FormBuilder, private logicService: LogicService, private store: StoreService) { }

  ngOnInit(): void {
    this.createForm();
    this.formGroup.get('letter').valueChanges.subscribe((val: string) => {
      if (val.length === 1) {
        this.logicService.setSelectedLetter(val);
      } else {
        this.logicService.setSelectedLetter(null);
      }
    });

    this.store.state$.subscribe((res: State) => {
      this.result = res.result;
      this.grid = res.currentGrid;
      this.canChange = res.canLetterChange;
    });
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      letter: [null, [Validators.maxLength(1)]]
    });
  }

  start(): void {
    this.logicService.start();
  }

}
