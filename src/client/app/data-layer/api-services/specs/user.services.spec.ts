
import { TestBed, inject, async } from '@angular/core/testing';
import { Http, BaseRequestOptions, ConnectionBackend, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { UserServices } from '../user.service';
import { HttpWrapperService } from '../http.wrapper.service';
import { TEST_DATA } from '../../../../../testing-artifacts/index';
import { HttpParams } from '../interfaces/httpParams.model';
import  * as errorActions  from '../../ngrx-data/actions/error.actions';
import  * as userActions  from '../../ngrx-data/actions/usersession.actions';
import  * as profileActions  from '../../ngrx-data/actions/profile.actions';

export function main() {
  describe('Service: UserServices', () => {


    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          UserServices,
          HttpWrapperService,
          MockBackend,
          BaseRequestOptions,
          {
            provide: Http,
            useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backendInstance, defaultOptions);
            },
            deps: [ MockBackend, BaseRequestOptions ]
          }
        ]
      });
    });


    it('should call the registerUser api with proper args should return REGISTER_USER_SUCCESS',  async(() => {
        let userService = TestBed.get(UserServices);
        let httpWrapperService = TestBed.get(HttpWrapperService);
        let backend = TestBed.get(MockBackend);

        const userServiceSuccess = Object.assign({ type:profileActions.REGISTER_USER_SUCCESS, payload:undefined});

        backend.connections.subscribe((connection: MockConnection) => {
          const options = new ResponseOptions( { body:JSON.stringify(TEST_DATA.regUser_1_Service)});
          connection.mockRespond(new Response(options));
          expect(connection.request.method).toEqual(RequestMethod.Post);
          expect(connection.request.url).toEqual(`http://localhost/api/Users`);
        });

        userService
          .registerUser(TEST_DATA.regUser_1_Service,
                        errorActions.REPORT_ERROR,
                        profileActions.REGISTER_USER_FAILURE,
                        profileActions.REGISTER_USER_SUCCESS);
           .subscribe((res) => {
              expect(res).toEqual(userServiceSuccess);
           });
      })
    );

    it('should call httpServiceWrapper.post from the userServices.registerUser  and return Successful',  async(() => {
      let userService = TestBed.get(UserServices);
      let httpWrapperService = TestBed.get(HttpWrapperService);
      let backend = TestBed.get(MockBackend);

      const userRegHttpParams:HttpParams = <HttpParams>({
                                                          auth: false,
                                                          errorActionType: errorActions.REPORT_ERROR,
                                                          specificErrorType: profileActions.REGISTER_USER_FAILURE,
                                                          payload: TEST_DATA.regUser_1_HttpService,
                                                          responseObject: 'account',
                                                          successActionType: profileActions.REGISTER_USER_SUCCESS,
                                                          uri: 'Users'
                                                        });

        backend.connections.subscribe((connection: MockConnection) => {
          const options = new ResponseOptions( { body:JSON.stringify(TEST_DATA.regUser_1_Service_ResOptions)});
          connection.mockRespond(new Response(options));
          expect(connection.request.method).toEqual(RequestMethod.Post);
          expect(connection.request.url).toEqual(`http://localhost/api/Users`);
        });

          httpWrapperService
            .post(userRegHttpParams)
            .subscribe((res) => {
              expect(res).toEqual(TEST_DATA.regUser_1_Service_Result);
            });
      })
    );

  });
}
