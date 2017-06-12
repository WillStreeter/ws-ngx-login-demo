import { Injectable } from '@angular/core';
import { BrokerAction  } from '../../pubsub-broker/models/broker.action.model';

import { IConsumer } from '../../pubsub-broker/interfaces/IConsumer'

import {  BrokerResponse } from "../../pubsub-broker/models/broker.response.model";
import {  BrokerDialogStore,
          BrokerLoginStore,
          BrokerNavStore,
          BrokerRegistrationStore,
          BrokerProfileStore }  from "../ngrx-stubs/index";


@Injectable()
export class NGRxBrokerConsumer implements IConsumer{

    constructor(  private brokerDialogStore:BrokerDialogStore,
                  private brokerLoginStore:BrokerLoginStore,
                  private brokerNavStore:BrokerNavStore,
                  private brokerRegistrationStore:BrokerRegistrationStore,
                  private brokerProfileStore:BrokerProfileStore   ){ }

    public ReceiveBrokerAction( brokerAction:BrokerAction){
        switch(brokerAction.brokerType){
            case this.brokerDialogStore.brokerLabel:
                  this.brokerDialogStore.dispatchAction(brokerAction);
            break;
            case this.brokerLoginStore.brokerLabel:
                  this.brokerLoginStore.dispatchAction(brokerAction);
            break;

            case this.brokerNavStore.brokerLabel:
                  this.brokerNavStore.dispatchAction(brokerAction);
            break;

            case this.brokerRegistrationStore.brokerLabel:
                  this.brokerRegistrationStore.dispatchAction(brokerAction);
            break;

            case this.brokerProfileStore.brokerLabel:
                  this.brokerProfileStore.dispatchAction(brokerAction);
            break;
        }
    }



    public ReceivedBrokerSelectorRequest( brokerType:string):BrokerResponse{
        var brokerResponse = new BrokerResponse();
        switch(brokerType){
            case this.brokerDialogStore.brokerLabel:
                  brokerResponse.brokerRequested = this.brokerDialogStore.getComponentSupplies();
            break;

            case this.brokerLoginStore.brokerLabel:
                  brokerResponse.brokerRequested = this.brokerLoginStore.getComponentSupplies();
            break;

            case this.brokerNavStore.brokerLabel:
                  brokerResponse.brokerRequested = this.brokerNavStore.getComponentSupplies();
            break;

            case this.brokerRegistrationStore.brokerLabel:
                  brokerResponse.brokerRequested = this.brokerRegistrationStore.getComponentSupplies();
            break;

            case this.brokerProfileStore.brokerLabel:
                  brokerResponse.brokerRequested = this.brokerProfileStore.getComponentSupplies();
            break;
        }
        return brokerResponse;
    }

}