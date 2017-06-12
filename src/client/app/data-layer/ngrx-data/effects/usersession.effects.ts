import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect  } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import * as usersessionActions from '../actions/usersession.actions';
import * as errorActions from '../actions/error.actions';
import { UserServices } from '../../api-services/user.service';



@Injectable()
export class UserSessionEffects {

  @Effect()  startAppClearUser$  = Observable.of(new usersessionActions.AppStartLoginClear());


  @Effect() loginUser$ = this.actions$
   .ofType(usersessionActions.UserSessionTypes.LOGIN_USER_ATTEMPT)
   .map(action => action.payload)
   .switchMap(payload => this.userServices.loginUser( payload,
                                                      errorActions.ErrorTypes.REPORT_ERROR,
                                                      usersessionActions.UserSessionTypes.LOGIN_USER_FAILURE,
                                                      usersessionActions.UserSessionTypes.LOGIN_USER_SUCCESS));

  @Effect() logoutUser$  = this.actions$
   .ofType(usersessionActions.UserSessionTypes.LOGOUT_USER_ATTEMPT)
   .map(action => action.payload)
   .switchMap(payload => this.userServices.logoutUser( errorActions.ErrorTypes.REPORT_ERROR,
                                                       usersessionActions.UserSessionTypes.LOGOUT_USER_FAILURE,
                                                       usersessionActions.UserSessionTypes.LOGOUT_USER_SUCCESS));


  @Effect() logoutUserSuccess$  = this.actions$
   .ofType(usersessionActions.UserSessionTypes.LOGOUT_USER_SUCCESS)
   .map(action => action.payload)
   .switchMap((payload)=> Observable.of(this.router.navigateByUrl('/')));


 @Effect() removeErrorModleCheckUserFailure$ = this.actions$
   .ofType(usersessionActions.UserSessionTypes.LOGIN_USER_FAILURE)
   .map(action => action.payload)
   .switchMap(payload =>  Observable.of(new errorActions.RemoveError(payload)));

  constructor(
              private userServices: UserServices,
              private actions$: Actions,
              private router: Router
             ) {  }


}
