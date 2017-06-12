import { ISupplier } from "../interfaces/ISupplier";
import { IConsumer } from "../interfaces/IConsumer";
import { BrokerAction } from '../models/broker.action.model';
import { BrokerResponse } from "../models/broker.response.model";

export abstract class AbstractBrokerTrader implements ISupplier{

    protected _consumers: IConsumer[];

    constructor() {
        this._consumers = [];
    }
    public abstract NotifyBrokerActionConsumers(brokerAction:BrokerAction);

    public abstract NotifyBrokerSelectorConsumer(brokerType:string):BrokerResponse;


    public RegisterBrokerConsumer(consumer: IConsumer): void {
        this._consumers.push(consumer);
    }

    public RemoveBrokerConsumer(consumer:IConsumer): void {
        let i = this._consumers.length;

        while (i--) {
            if (this._consumers[i] === consumer) {
                this._consumers.splice(i, 1);
            }
        }
    }
}

