import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesComponent } from '../../common-views/custom-validators/control.messaging.component';
import { ValidationService } from '../../../business-layer/validators/services/validation.service';
import { RegistrationComponent } from './registration.component';
import { RegistrationRoutingModule } from './registration.routing.module';

/**
 * Module for a user's details.
 * SharedModule is imported which will bring in MaterialModule
 */
@NgModule({
  imports: [ CommonModule,
             MaterialModule,
             RouterModule,
             ReactiveFormsModule,
             RegistrationRoutingModule,
             FlexLayoutModule],
  providers: [ ValidationService ],
  declarations: [ RegistrationComponent,
                  ControlMessagesComponent],
  exports: [RegistrationComponent]
})

export class RegistrationModule { }
