import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundPageComponent } from './notfound.page.component';
import { DialogStateGuard } from '../../../data-layer/ngrx-data/guards/dialogstate.guard';

const routes: Routes = [
  {  path: '**',
     component: NotfoundPageComponent,
     canActivate: [ DialogStateGuard ]
  }
];
@NgModule({
  imports: [   RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class NotfoundPageRoutingModule { }
