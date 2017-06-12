import { NgModule, } from '@angular/core';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

//data layer
import { NGRxDataModule } from '../data-layer/ngrx-data/ngrx.data.module';

import { NGRxBrokerRegistrationService } from '../business-layer/brokerage/registries/ngrx.broker.registration.service';

//business layer ngrx pubsub-broker brokerage
import { BrokerageModule }   from '../business-layer/brokerage/brokerage.module';
// handle request from viewlayer to the store by way of a brokerage
import { PubSubBrokerModule }   from '../business-layer/pubsub-broker/pubsub.broker.module';


/*
  Page views
 */
import { HomeModule }  from '../view-layer/modules-by-route/home/home.module';
import { NotfoundPageModule }  from '../view-layer/modules-by-route/notfound/notfound.page.module';
import { MastheadModule } from '../view-layer/common-views/masthead/masthead.module';


/*
     Smart Container (components that reference ngrx Store)
 */
import { AppStageComponent } from './app.stage.component';
import { AppStageRoutingModule } from './app.stage.routing.module';

/*
   Just for development and demonstration purposes I have including the following in this branch
   so as to create a static git hub page for blog/demo presentations... In general, I believe this is not
   a good practice
 */

import { fakeBackendProvider } from '../shared-utils/dev-mocked-backend/index';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

@NgModule({
  declarations: [ AppStageComponent ],
  imports: [
             CommonModule,
             BrowserModule,
             BrowserAnimationsModule,
             HttpModule,
             NGRxDataModule.forRoot(),
             PubSubBrokerModule.forRoot(),
             BrokerageModule.forRoot(),
             AppStageRoutingModule,
             MastheadModule,
             HomeModule,
             NotfoundPageModule,
             FlexLayoutModule
           ],
  providers: [
    NGRxBrokerRegistrationService,


    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions,
   {
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
   }],
  bootstrap: [ AppStageComponent ]

})

export class AppStageModule {
    constructor(private ngrxBRS:NGRxBrokerRegistrationService){}
}
