import { ModuleWithProviders, NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from '@angular/common';

import { NGRxBrokerConsumer }  from './consumers/ngrx.broker.consumer';
import { NGRxDataModule } from "../../data-layer/ngrx-data/ngrx.data.module";


import { BROKER_PROVIDERS }  from './ngrx-stubs/index';


@NgModule({
    imports: [ CommonModule,
               NGRxDataModule ],
    providers: [ ...BROKER_PROVIDERS,
                 NGRxBrokerConsumer]
})
export class BrokerageModule {

  constructor(@Optional() @SkipSelf() parentModule: BrokerageModule) {
    if (parentModule) {
      throw new Error('PubSubBrokerageModule already loaded; Import in root module only.');
    }
  }


  static forRoot(): ModuleWithProviders{
    return {
      ngModule: BrokerageModule,
      providers: [  ...BROKER_PROVIDERS,
                    NGRxBrokerConsumer ]
    }
  }

}