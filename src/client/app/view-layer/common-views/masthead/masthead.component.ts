import { Component,
    OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DialogsService } from '../dialog-container/dialog.service';
import { BrokerDispatcherService } from '../../../business-layer/pubsub-broker/services/broker.dispatcher.service';
import { BrokerResponse } from "../../../business-layer/pubsub-broker/models/broker.response.model";
import { BrokerList } from '../../../business-layer/brokerage/ngrx-stubs/brokerlist';



@Component({
    moduleId: module.id,
    selector: 'mast-head',
    templateUrl: 'masthead.component.html',
    styleUrls: ['masthead.component.css']
})
export class MastheadComponent implements OnInit, OnDestroy {

    hasLoggedInUser$: Observable<boolean>;
    userSessionSub:Subscription;
    routerSub:any;
    surpisePath:boolean = false;
    homePath:boolean = false;
    myName:string =null;
    brokerRef:any;



    constructor(private location:Location,
                private dialogService:DialogsService,
                private router: Router,
                private bDS:BrokerDispatcherService) {

        var brokerResponse:BrokerResponse = this.bDS.dispatchBrokerSelector(BrokerList.BROKER_NAV_STORE);
        this.brokerRef = brokerResponse.brokerRequested;
    }

    ngOnInit() {

        this.hasLoggedInUser$ = this.brokerRef.storeObs.hasLoggedInUser$;

        this.userSessionSub = this.brokerRef.storeObs.usersessionState$.subscribe( state => {
            if(state.token){
                this.myName = 'profile/username/'+state.user.username;
            }
        });


        this.routerSub = this.router.events.subscribe((val) => {
            if(this.location.path() !== '') {
                this.surpisePath = (this.location.path()).indexOf('surprise')>0?true:false;
                this.homePath = true;
            }else {
                this.homePath = false;
                this.surpisePath = false;
            }
        });
    }

    requestLogin() {
        if(this.router.url.indexOf('register')) {
            this.router.navigateByUrl('/');
        }

        this.bDS.dispatchBrokerAction(this.brokerRef.storeDsp.SHOW_LOGIN_DIALOG);
    }

    requestLogout() {
        this.bDS.dispatchBrokerAction(this.brokerRef.storeDsp.LOGOUT_USER_ATTEMPT);
    }




    ngOnDestroy() {
        if(this.routerSub) {
            this.routerSub.unsubscribe();
        }
        if(this.userSessionSub){
            this.userSessionSub.unsubscribe();
        }
    }
}
