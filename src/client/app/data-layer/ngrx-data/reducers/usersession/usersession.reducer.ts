import { UserModel  } from '../../../../business-layer/models/user.model';
import { SessionModel  } from '../../../../business-layer/models/session.model';
import * as userSession from '../../actions/usersession.actions';
import * as userProfile from '../../actions/profile.actions';

import * as ProfileActionTypes from '../../../../business-layer/shared-types/actions/profile.action.types';
import * as UserSessionActionTypes from '../../../../business-layer/shared-types/actions/usersession.action.types';

export interface State {
  user: UserModel;
  token: string |null;
  loading: boolean;
  loaded:boolean;
  errorMessage:string |null;
}



export const initialState: State = {
  user: {},
  token:'',
  errorMessage:'',
  loading: false,
  loaded:false
};



export function reducer(state = initialState, action: userSession.Actions | userProfile.Actions): State {
  switch (action.type) {
    case ProfileActionTypes.REGISTER_USER_ATTEMPT:
    case UserSessionActionTypes.LOGIN_USER_ATTEMPT:
    case UserSessionActionTypes.APP_START_CLEAR_LOGIN: {
          localStorage.clear();
          return Object.assign({}, state, {user:{}, token:'', loading:false, loaded:false, errorMessage:'' });
    }
    case ProfileActionTypes.REGISTER_USER_SUCCESS:
    case UserSessionActionTypes.LOGIN_USER_SUCCESS: {
          if(action.payload.hasOwnProperty('user')) {
             const user:UserModel = <UserModel>(action.payload.user);
             const session:SessionModel = <SessionModel> action.payload;
             if (state.user.hasOwnProperty('id') && (state.user.id === session.user.id)) {
                return state;
             }
             localStorage.setItem('Authorized',  session.token);
             return Object.assign({}, state, session, {loading:false, loaded:true,  errorMessage:''});
          }else {
              return state;
          }
    }

    case UserSessionActionTypes.GET_SESSION_USER_SUCCESS: {
         const session:SessionModel= <SessionModel> action.payload;
         if (state.user.hasOwnProperty('id') && (state.user.id === session.user.id)) {
            return state;
         }
         return Object.assign({}, state, session);
    }

    case UserSessionActionTypes.LOGOUT_USER_SUCCESS: {
          localStorage.clear();
          return Object.assign({}, state, {user:{}, token:'', loading:false, loaded:false,  errorMessage:'' });
    }

    case UserSessionActionTypes.LOGIN_USER_FAILURE:{
          return Object.assign({}, { user:{},
                                     token:'',
                                     loading:false,
                                     loaded:false,
                                     errorMessage:action.payload.message});
    }

    default: {
      return state;
    }
  }
}

export const getUser = (state:State) => state.user;

export const getToken = (state:State) => state.token;

export const getUserLoading = (state:State) => state.loading;

export const getUserLoaded = (state:State) => state.loaded;
