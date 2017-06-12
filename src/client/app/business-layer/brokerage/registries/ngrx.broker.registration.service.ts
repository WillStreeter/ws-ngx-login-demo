import { Injectable } from '@angular/core';
import { BrokerPublisher } from '../../pubsub-broker/outlet/broker.publisher';
import { NGRxBrokerConsumer }  from '../consumers/ngrx.broker.consumer';


@Injectable()
export class  NGRxBrokerRegistrationService {

      constructor(  private ngrxBrokerConsumer: NGRxBrokerConsumer,
                    private brokerPublisher:BrokerPublisher){
                    this.brokerPublisher.RegisterBrokerConsumer(this.ngrxBrokerConsumer);
      }

}

