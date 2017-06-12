import { Action } from '@ngrx/store';
import * as LayoutActionTypes from '../../../business-layer/shared-types/actions/layout.action.types';

export class ShowLoginDialog implements Action {
  public readonly type = LayoutActionTypes.SHOW_LOGIN_DIALOG;
}

export class HideLoginDialog implements Action {
  public readonly type = LayoutActionTypes.HIDE_LOGIN_DIALOG;
}

export class SetRequestedURL implements Action {
 public readonly type = LayoutActionTypes.SET_REQUESTED_URL;
  constructor(public payload:string) {  }
}

export class ShowLoginDialogAndSetRequestedURL implements Action {
 public readonly type = LayoutActionTypes.SHOW_LOGIN_DIALOG_SET_REQUESTED_URL;
    constructor(public payload:string) {  }
}


export type Actions
  = ShowLoginDialog
  | HideLoginDialog
  | SetRequestedURL
  | ShowLoginDialogAndSetRequestedURL;
