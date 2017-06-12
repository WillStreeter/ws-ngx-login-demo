import { Injectable } from '@angular/core';
import { BrokerPublisher } from '../outlet/broker.publisher';
import { BrokerAction  } from '../models/broker.action.model';
import { BrokerResponse } from "../models/broker.response.model";



@Injectable()
export class BrokerDispatcherService {

        constructor(private brokerPublisher:BrokerPublisher) {  }

        public dispatchBrokerAction(brokerAction:BrokerAction){
            this.brokerPublisher.NotifyBrokerActionConsumers(brokerAction)
        }


        public dispatchBrokerSelector(brokerType:string):BrokerResponse{
          return this.brokerPublisher.NotifyBrokerSelectorConsumer(brokerType)
        }


}