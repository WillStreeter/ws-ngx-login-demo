/**
 * Created by willstreeter on 5/23/17.
 */

import {Injectable} from "@angular/core";
import { Store } from "@ngrx/store";
import { BrokerActionBuilder}  from '../../pubsub-broker/services/broker.action.builder';
import { BrokerAction  } from '../../pubsub-broker/models/broker.action.model'
import * as fromRoot from '../../../data-layer/ngrx-data/reducers/index';
import * as profileActions from '../../../data-layer/ngrx-data/actions/profile.actions';
import * as ProfileActionTypes from '../../shared-types/actions/profile.action.types';
import { BrokerList } from './brokerlist';

@Injectable()
export class BrokerRegistrationStore {
    brokerLabel:string = BrokerList.BROKER_REGISTRATION_STORE;
    constructor( private store: Store<fromRoot.State>,
                 private brkrActnBuilder:BrokerActionBuilder ) { }

    getComponentSupplies():any{
       return  Object.assign({
                   brokerLabel:this.brokerLabel,
                   storeObs:{
                       layoutRequestedUrl$:this.store.select(fromRoot.getRequestedURL),
                       profileState$:this.store.select(fromRoot.getProfilesState),
                       hasLoggedInUser$:this.store.select(fromRoot.hasLoggedInUser)
                      },
                   storeDsp:{
                       RESET_USER_PROFILE_NAME_VALID:this.brkrActnBuilder.create(  ProfileActionTypes.RESET_USER_PROFILE_NAME_VALID,
                                                           this.brokerLabel,
                                                          null),
                       REGISTER_USER_ATTEMPT:this.brkrActnBuilder.create( ProfileActionTypes.REGISTER_USER_ATTEMPT,
                                                            this.brokerLabel,
                                                            null),
                       CHECK_USER_PROFILE_NAME_ATTEMPT:this.brkrActnBuilder.create( ProfileActionTypes.CHECK_USER_PROFILE_NAME_ATTEMPT,
                                                            this.brokerLabel,
                                                            null)
                      }
                    });

    }

    dispatchAction(brokerAction:BrokerAction):void {
        switch(brokerAction.actionType){
            case ProfileActionTypes.RESET_USER_PROFILE_NAME_VALID:
                 this.store.dispatch(new profileActions.ResetUserNameVailid());
            break;
            case ProfileActionTypes.REGISTER_USER_ATTEMPT:
                 this.store.dispatch(new profileActions.UserRegistrationAttempt(brokerAction.payLoad));
            break;
            case ProfileActionTypes.CHECK_USER_PROFILE_NAME_ATTEMPT:
                 this.store.dispatch(new profileActions.CheckUserProfileNameAttempt(brokerAction.payLoad));
            break;
        }
    }


}
