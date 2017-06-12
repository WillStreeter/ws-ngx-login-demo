import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { UserModel, RegistrationModel, ErrorModel } from '../../../business-layer/models/index';
import * as  ProfileActionTypes  from '../../../business-layer/shared-types/actions/profile.action.types';


export const ProfileTypes = ProfileActionTypes;

export class CheckUserProfileNameAttempt implements Action {
 public readonly type = ProfileActionTypes.CHECK_USER_PROFILE_NAME_ATTEMPT;
  constructor(public payload:string) {  }
}

export class CheckUserProfileNameFailure implements Action {
 public readonly type = ProfileActionTypes.CHECK_USER_PROFILE_NAME_FAILURE;
  constructor(public payload:ErrorModel) {  }
}


export class CheckUserProfileNameSuccess implements Action {
 public readonly type = ProfileActionTypes.CHECK_USER_PROFILE_NAME_SUCCESS;
  constructor(public payload:UserModel) {  }
}


export class ResetUserNameVailid implements Action {
 public readonly type =  ProfileActionTypes.RESET_USER_PROFILE_NAME_VALID;
}

export class SetProfileSelectedId implements Action {
 public readonly type =  ProfileActionTypes.SET_SELECTED_PROFILE_ID;
  constructor(public payload:string) {  }
}

export class GetUserProfileAttempt implements Action {
 public readonly type =  ProfileActionTypes.GET_USER_PROFILE_ATTEMPT;
  constructor(public payload:string) {  }
}

export class GetUserProfileFailure implements Action {
 public readonly type =  ProfileActionTypes.GET_USER_PROFILE_FAILURE;
  constructor(public payload:ErrorModel) {  }
}


export class GetUserProfileSuccess implements Action {
 public readonly type =  ProfileActionTypes.GET_USER_PROFILE_SUCCESS;
  constructor(public payload:UserModel) {  }
}

export class UserRegistrationFailure implements Action {
  readonly type =  ProfileActionTypes.REGISTER_USER_FAILURE;
  constructor(public payload: ErrorModel) {  }
}


export class UserRegistrationAttempt implements Action {
  public readonly type =  ProfileActionTypes.REGISTER_USER_ATTEMPT;
  constructor(public payload: RegistrationModel) {  }
}


export class UserRegistrationSuccess implements Action {
  public readonly type =  ProfileActionTypes.REGISTER_USER_SUCCESS;
  constructor(public payload:any) { }
}

export class UpdateUserProfileAttempt implements Action {
 public readonly type =  ProfileActionTypes.EDIT_USER_PROFILE_ATTEMPT;
  constructor(public payload: UserModel) { }
}

export class UpdateUserProfileFailure  implements Action {
 public readonly type =  ProfileActionTypes.EDIT_USER_PROFILE_FAILURE;
  constructor(public payload: UserModel) { }
}


export class UpdateUserProfileSuccess implements Action {
 public readonly type =  ProfileActionTypes.EDIT_USER_PROFILE_SUCCESS;
  constructor(public payload:UserModel) {  }
}



export type Actions =
CheckUserProfileNameAttempt
     | CheckUserProfileNameFailure
     | CheckUserProfileNameSuccess
     | ResetUserNameVailid
     | SetProfileSelectedId
     | GetUserProfileAttempt
     | GetUserProfileFailure
     | GetUserProfileSuccess
     | UpdateUserProfileAttempt
     | UpdateUserProfileFailure
     | UpdateUserProfileSuccess
     | UserRegistrationFailure
     | UserRegistrationAttempt
     | UserRegistrationSuccess;





