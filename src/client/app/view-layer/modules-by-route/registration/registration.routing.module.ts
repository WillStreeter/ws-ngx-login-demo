import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { DialogStateGuard, UsersessionGuard } from '../../../data-layer/ngrx-data/guards/index';


const regRoutes: Routes = [
  {   path: '',
      component: RegistrationComponent,
      canActivate: [ DialogStateGuard, UsersessionGuard ]
  }
];
@NgModule({
  imports: [   RouterModule.forChild(regRoutes) ],
  exports: [ RouterModule ]
})
export class RegistrationRoutingModule { }
