import { TestBed, fakeAsync, tick, inject,async } from '@angular/core/testing';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing/index';
import { StoreModule, Store, Action  } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { TEST_DATA } from '../../../../../../testing-artifacts/index';
import { ProfileEffects } from '../profile.effects';
import * as profileActions from '../../actions/profile.actions';
import { RegistrationModel,  UserModel } from '../../../../business-layer/models/index';
import { UserServices } from '../../../api-services/user.service';
import { reducer } from '../../reducers/index';
import * as fromRoot from '../../reducers/index';

export function main() {
    describe('Effects: ProfileEffects', () => {
      beforeEach(() => TestBed.configureTestingModule( {
          imports: [
            StoreModule.provideStore(reducer),
            EffectsTestingModule
          ],
          providers: [
            ProfileEffects,
            {
              provide: UserServices,
              useValue: jasmine.createSpyObj('userServices', ['registerUser', 'getUserByName'])
            }
          ]
        }));

        function setup( params1?: { registerUserReturnValue:any,
                                    getUserByNameReturnValue:any,
                                    setStoreProfileEntity:any} ) {


          const  _userServices = TestBed.get(UserServices);
          const  _store:Store<fromRoot.State> = TestBed.get(Store);

          if(params1['registerUserReturnValue']) {
              _userServices.registerUser.and.returnValue(params1.registerUserReturnValue);
          }

          if(params1['getUserByNameReturnValue']) {
             _userServices.getUserByName.and.returnValue(params1.getUserByNameReturnValue);
          }

          if(params1['setStoreProfileEntity']) {
              _store.dispatch( new profileActions.UserRegistrationSuccess(params1.setStoreProfileEntity));
          }

          return {
             runner: TestBed.get(EffectsRunner),
             profileEffects: TestBed.get(ProfileEffects)
          };

        }

      describe('registerUser$', () => {
          it('REGISTER_USER_ATTEMPT registerUser SHOULD return proper method params for userService Call',
           async( () => {
              const newUser1Attempt =  TEST_DATA.newUser_1_Attempt as RegistrationModel;

              const  {runner, profileEffects} = setup({registerUserReturnValue: Observable.of(newUser1Attempt),
                                                       getUserByNameReturnValue:null,
                                                       setStoreProfileEntity:null } );

              runner.queue( new profileActions.UserRegistrationAttempt(newUser1Attempt) );

              let result = null;
              profileEffects.registerUser$.subscribe(_result => result = _result);
              expect(result).toEqual(newUser1Attempt);
            })
          );

          it('CHECK_USER_PROFILE_NAME_ATTEMPT getUserByName SHOULD return proper method params for userService Call',
           async( () => {
              const checkUser = [ TEST_DATA.newUser_1_Result.username,
                                  profileActions.CHECK_USER_PROFILE_NAME_FAILURE,
                                  profileActions.CHECK_USER_PROFILE_NAME_SUCCESS];

              const  {runner, profileEffects} = setup( { registerUserReturnValue: null,
                                                         getUserByNameReturnValue: Observable.of(checkUser),
                                                         setStoreProfileEntity:null } );

              runner.queue( new profileActions.CheckUserProfileNameAttempt(TEST_DATA.newUser_1_Result.username) );

              let result = null;
              profileEffects.getUserByName$.subscribe(_result => result = _result);
              expect(result).toEqual(checkUser);
            })
          );


          it('GET_USER_PROFILE_ATTEMPT when userExist SHOULD return the same ID as User currently in store',
              async( () => {
                  const checkUser = <UserModel>TEST_DATA.currentUser_1_setup;

                  const  {runner, profileEffects} = setup( { registerUserReturnValue: null,
                                                             getUserByNameReturnValue: null,
                                                             setStoreProfileEntity:checkUser
                                                          } );
                  runner.queue( new profileActions.GetUserProfileAttempt(TEST_DATA.currentUser_1_setup.user.username) );

                  let result = null;
                  profileEffects.getUserProfile$.subscribe(_result => result = _result);
                  expect(result.payload).toEqual((<UserModel>checkUser['user']).id);
              })
          );


          it('GET_USER_PROFILE_ATTEMPT when user DOES NOT exist SHOULD return proper method params for userService Call',
              async( () => {
                  const stubUser = <UserModel>TEST_DATA.currentUser_1_setup;

                  //first we will place a user in the profile reducer store...
                  const  {} =  setup( { registerUserReturnValue: null,
                                                             getUserByNameReturnValue: null,
                                                             setStoreProfileEntity:stubUser
                                                          } );


                  //second we will search for by userName different than the one above in stub user
                  //setting up a call to  userServices.getUserByName
                  const checkUser = [ TEST_DATA.checkUser_2_Attempt.username,
                                  profileActions.CHECK_USER_PROFILE_NAME_FAILURE,
                                  profileActions.CHECK_USER_PROFILE_NAME_SUCCESS];

                  const  {runner, profileEffects} = setup( { registerUserReturnValue: null,
                                                         getUserByNameReturnValue: Observable.of(checkUser),
                                                         setStoreProfileEntity:null } );


                  runner.queue( new profileActions.GetUserProfileAttempt(TEST_DATA.checkUser_2_Attempt.username) );

                  let result = null;
                  profileEffects.getUserProfile$.subscribe(_result => result = _result);
                  expect(result).toEqual(checkUser);
              })
          );


      });

    });
}

