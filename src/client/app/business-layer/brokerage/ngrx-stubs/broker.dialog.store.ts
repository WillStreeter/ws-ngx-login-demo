import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { BrokerActionBuilder }  from '../../pubsub-broker/services/broker.action.builder';
import { BrokerAction  } from '../../pubsub-broker/models/broker.action.model'
import * as fromRoot from '../../../data-layer/ngrx-data/reducers/index';
import * as layoutActions from '../../../data-layer/ngrx-data/actions/layout.actions';
import * as LayoutActionTypes from '../../shared-types/actions/layout.action.types';
import { BrokerList } from './brokerlist';


@Injectable()
export class BrokerDialogStore {
    brokerLabel:string = BrokerList.BROKER_DIALOG_STORE;
    constructor( private store: Store<fromRoot.State>,
                 private brkrActnBuilder:BrokerActionBuilder ) { }

    getComponentSupplies():any{
       return  Object.assign({
                   brokerLabel:this.brokerLabel,
                   storeObs:{
                        layoutState$:this.store.select(fromRoot.getLayoutState),
                        usersessionState$: this.store.select(fromRoot.getUsersessionState)
                      },
                   storeDsp:{
                       HIDE_LOGIN_DIALOG:this.brkrActnBuilder.create( LayoutActionTypes.HIDE_LOGIN_DIALOG,
                                                           this.brokerLabel,
                                                          null)
                      }
                    });

    }

    dispatchAction(brokerAction:BrokerAction):void {
        switch(brokerAction.actionType){
            case LayoutActionTypes.HIDE_LOGIN_DIALOG:
                 this.store.dispatch(new layoutActions.HideLoginDialog());
            break;
        }
    }
}


