import { Http, BaseRequestOptions, Response, ResponseOptions,
         ResponseType, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';

import { MockBackend, MockConnection } from '@angular/http/testing';

class MockError extends Response implements Error {
    name:any;
    message:any;
}


export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
    // array in local storage for registered users
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        // wrap in timeout to simulate server api call
        setTimeout(() => {

            // authenticate
            if (connection.request.url.endsWith('api/Authorizations/Login') &&
                connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                let params = JSON.parse(connection.request.getBody());

                if(!localStorage.getItem('users') && params.username === 'taobing') {
                   localStorage.setItem('users', JSON.stringify({
                                                id: '12345',
                                                username: 'taobing',
                                                password: 'password',
                                                firstname: 'Thor',
                                                lastname: 'Newssen',
                                                email:'tn@gm.com',
                                                token: '12345-fake-jwt-token'

                                              }));

                     users  = <any[]>[JSON.parse(localStorage.getItem('users'))];
                 }

                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.username === params.username && user.password === params.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let aUser = filteredUsers[0];
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body:{  account:{
                                        user: aUser,
                                        token:aUser.token
                                        }
                                }
                    })));
                } else {
                    let body = JSON.stringify({error:'Username or password is incorrect'});
                    let opts = {type:ResponseType.Error, status:400, body: body};
                    let responseOpts = new ResponseOptions(opts);
                    connection.mockError(new MockError(responseOpts));
                }

                return;
            }
            if (connection.request.url.endsWith('api/Authorizations/Logout') &&
                connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                 let userOut = { status: 200,
                                   general:{
                                             message:'user logged out',
                                             success:true
                                           }
                                 };
               connection.mockRespond(new Response(new ResponseOptions({ status: 200, body:userOut})));
                return;
            }

            // get user by usersname
            if (connection.request.url.match(/\/api\/Users\/username\/\w+$/)  &&
                connection.request.method === RequestMethod.Get) {
                let urlParts = connection.request.url.split('/');
                let username = urlParts[urlParts.length - 1];
                // check for fake auth token in header and return users if
                // valid, this security is implemented server side in a real application

                 if(!localStorage.getItem('users') && username === 'taobing') {
                   localStorage.setItem('users', JSON.stringify({
                                                id: '12345',
                                                username: 'taobing',
                                                password: 'password',
                                                firstname: 'Thor',
                                                lastname: 'Newssen',
                                                email:'tn@gm.com',
                                                token: '12345-fake-jwt-token'

                                              }));

                     users  = <any[]>[JSON.parse(localStorage.getItem('users'))];
                 }
                let duplicateUser = users.filter(user => { return user.username === username; });
                if (duplicateUser && duplicateUser.length>0) {
                    connection.mockRespond(new Response(
                                                            new ResponseOptions(
                                                                                 {
                                                                                    status: 200,
                                                                                    body: { user:duplicateUser[0]}
                                                                                  }
                                                                           )
                                                        )
                                          );
                }else {
                    let body = JSON.stringify({error:'username does not exit'});
                    let opts = {type:ResponseType.Error, status:404, body: body};
                    let responseOpts = new ResponseOptions(opts);
                    connection.mockError(new MockError(responseOpts));
                }

                return;
            }

            // get user by id
            if ( connection.request.url.match(/\/api\/Users\/\d+$/) &&
                 connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return user
                // if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    // respond 200 OK with user
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            // create user
            if (connection.request.url.endsWith('/api/Users') && connection.request.method === RequestMethod.Post) {
                // get new user object from post body
                let newUser = JSON.parse(connection.request.getBody());
                // validation
                let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                if (duplicateUser) {
                    return connection.mockError(new Error('Username "' + newUser.username + '" is already taken'));
                }

                // save new user
                newUser.id = users.length + Math.floor(Math.random() * (100 - 1)) +1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                 let userRtrn = { status: 200,
                                   account:{
                                             user:newUser,
                                             token: 'jwt-token-creation'
                                           }
                                 };
                // respond 200 OK
                connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200,   body:userRtrn }  )
                        ));

                return;
            }

            // delete user
            if (connection.request.url.match(/\/api\/Users\/\d+$/) &&
                connection.request.method === RequestMethod.Delete) {
                // check for fake auth token in header and return user if valid, this
                // security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            // pass through any requests not handled above
            let realHttp = new Http(realBackend, options);
            let requestOptions = new RequestOptions({
                method: connection.request.method,
                headers: connection.request.headers,
                body: connection.request.getBody(),
                url: connection.request.url,
                withCredentials: connection.request.withCredentials,
                responseType: connection.request.responseType
            });
            realHttp.request(connection.request.url, requestOptions)
                .subscribe((response: Response) => {
                    connection.mockRespond(response);
                },
                (error: any) => {
                    connection.mockError(error);
                });

        }, 500);

    });

    return new Http(backend, options);
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
};