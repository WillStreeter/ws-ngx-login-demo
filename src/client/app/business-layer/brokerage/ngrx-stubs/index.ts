/**
 * This barrel file provides current brokers
 */
 import { BrokerDialogStore } from './broker.dialog.store';
import { BrokerLoginStore } from  './broker.login.store';
import { BrokerNavStore } from  './broker.nav.store';
import { BrokerRegistrationStore } from  './broker.registration.store';
import { BrokerProfileStore }  from './broker.profile.store';


export const BROKER_PROVIDERS: any[] = [
  BrokerDialogStore,
  BrokerLoginStore,
  BrokerNavStore,
  BrokerRegistrationStore,
  BrokerProfileStore
];



export * from './broker.dialog.store';
export * from './broker.login.store';
export * from './broker.nav.store';
export * from './broker.registration.store';
export * from './broker.profile.store';

