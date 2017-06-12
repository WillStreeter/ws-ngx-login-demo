import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { StoreModule, Store, Action  } from '@ngrx/store';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing/index';
import { TestBed, fakeAsync, async, tick, inject, ComponentFixture } from '@angular/core/testing';
import { ErrorEffects } from '../error.effects';
import { ErrorModel } from '../../../../business-layer/models/error.model';
import { reducer } from '../../reducers/index';
import * as fromRoot from '../../reducers/index';

import { SurpriseModule }  from '../../../../view-layer/modules-by-route/surprise/surprise.module';
import { ProfileModule }  from '../../../../view-layer/modules-by-route/profile/profile.module';
import { RegistrationModule } from '../../../../view-layer/modules-by-route/registration/registration.module';

import * as errorActions from '../../actions/error.actions';
import * as usersessionActions from '../../actions/usersession.actions';
import { AppStageComponent } from  '../../../../app-stage/app.stage.component';
import { HomeComponent } from '../../../../view-layer/modules-by-route/home/home.component';
import { NotfoundPageComponent } from '../../../../view-layer/modules-by-route/notfound/notfound.page.component';
import { MastheadModule } from '../../../../view-layer/common-views/masthead/masthead.module';


import { DialogStateGuard } from '../../guards/index';

export function main() {
  let comp:    NotfoundPageComponent;
  let fixture: ComponentFixture<AppStageComponent>;
   describe('Effects: ErrorEffects', () => {
      beforeEach( async(()=> {
        TestBed.configureTestingModule(
          {
              imports: [
                 EffectsTestingModule,
                 SurpriseModule,
                 ProfileModule,
                 MastheadModule,
                 RegistrationModule,
                 StoreModule.provideStore(reducer),
                 RouterTestingModule.withRoutes( [
                  {
                      path: 'error',
                      component: NotfoundPageComponent
                  }])
              ],

              declarations: [
                NotfoundPageComponent,
                AppStageComponent,
                HomeComponent
              ],
              providers: [
                ErrorEffects,
                DialogStateGuard
              ]
          })
          .compileComponents();
      }));
      function setup() {

         const  _store:Store<fromRoot.State> = TestBed.get(Store);


         let setUpState = {
           runner: TestBed.get(EffectsRunner),
           errorEffects: TestBed.get(ErrorEffects),
           router:TestBed.get(Router),
           location:TestBed.get(Location)
         };

         return setUpState;
      }

    it('should return a usersessionActions.UserLoginFailure, with  error1',fakeAsync( ()=>  {

           const error1 =  { id: '111',
                             action_type:usersessionActions.LOGIN_USER_FAILURE ,
                             message:'Bad username or password' } as ErrorModel;


           const { runner, errorEffects, router, location} = setup();

           const expectedResult =  new usersessionActions.UserLoginFailure(error1);

           runner.queue( new errorActions.ReportError(error1));

           errorEffects.catchAllRemoteError$.subscribe( result => {
                expect(result).toEqual(expectedResult);
           });
        })
    );

     it('should return an observable of router location "/error", with  error2', fakeAsync( () => {
          const error2 = {id: '222',
                          action_type:'random error',
                          message:'bad api call' } as ErrorModel;
          const { runner, errorEffects, router, location} = setup();

          fixture = TestBed.createComponent(AppStageComponent);
          comp = fixture.componentInstance;

          runner.queue( new errorActions.ReportError(error2));
          let result = null;
          errorEffects.catchAllRemoteError$.subscribe(_result => {

              console.log(' error effect re_resultsult', _result);
             return result = _result; });
              tick(250);
              expect(location.path()).toBe('/error');
        })
    );
  });

}
