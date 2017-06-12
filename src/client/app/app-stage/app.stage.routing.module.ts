import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


  export const routes:Routes = [
                  {
                      path: '',
                      loadChildren: 'app/view-layer/modules-by-route/home/home.module#HomeModule'
                  },
                  {
                      path: 'error',
                      loadChildren: 'app/view-layer/modules-by-route/notfound/notfound.page.module#NotfoundPageModule'
                  },
                  {
                      path: 'register',
                      loadChildren: 'app/view-layer/modules-by-route/registration/registration.module#RegistrationModule'
                  },
                  {
                      path: 'profile/username/:username',
                      loadChildren:  'app/view-layer/modules-by-route/profile/profile.module#ProfileModule'
                  },
                  {
                      path: 'surprise',
                      loadChildren: 'app/view-layer/modules-by-route/surprise/surprise.module#SurpriseModule'
                  },
              ];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppStageRoutingModule { }

