/**
 * Created by willstreeter on 5/23/17.
 */

import {Injectable} from "@angular/core";
import { Store } from "@ngrx/store";

import { BrokerActionBuilder }  from '../../pubsub-broker/services/broker.action.builder';
import { BrokerAction  } from '../../pubsub-broker/models/broker.action.model'
import * as fromRoot from '../../../data-layer/ngrx-data/reducers/index';
import * as profileActions from '../../../data-layer/ngrx-data/actions/profile.actions';
import * as ProfileActionTypes from '../../shared-types/actions/profile.action.types';
import { BrokerList } from './brokerlist';

@Injectable()
export class BrokerProfileStore {
    brokerLabel:string = BrokerList.BROKER_PROFILE_STORE;
    constructor( private store: Store<fromRoot.State>,
                 private brkrActnBuilder:BrokerActionBuilder ) { }

    getComponentSupplies():any{
       return  Object.assign({
                   brokerLabel:this.brokerLabel,
                   storeObs:{
                       userProfile$:this.store.select(fromRoot.getSelectedProfile)
                      },
                   storeDsp:{
                       GET_USER_PROFILE_ATTEMPT:this.brkrActnBuilder.create( ProfileActionTypes.GET_USER_PROFILE_ATTEMPT,
                                                           this.brokerLabel,
                                                           null)
                      }
                    });
    }

    dispatchAction(brokerAction:BrokerAction):void {
        switch(brokerAction.actionType){
            case ProfileActionTypes.GET_USER_PROFILE_ATTEMPT:
                 this.store.dispatch(new profileActions.GetUserProfileAttempt(brokerAction.payLoad));
            break;
        }
    }


}
