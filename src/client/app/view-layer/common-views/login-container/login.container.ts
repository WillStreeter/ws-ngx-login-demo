import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { SessionModel } from '../../../business-layer/models/session.model';
import { BrokerDispatcherService } from '../../../business-layer/pubsub-broker/services/broker.dispatcher.service';
import { BrokerResponse } from "../../../business-layer/pubsub-broker/models/broker.response.model";
import { BrokerList } from '../../../business-layer/brokerage/ngrx-stubs/brokerlist';

@Component({
  moduleId: module.id,
  selector: 'login-container',
  templateUrl: 'login.container.html',
  styleUrls: ['login.container.css']
})
export class LoginContainerComponent implements OnInit,  OnDestroy {
  layoutSub:Subscription;
  userSessionSub:Subscription;
  public user:SessionModel;
  public errorMsg = '';
  private requestedUrl:string;
  requestedStarted:boolean;
   brokerRef:any;

  constructor(  private router: Router,
                public  dialogRef:MdDialogRef<any>,
                private bDS:BrokerDispatcherService) {

          var brokerResponse:BrokerResponse = this.bDS.dispatchBrokerSelector(BrokerList.BROKER_LOGIN_STORE);
          this.brokerRef = brokerResponse.brokerRequested;
  }

  ngOnInit() {
      this.user = <SessionModel>{};
      this.layoutSub = this.brokerRef.storeObs.layoutState$.subscribe(state => {
          this.requestedUrl = state.requestedURL;
      });


      this.userSessionSub = this.brokerRef.storeObs.userSessionState$.subscribe(state => {
             if(state.token) {
                  this.requestedStarted = false;
                  this.dialogRef.close();
                  if( this.requestedUrl) {
                      this.router.navigateByUrl(this.requestedUrl);
                  }
              }else if(state.errorMessage) {
                 this.errorMsg = state.errorMessage;
                 this.user = <SessionModel>{};
              }
      });
  }


  onLoginKeyUp() {
    if(this.errorMsg && this.requestedStarted ) {
         this.requestedStarted = false;
         this.errorMsg = '';
    }
    if(this.layoutSub) {
       this.layoutSub.unsubscribe();
    }
   }



  login() {
     if(!this.requestedStarted) {
         this.requestedStarted = true;
         var note = this.brokerRef.storeDsp.LOGIN_USER_ATTEMPT;
         note.payLoad =  <SessionModel>(this.user);
         this.bDS.dispatchBrokerAction(note);
     }
  }

  registrationRequest() {
        this.requestedStarted = false;
        this.router.navigateByUrl('register');
  }

  ngOnDestroy() {
      if(this.userSessionSub) {
           this.userSessionSub.unsubscribe();
      }
      if(this.layoutSub) {
           this.layoutSub.unsubscribe();
      }
  }
}
