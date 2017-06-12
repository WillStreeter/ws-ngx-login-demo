import { Action } from '@ngrx/store';
import { ErrorModel } from '../../../business-layer/models/error.model';
import * as ErrorActionTypes from '../../../business-layer/shared-types/actions/error.action.types';

export const ErrorTypes = ErrorActionTypes;
export class ReportError implements Action {
  public readonly type = ErrorActionTypes.REPORT_ERROR;
  constructor(public payload: ErrorModel) {  }
}

export class RemoveError implements Action {
  public readonly type = ErrorActionTypes.REMOVE_ERROR;
  constructor(public payload: string) { }
}

export type Actions =
     ReportError
      | RemoveError;

