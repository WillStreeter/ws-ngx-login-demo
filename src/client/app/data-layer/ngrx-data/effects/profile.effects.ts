import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect  } from '@ngrx/effects';
import * as errorActions from '../actions/error.actions';
import * as profileActions from '../actions/profile.actions';
import { UserServices } from '../../api-services/user.service';
import * as fromRoot from '../reducers/index';



@Injectable()
export class ProfileEffects {

 @Effect() registerUser$ = this.actions$
  .ofType(profileActions.ProfileTypes.REGISTER_USER_ATTEMPT)
  .map(action => action.payload)
  .switchMap(payload => this.userServices.registerUser( payload,
                                                        errorActions.ErrorTypes.REPORT_ERROR,
                                                        profileActions.ProfileTypes.REGISTER_USER_FAILURE,
                                                        profileActions.ProfileTypes.REGISTER_USER_SUCCESS));

 @Effect() getUserByName$ = this.actions$
  .ofType(profileActions.ProfileTypes.CHECK_USER_PROFILE_NAME_ATTEMPT)
  .map(action => action.payload)
  .switchMap(payload => this.userServices.getUserByName( payload,
                                                         errorActions.ErrorTypes.REPORT_ERROR,
                                                         profileActions.ProfileTypes.CHECK_USER_PROFILE_NAME_FAILURE,
                                                         profileActions.ProfileTypes.CHECK_USER_PROFILE_NAME_SUCCESS));

 @Effect()  getUserProfile$ = this.actions$
  .ofType( profileActions.ProfileTypes.GET_USER_PROFILE_ATTEMPT )
  .withLatestFrom( this.store.select(fromRoot.getProfileEntities) )
  .map( ([action, profileEntities]) => [ action.payload, profileEntities ] )
  .switchMap(([username, profileEntities]) => {
    const existsInStore = Object.keys(profileEntities).filter(
                               entity=> {
                                            if(profileEntities[entity].username === username) {
                                              return profileEntities[entity];
                                            }
                                        });
    let obs;
    if(existsInStore && existsInStore.length>0 ) {
      obs =  Observable.of( new profileActions.SetProfileSelectedId(existsInStore[0]));
    }else {
      obs = this.userServices.getUserByName( username,
                                             errorActions.ErrorTypes.REPORT_ERROR,
                                             profileActions.ProfileTypes.CHECK_USER_PROFILE_NAME_FAILURE,
                                             profileActions.ProfileTypes.GET_USER_PROFILE_SUCCESS );
    }
    return obs;
  });


 constructor( private store:Store<fromRoot.State>,
              private userServices: UserServices,
              private actions$: Actions
             ) {  }
}
