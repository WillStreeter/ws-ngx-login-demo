import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect  } from '@ngrx/effects';
import { ErrorModel } from '../../../business-layer/models/error.model';

import * as errorActions from '../actions/error.actions';
import * as profileActions from '../actions/profile.actions';
import * as usersessionActions from '../actions/usersession.actions';



@Injectable()
export class ErrorEffects {


 @Effect() catchAllRemoteError$ = this.actions$
  .ofType(errorActions.ErrorTypes.REPORT_ERROR)
  .map(action => action.payload)
  .switchMap(payload => {
    let obs;

    switch(payload.action_type) {

     case profileActions.ProfileTypes.CHECK_USER_PROFILE_NAME_FAILURE:
      if(this.router.url.indexOf('register')>0) {
        obs = Observable.of( new profileActions.CheckUserProfileNameFailure(<ErrorModel> payload));
      }else {
        obs = Observable.of(this.router.navigateByUrl('/error'));
      }
     break;

     case usersessionActions.UserSessionTypes.LOGIN_USER_FAILURE:
       obs = Observable.of(new usersessionActions.UserLoginFailure(<ErrorModel> payload));
     break;

     default:{
       obs = Observable.of(this.router.navigateByUrl('/error'));
     }


    }
    return obs;
  });



    constructor(
        private actions$: Actions,
        private router: Router

    ) {  }


}
