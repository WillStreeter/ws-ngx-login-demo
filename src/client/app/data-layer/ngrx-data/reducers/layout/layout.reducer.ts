import * as layout from '../../actions/layout.actions';
import * as LayoutActionTypes from '../../../../business-layer/shared-types/actions/layout.action.types';


export interface State {
  showLoginDialog:boolean;
  requestedURL:string;
}

const initialState: State = {
  showLoginDialog: false,
  requestedURL:''
};

export function reducer(state = initialState, action: layout.Actions): State {
  switch (action.type) {
    case LayoutActionTypes.HIDE_LOGIN_DIALOG: {
      return {
        showLoginDialog: false,
        requestedURL:''
      };
    }
    case LayoutActionTypes.SHOW_LOGIN_DIALOG: {
      return {
        showLoginDialog: true,
        requestedURL:state.requestedURL
      };
    }

    case LayoutActionTypes.SET_REQUESTED_URL: {
      return {
        showLoginDialog: state.showLoginDialog,
        requestedURL:action.payload
      };
    }

    case LayoutActionTypes.SHOW_LOGIN_DIALOG_SET_REQUESTED_URL: {
      return {
        showLoginDialog: true,
        requestedURL:action.payload
      };
    }


    default:
      return state;
  }
}

export const getShowLoginDialog = (state: State) => state.showLoginDialog;
export const getRequestedURL = (state: State) => state.requestedURL;

