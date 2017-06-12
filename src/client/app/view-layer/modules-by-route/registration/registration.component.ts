import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AugmentedValidators } from '../../../business-layer/validators/augmented.validator';
import { emailMatcher } from '../../../business-layer/validators/services/email.validator.service';
import { RegistrationModel } from '../../../business-layer/models/registration.model';

import { BrokerDispatcherService } from '../../../business-layer/pubsub-broker/services/broker.dispatcher.service';
import { BrokerResponse } from '../../../business-layer/pubsub-broker/models/broker.response.model';
import { BrokerList } from '../../../business-layer/brokerage/ngrx-stubs/brokerlist';
import { Subscription } from 'rxjs';
/**
 * This represents a Github user's details component.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
})


export class RegistrationComponent implements OnInit, OnDestroy {
  newUser: FormGroup;
  storeStateSub :any;
  layoutRequestedUrlSub:Subscription;
  hasLoggedInUserSub:Subscription;
  profileStateSub:Subscription;
  userloggedIn:boolean;
  usernameComplete:boolean = false;
  validUserName:boolean    = false;
  userNameAttempt:boolean  = false;
  brokerRef:any;
  private requestedUrl:string;


  constructor( private  fb: FormBuilder,
               private router: Router,
               private bDS:BrokerDispatcherService) {

          var brokerResponse:BrokerResponse = this.bDS.dispatchBrokerSelector(BrokerList.BROKER_REGISTRATION_STORE);
          this.brokerRef = brokerResponse.brokerRequested;
  }


  ngOnInit() {

       this.layoutRequestedUrlSub = this.brokerRef.storeObs.layoutRequestedUrl$.subscribe(value => {
            this.requestedUrl = value;
       });

       this.hasLoggedInUserSub = this.brokerRef.storeObs.hasLoggedInUser$.subscribe(value => {
            this.userloggedIn = value;
            if( this.userloggedIn ) {
              if( this.requestedUrl ) {
                  this.router.navigateByUrl( this.requestedUrl );
              }else {
                  let newuserName = this.newUser.get('name').get('username').value;
                  this.router.navigate(['profile/username/', newuserName]);
              }
          }
       });

       this.profileStateSub = this.brokerRef.storeObs.profileState$.subscribe(state => {
              if(state.validUserName === 'valid') {
                  this.usernameComplete = true;
                  this.validUserName = true;
              }else if( state.validUserName === 'inValid') {
                   this.userNameAttempt   = true;
                   this.validUserName    = false;
              }
       });


        this.newUser = this.fb.group( {
          name:  this.fb.group( {
                      username: [ '', [ Validators.required,
                                        Validators.minLength(5),
                                        Validators.maxLength(15),
                                        AugmentedValidators.isAlphanumeric()]],
                      } ),
          user:  this.fb.group( {

                      password: ['',  [ Validators.required,
                                        Validators.minLength(5),
                                        Validators.maxLength(15),
                                        AugmentedValidators.passwordPattern()]],

                      firstname: ['',   [ Validators.required,
                                        Validators.minLength(2),
                                        Validators.maxLength(15),
                                        AugmentedValidators.isAlpha()]],

                      lastname:  ['',  [ Validators.required,
                                        Validators.minLength(2),
                                        Validators.maxLength(15),
                                        AugmentedValidators.isAlpha()]]
                    } ),
          account: this.fb.group( {
                              email: ['', [ Validators.required,
                                            AugmentedValidators.isEmail()]],

                              confirm: ['', [ Validators.required,
                                               AugmentedValidators.isEmail()]]
                             }, { validator: emailMatcher } )

        } );
    }


    private resetValidUserName(){
        this.bDS.dispatchBrokerAction(this.brokerRef.storeDsp.RESET_USER_PROFILE_NAME_VALID);

    }

    onUserNameOutFocused() {
        if(this.newUser.get('name').get('username').valid) {
            var note = this.brokerRef.storeDsp.CHECK_USER_PROFILE_NAME_ATTEMPT;
            note.payLoad = this.newUser.get('name').get('username').value;
            this.bDS.dispatchBrokerAction(note);
        }
    }


    onUserNameKeyedUp() {
      if(this.usernameComplete || this.userNameAttempt) {
        if(this.usernameComplete) {
           this.userNameAttempt  = false;
           this.validUserName    = false;
           this.usernameComplete = false;
        }else if(this.userNameAttempt) {
           this.userNameAttempt = false;
        }
        this.resetValidUserName();
      }
    }

    onSubmit() {
         if(this.newUser.valid) {
             const userObj = Object.assign({}, this.newUser.value.name,
                                               this.newUser.value.user,
                                               {email:this.newUser.value.account.email});

             var note  = this.brokerRef.storeDsp.REGISTER_USER_ATTEMPT;
             note.payLoad = <RegistrationModel>(userObj);
             this.bDS.dispatchBrokerAction(note);
         }
    }

    ngOnDestroy() {
         if(this.validUserName) {
            this.resetValidUserName();
         }
         if(this.storeStateSub) {
            this.storeStateSub.unsubscribe();
         }
         if(this.profileStateSub){
             this.profileStateSub.unsubscribe();
         }
         if(this.hasLoggedInUserSub){
             this.hasLoggedInUserSub.unsubscribe();
         }
         if(this.layoutRequestedUrlSub){
             this.layoutRequestedUrlSub.unsubscribe();
         }
    }
}
