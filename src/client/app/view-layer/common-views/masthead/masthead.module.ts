
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MastheadComponent } from './masthead.component';
import { MaterialModule } from '@angular/material';
import { DialogsModule } from '../dialog-container/dialog.module';
import { DialogsService } from '../dialog-container/dialog.service';


@NgModule({
    imports: [ RouterModule,
               RouterModule,
               CommonModule,
               MaterialModule,
               DialogsModule,
               FlexLayoutModule ],
    declarations: [ MastheadComponent ],
    exports: [MastheadComponent],
    providers: [ DialogsService ]
})

export class MastheadModule { }
