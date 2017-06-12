import { Injectable } from '@angular/core';
import { BrokerAction  } from '../models/broker.action.model'



@Injectable()
export class BrokerActionBuilder{

       create( actionType?:string,brokerType?:string, payLoad?:any):BrokerAction{

         var brokerAction:BrokerAction = new BrokerAction();
         brokerAction.actionType = actionType;
         brokerAction.brokerType = brokerType;
         brokerAction.payLoad =  payLoad;

         return brokerAction;
       }



}