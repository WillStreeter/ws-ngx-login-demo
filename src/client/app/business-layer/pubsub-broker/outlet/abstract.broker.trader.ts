
// Abstract classes came into the language with v1.6 around 10/2015
import { ISupplier } from "../interfaces/ISupplier";
import { IConsumer } from "../interfaces/IConsumer";
import { BrokerAction } from '../models/broker.action.model';
import { BrokerResponse } from "../models/broker.response.model";

export abstract class AbstractBrokerTrader implements ISupplier{

    // An array of IObservers. Register, Remove and Notify drive off this.
    // This has to be protected because the sub-classes need access to it.
    protected _consumers: IConsumer[];

    constructor() {
        this._consumers = [];
    }

    // This must be implemented by any subclasses.
    public abstract NotifyBrokerActionConsumers(brokerAction:BrokerAction);

    public abstract NotifyBrokerSelectorConsumer(brokerType:string):BrokerResponse;

    // The RegisterBrokderConsumer and RemoveConsumer are fully implemented.

    // Once registered, the consumer will be notified of any changes in state.
    public RegisterBrokerConsumer(consumer: IConsumer): void {
        this._consumers.push(consumer);
    }

    // Give the consumer a way to de-register
    public RemoveBrokerConsumer(consumer:IConsumer): void {
        let i = this._consumers.length;

        while (i--) {
            if (this._consumers[i] === consumer) {
                this._consumers.splice(i, 1);
            } // if we found it.
        }
    }
}

