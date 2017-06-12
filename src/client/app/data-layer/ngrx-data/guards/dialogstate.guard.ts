import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/let';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {  CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import * as layoutActions from '../actions/layout.actions';
import * as fromRoot from '../reducers/index';

@Injectable()
export class DialogStateGuard implements CanActivate {

    constructor( private store: Store<fromRoot.State>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        this.store.select(fromRoot.getShowLoginDialog).take(1).subscribe( (dialogOpen) => {
                if(dialogOpen) {
                    this.store.dispatch(new layoutActions.HideLoginDialog());
                }
        });

        return true;
    }
}
