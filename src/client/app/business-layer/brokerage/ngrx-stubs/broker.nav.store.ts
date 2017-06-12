
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
export class BrokerNavStore {
    brokerLabel:string = BrokerList.BROKER_NAV_STORE;
    constructor( private store: Store<fromRoot.State>,
                 private brkrActnBuilder:BrokerActionBuilder ) { }

    getComponentSupplies():any{
       return  Object.assign({
                   brokerLabel:this.brokerLabel,
                   storeObs:{
                       hasLoggedInUser$:this.store.select(fromRoot.hasLoggedInUser),
                       usersessionState$: this.store.select(fromRoot.getUsersessionState)
                      },
                   storeDsp:{
                       SHOW_LOGIN_DIALOG:this.brkrActnBuilder.create( LayoutActionTypes.SHOW_LOGIN_DIALOG,
                                                           this.brokerLabel,
                                                          null),
                       LOGOUT_USER_ATTEMPT:this.brkrActnBuilder.create( UserSessionActionTypes.LOGOUT_USER_ATTEMPT,
                                                            this.brokerLabel,
                                                            null)
                      }
                    });

    }

    dispatchAction(brokerAction:BrokerAction):void {
        switch(brokerAction.actionType){
            case LayoutActionTypes.SHOW_LOGIN_DIALOG:
                 this.store.dispatch(new layoutActions.ShowLoginDialog());
            break;
            case UserSessionActionTypes.LOGOUT_USER_ATTEMPT:
                 this.store.dispatch(new userSessionAction.UserLogoutAttempt());
            break;
        }
    }


}
