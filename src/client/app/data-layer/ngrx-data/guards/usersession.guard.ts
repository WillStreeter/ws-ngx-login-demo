import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/let';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import * as layoutActions from '../actions/layout.actions';
import * as fromRoot from '../reducers/index';

@Injectable()
export class UsersessionGuard implements CanActivate {

    constructor( private store: Store<fromRoot.State>, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (localStorage.getItem('Authorized')) {
            // logged in so return true

            if(state.url.indexOf('register')>0) {
               //I only want some one register once so I will prevent them from going to register
               //view if they are logged in
                this.router.navigateByUrl('/');
                return false;

            }else {
                //it is assumed they want to acccess surpise view
                return true;
            }
        }else if(state.url.indexOf('surprise')<0) {
                //it is assumed that you are trying to get to register page
                return true;
        }else {
            // not logged in so redirect to login page with the return url
            this.store.dispatch(new layoutActions.ShowLoginDialogAndSetRequestedURL(state.url));
            return false;
        }
    }
}
