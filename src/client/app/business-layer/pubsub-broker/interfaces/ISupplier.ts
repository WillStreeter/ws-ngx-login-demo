import { IConsumer } from './IConsumer';
import { BrokerAction  } from '../models/broker.action.model';
import { BrokerResponse  } from '../models/broker.response.model';
export interface ISupplier {
    RegisterBrokerConsumer(Consumer: IConsumer);
    RemoveBrokerConsumer(Consumer: IConsumer);
    NotifyBrokerActionConsumers(brokerAction:BrokerAction);
    NotifyBrokerSelectorConsumer(brokerType:string):BrokerResponse;
}