import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [HomeRoutingModule, FlexLayoutModule],
  declarations: [HomeComponent],
  exports: [HomeComponent, FlexLayoutModule]
})
export class HomeModule { }
