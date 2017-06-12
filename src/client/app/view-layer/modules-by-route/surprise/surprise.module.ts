
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurpriseComponent } from './surprise.component';
import { SurpriseRoutingModule } from './surprise.routing.module';

@NgModule({
    imports:[   CommonModule,
              SurpriseRoutingModule ],
    declarations: [SurpriseComponent],
    exports: [SurpriseComponent]
})
export class SurpriseModule { }
