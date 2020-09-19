import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LogicService } from 'src/app/modules/shared/services/logic.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {

  result = '';

  formGroup: FormGroup;

  grid = [[]];

  constructor(private formBuilder: FormBuilder, private logicService: LogicService) { }

  ngOnInit(): void {
    this.createForm();
    this.formGroup.get('letter').valueChanges.subscribe((val: string) => {
      if (val.length === 1) {
        this.logicService.selectedLetter = val;
        this.logicService.letterChange = true;
      } else {
        this.logicService.selectedLetter = null;
      }
    });

    this.logicService.getResultObs().subscribe(res => this.result = res);
    this.logicService.getGridObs().subscribe(res => this.grid = res);
    this.logicService.getCanLetterChange().subscribe(res => {
      if (res) {
        this.formGroup.get('letter').enable();
      } else {
        this.formGroup.get('letter').disable();
      }
    });
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      letter: [{ value: '', disabled: false }, [Validators.maxLength(1)]]
    });
  }

  start(): void {
    this.logicService.start();
  }

}
