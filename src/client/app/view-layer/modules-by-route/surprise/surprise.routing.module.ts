import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurpriseComponent } from './surprise.component';
import { UsersessionGuard } from '../../../data-layer/ngrx-data/guards/usersession.guard';



const surpriseRoutes: Routes = [
  {
    path: '',
    component: SurpriseComponent,
    canActivate: [ UsersessionGuard ]
  }
];

@NgModule({
  imports: [   RouterModule.forChild(surpriseRoutes) ],
  exports: [RouterModule]
})
export class SurpriseRoutingModule { }
