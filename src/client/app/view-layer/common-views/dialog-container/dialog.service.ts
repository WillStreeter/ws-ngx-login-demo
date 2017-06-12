import { Observable } from 'rxjs/Observable';
import { Injectable, ComponentFactoryResolver, ComponentRef, Inject, ViewContainerRef, ElementRef } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { DialogContainerComponent } from './dialog.container';
import { LoginContainerComponent } from '../login-container/login.container';
import { BrokerDispatcherService } from '../../../business-layer/pubsub-broker/services/broker.dispatcher.service';
import { BrokerResponse } from "../../../business-layer/pubsub-broker/models/broker.response.model";
import { BrokerList } from '../../../business-layer/brokerage/ngrx-stubs/brokerlist';


@Injectable()
export class DialogsService {
    layoutState$:Observable<any>;
    dialogRef:MdDialogRef<DialogContainerComponent>;
    pubSubSubscription = null;
    brokerRef:any;

    constructor(  private bDS:BrokerDispatcherService,
                  private dialog: MdDialog) {
                      let brokerResponse:BrokerResponse = this.bDS.dispatchBrokerSelector( BrokerList.BROKER_DIALOG_STORE);
                      this.brokerRef = brokerResponse.brokerRequested;
                      this.layoutState$ = this.brokerRef.storeObs.layoutState$;
                      this.serviceInit();
          }

    private serviceInit(){
          this.layoutState$.subscribe(state => {
            if(state.showLoginDialog) {

              /*
                 #TODO: substitute reference like LoginNGRxContainerComponent
                 #        for a string  loaded from store reducer
               */
                this.exposeDialog( LoginContainerComponent ).subscribe(res => {
                                  this.dialogRef = null;
                                  this.bDS.dispatchBrokerAction(this.brokerRef.storeDsp.HIDE_LOGIN_DIALOG);
                                });
             }else {
                 if(this.dialogRef ) {
                    this.dialogRef.close();
                 }
              }

         });
    }

    public exposeDialog(dialogComponent:any): Observable<boolean> {
          this.dialogRef = this.dialog.open(DialogContainerComponent);
          this.dialogRef.componentInstance.loadComponent(dialogComponent);
          return this.dialogRef.afterClosed();
    }

}
