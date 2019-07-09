import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from 'angular4-material-table';

@Injectable()
export class RemittanceValidatorService implements ValidatorService {
  getRowValidator(): FormGroup {
    return new FormGroup({
      'policyno': new FormControl(),
      'name': new FormControl(null, Validators.required),
      'employeeid': new FormControl(),
      'payment': new FormControl(null, Validators.required),
      });
  }
}