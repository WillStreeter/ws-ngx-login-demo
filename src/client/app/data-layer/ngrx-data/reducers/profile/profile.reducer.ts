import { createSelector } from 'reselect';
import { UserModel  } from '../../../../business-layer/models/user.model';
import * as profileActions from '../../actions/profile.actions';
import * as ProfileActionTypes from '../../../../business-layer/shared-types/actions/profile.action.types';

export  interface State {
  ids: string[];
  entities: { [id: string]: UserModel };
  selectedProfileId: string | null;
  validUserName:string;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedProfileId: null,
  validUserName:null
};

export function reducer(state = initialState, action: profileActions.Actions): State {
  switch (action.type) {
      case ProfileActionTypes.REGISTER_USER_SUCCESS:
      case ProfileActionTypes.EDIT_USER_PROFILE_SUCCESS:
      case ProfileActionTypes.GET_USER_PROFILE_SUCCESS:{
          let user:UserModel;
          if(action.payload.hasOwnProperty('user') ||
             action.payload.hasOwnProperty('username')) {
              const user:UserModel = action.payload.hasOwnProperty('user')? <UserModel>(action.payload.user) : <UserModel>(action.payload);
              if (state.ids.indexOf(user.id) > -1) {
                return state;
              }

              return {
                ids: [ ...state.ids, user.id ],
                entities: Object.assign({}, state.entities, {
                  [user.id]: user
                }),
                selectedProfileId: user.id,
                validUserName:  state.validUserName
              };

          }else {
             return state;
          }
      }

      case ProfileActionTypes.CHECK_USER_PROFILE_NAME_SUCCESS:{
           if(action.payload) {
                const validUserName = ((action.payload).hasOwnProperty('username'))?'inValid':'valid';
                return Object.assign({}, state, {validUserName:validUserName });
           }
           return state;
      }

      case ProfileActionTypes.CHECK_USER_PROFILE_NAME_FAILURE:{
            return Object.assign({}, state,   {validUserName:'valid' });
      }

      case ProfileActionTypes.RESET_USER_PROFILE_NAME_VALID:{
          return Object.assign({}, state, {validUserName:'invalid' });
      }

      case ProfileActionTypes.SET_SELECTED_PROFILE_ID:{
          if (state.ids.indexOf(action.payload) > -1) {
             return Object.assign({}, state, {selectedProfileId:action.payload });
          }else {
             return state;
          }
      }

      default: {
          return state;
        }
      }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedProfileId = (state: State) => state.selectedProfileId;

export const getValidUserName = (state: State) => state.validUserName;

export const getSelectedProfile  = createSelector(getEntities, getSelectedProfileId, (entities, selectedProfileId) => {
  return entities[selectedProfileId];
});


