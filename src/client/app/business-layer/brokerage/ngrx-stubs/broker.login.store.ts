/**
 * Created by willstreeter on 5/23/17.
 */

import {Injectable} from "@angular/core";
import { Store } from "@ngrx/store";

import { BrokerActionBuilder }  from '../../pubsub-broker/services/broker.action.builder';
import { BrokerAction  } from '../../pubsub-broker/models/broker.action.model'
import * as fromRoot from '../../../data-layer/ngrx-data/reducers/index';
import * as layoutActions from '../../../data-layer/ngrx-data/actions/layout.actions';
import * as LayoutActionTypes from '../../shared-types/actions/layout.action.types';
import * as userSessionAction from '../../../data-layer/ngrx-data/actions/usersession.actions';
import * as UserSessionActionTypes from '../../shared-types/actions/usersession.action.types';
import { BrokerList } from './brokerlist';


@Injectable()
export class BrokerLoginStore {
    brokerLabel:string = BrokerList.BROKER_LOGIN_STORE;
    constructor( private store: Store<fromRoot.State>,
                 private brkrActnBuilder:BrokerActionBuilder ) { }

    getComponentSupplies():any{
       return  Object.assign({
                   brokerLabel:this.brokerLabel,
                   storeObs:{
                       layoutState$: this.store.select(fromRoot.getLayoutState),
                       userSessionState$: this.store.select(fromRoot.getUsersessionState)
                      },
                   storeDsp:{
                       LOGIN_USER_ATTEMPT:this.brkrActnBuilder.create(  UserSessionActionTypes.LOGIN_USER_ATTEMPT,
                                                             this.brokerLabel,
                                                             null)
                      }
                    });

    }

    dispatchAction(brokerAction:BrokerAction):void {
        switch(brokerAction.actionType){
            case UserSessionActionTypes.LOGIN_USER_ATTEMPT:
                 this.store.dispatch(new userSessionAction.UserLoginAttempt(brokerAction.payLoad));
            break;
        }
    }


}

