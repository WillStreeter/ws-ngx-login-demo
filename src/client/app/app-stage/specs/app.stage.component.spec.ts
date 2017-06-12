import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import {  HttpModule } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import {
  async
} from '@angular/core/testing';
import {
  Route
} from '@angular/router';
import {
  RouterTestingModule
} from '@angular/router/testing';



import { UserServices } from '../../data-layer/api-services/user.service';
import { HttpWrapperService } from '../../data-layer/api-services/http.wrapper.service';


import { HomeModule }  from '../../view-layer/modules-by-route/home/home.module';
import { SurpriseModule }  from '../../view-layer/modules-by-route/surprise/surprise.module';
import { ProfileModule }  from '../../view-layer/modules-by-route/profile/profile.module';
import { NotfoundPageModule }  from '../../view-layer/modules-by-route/notfound/notfound.page.module';
import { RegistrationModule } from '../../view-layer/modules-by-route/registration/registration.module';
import { MastheadModule } from '../../view-layer/common-views/masthead/masthead.module';


import { AppStageComponent } from '../app.stage.component';
import { HomeComponent } from '../../view-layer/modules-by-route/home/home.component';
import { ProfileComponent } from '../../view-layer/modules-by-route/profile/profile.component';
import { SurpriseComponent } from '../../view-layer/modules-by-route/surprise/surprise.component';
import { RegistrationComponent } from '../../view-layer/modules-by-route/registration/registration.component';
import { NotfoundPageComponent }  from '../../view-layer/modules-by-route/notfound/notfound.page.component';
import { UsersessionGuard, DialogStateGuard } from '../../data-layer/ngrx-data/guards/index';


import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from  '../../data-layer/ngrx-data/reducers/index';

import { ErrorEffects } from '../../data-layer/ngrx-data/effects/error.effects';
import { ProfileEffects } from '../../data-layer/ngrx-data/effects/profile.effects';
import { UserSessionEffects } from '../../data-layer/ngrx-data/effects/usersession.effects';


export function main() {

  describe('App stage component', () => {

    let config: Route[] = [
      { path: '', component: HomeComponent },
      { path: 'surprise', component: SurpriseComponent },
      { path: 'register', component: RegistrationComponent },
      { path: 'profile/username', component: ProfileComponent },
      { path: '**', component: NotfoundPageComponent }
    ];
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BrowserAnimationsModule,
                  HttpModule,
                  MastheadModule,
                  HomeModule,
                  SurpriseModule,
                  ProfileModule,
                  NotfoundPageModule,
                  RegistrationModule,
                  StoreModule.provideStore(reducer),
                  RouterStoreModule.connectRouter(),
                  EffectsModule.run(ErrorEffects),
                  EffectsModule.run(ProfileEffects),
                  EffectsModule.run(UserSessionEffects),
                  RouterTestingModule.withRoutes(config)],
        declarations: [ TestComponent,
                        AppStageComponent],
        providers: [
          { provide: APP_BASE_HREF, useValue: '/' },
            MockBackend,
            BaseRequestOptions,
            ConnectionBackend,
            UsersessionGuard,
            DialogStateGuard,
            HttpWrapperService,
            UserServices
        ]
      });
    });

    it('should build without a problem',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let compiled = fixture.nativeElement;

            expect(compiled).toBeTruthy();
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-app-stage></sd-app-stage>'
})

class TestComponent {}

