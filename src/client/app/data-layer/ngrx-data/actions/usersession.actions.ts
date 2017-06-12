import { Action } from '@ngrx/store';
import { SessionModel, ErrorModel } from '../../../business-layer/models/index';
import * as  UserSessionActionType  from '../../../business-layer/shared-types/actions/usersession.action.types';



export const UserSessionTypes = UserSessionActionType;

export class AppStartLoginClear implements Action {
  public readonly type = UserSessionActionType.APP_START_CLEAR_LOGIN;
}

export class UserLoginAttempt implements Action {
  public readonly type = UserSessionActionType.LOGIN_USER_ATTEMPT;
  constructor(public payload: SessionModel) {  }
}


export class UserLoginSuccess implements Action {
  public readonly type =  UserSessionActionType.LOGIN_USER_SUCCESS;
  constructor(public payload:any) {
  }
}

export class UserLoginFailure implements Action {
  public readonly type =  UserSessionActionType.LOGIN_USER_FAILURE;
  constructor(public payload: ErrorModel) {}
}



export class UserLogoutAttempt implements Action {
  public readonly  type =  UserSessionActionType.LOGOUT_USER_ATTEMPT;
}

export class UserLogoutSuccess implements Action {
  public readonly  type =  UserSessionActionType.LOGOUT_USER_SUCCESS;
}

export class UserLogoutFailure implements Action {
  public readonly  type =  UserSessionActionType.LOGOUT_USER_FAILURE;
}


export class GetSessionUser implements Action {
  public readonly type =  UserSessionActionType.GET_SESSION_USER_SUCCESS;
  constructor(public payload: SessionModel) { }
}




export type Actions =
     AppStartLoginClear
      | UserLoginAttempt
      | UserLoginSuccess
      | UserLoginFailure
      | UserLogoutAttempt
      | UserLogoutSuccess
      | UserLogoutFailure
      | GetSessionUser;
