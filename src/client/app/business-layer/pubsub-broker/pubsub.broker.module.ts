import { ModuleWithProviders, NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from '@angular/common';
import { BrokerActionBuilder }  from './services/broker.action.builder';
import { BrokerDispatcherService } from './services/broker.dispatcher.service';
import { BrokerPublisher } from './outlet/broker.publisher';

@NgModule({
    imports: [ CommonModule ],
    providers: [  BrokerActionBuilder,
                  BrokerDispatcherService,
                  BrokerPublisher]
})
export class PubSubBrokerModule {

  constructor(@Optional() @SkipSelf() parentModule: PubSubBrokerModule) {
    if (parentModule) {
      throw new Error('PubSubBroker already loaded; Import in root module only.');
    }
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PubSubBrokerModule,
      providers: [ BrokerActionBuilder,
                   BrokerDispatcherService,
                   BrokerPublisher ]
    }
  }

}