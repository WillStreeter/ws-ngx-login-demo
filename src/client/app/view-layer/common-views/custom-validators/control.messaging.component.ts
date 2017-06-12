import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../../../business-layer/validators/services/validation.service';

@Component({
  selector: 'control-messages',
    styles: ['div { color:#D73117 }'],
  template: `<div *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})

export class ControlMessagesComponent {
  @Input() control: FormControl;

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if(this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }
}
