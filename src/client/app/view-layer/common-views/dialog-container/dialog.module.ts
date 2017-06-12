import { DialogsService } from './dialog.service';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';

import { DialogContainerComponent }  from './dialog.container';
import { LoginContainerComponent } from '../login-container/login.container';


@NgModule({
    imports: [
        FormsModule,
        FlexLayoutModule,
        MaterialModule
    ],
    exports: [
        FlexLayoutModule,
        LoginContainerComponent,
        DialogContainerComponent
    ],
    declarations: [
        LoginContainerComponent,
        DialogContainerComponent,
    ],
    providers: [
        DialogsService
    ],
    entryComponents: [
        LoginContainerComponent,
        DialogContainerComponent
    ]

})
export class DialogsModule { }
