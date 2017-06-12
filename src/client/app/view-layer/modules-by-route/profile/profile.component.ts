import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BrokerResponse } from '../../../business-layer/pubsub-broker/models/broker.response.model';
import { BrokerDispatcherService } from '../../../business-layer/pubsub-broker/services/broker.dispatcher.service';
import { BrokerList } from '../../../business-layer/brokerage/ngrx-stubs/brokerlist';

import 'rxjs/add/operator/let';

/**
 * User's information as profile
 */
@Component({
    moduleId: module.id,
    selector: 'sd-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})


export class ProfileComponent implements OnInit, OnDestroy {
      subscribeHandler:any;
      userProfile$:Observable<any>;
      brokerRef:any;

      constructor( private activatedRoute:ActivatedRoute,
                    private bDS:BrokerDispatcherService) {

                    var brokerResponse:BrokerResponse = this.bDS.dispatchBrokerSelector(BrokerList.BROKER_PROFILE_STORE);
                    this.brokerRef = brokerResponse.brokerRequested;
                 }

      ngOnInit() {
          this.userProfile$ = this.brokerRef.storeObs.userProfile$;

          this.subscribeHandler  =  this.activatedRoute.params.subscribe(params => {
                 var note =  this.brokerRef.storeDsp.GET_USER_PROFILE_ATTEMPT;
                 note.payLoad =  params['username'];
                 this.bDS.dispatchBrokerAction(note);
              });
      }


      ngOnDestroy() {
        if(this.subscribeHandler) {
           this.subscribeHandler.unsubscribe();
        }
      }
}
