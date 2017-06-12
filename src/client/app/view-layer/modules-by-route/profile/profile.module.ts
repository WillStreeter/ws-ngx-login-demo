import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileRoutingModule } from './profile.routing.module';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
/**
 * Module for a user's details.
 * SharedModule is imported which will bring in MaterialModule
 */
@NgModule({
  imports: [CommonModule,
            MaterialModule,
            FlexLayoutModule,
            ProfileRoutingModule],
  declarations: [ProfileComponent],
  exports: [ProfileComponent, RouterModule, FlexLayoutModule]
})

export class ProfileModule { }

