import { BrokerAction } from '../models/broker.action.model';
import { BrokerResponse } from '../models/broker.response.model';
export interface IConsumer {
        ReceiveBrokerAction(notification: BrokerAction): void;
        ReceivedBrokerSelectorRequest(brokerType:string): BrokerResponse;
}

