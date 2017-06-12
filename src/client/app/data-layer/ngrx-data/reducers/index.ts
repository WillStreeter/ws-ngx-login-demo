import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { Config } from '../../../shared-utils/app-env/env.config';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';


/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromErrors from './error/error.reducer';
import * as fromLayouts from './layout/layout.reducer';
import * as fromProfiles from './profile/profile.reducer';
import * as fromUsersession from './usersession/usersession.reducer';


/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  errors: fromErrors.State;
  layouts: fromLayouts.State;
  profiles: fromProfiles.State;
  usersession: fromUsersession.State;
  router: fromRouter.RouterState;
}


/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
  errors: fromErrors.reducer,
  layouts: fromLayouts.reducer,
  profiles: fromProfiles.reducer,
  usersession: fromUsersession.reducer,
  router: fromRouter.routerReducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (Config.ENV === 'PROD') {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}


/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `books` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.booksState$ = state$.select(getBooksState);
 * 	}
 * }
 * ```
 */
export const getUsersessionState = (state: State) => state.usersession;

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function from the reselect library creates
 * very efficient selectors that are memoized and only recompute when arguments change.
 * The created selectors can also be composed together to select different
 * pieces of state.
 */
export const getUser = createSelector(getUsersessionState, fromUsersession.getUser);
export const getToken = createSelector(getUsersessionState, fromUsersession.getToken);
export const getUserLoading = createSelector(getUsersessionState, fromUsersession.getUserLoading);
export const getUserLoaded = createSelector(getUsersessionState, fromUsersession.getUserLoaded);
export const hasLoggedInUser = createSelector(getToken, (token) => {
         return token !=='' ? true:false;
});



/**
 * Just like with the books selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
export const getErrorState = (state: State) => state.errors;

export const getErrorIds = createSelector(getErrorState, fromErrors.getIds);
export const getErrorEntities  = createSelector(getErrorState, fromErrors.getEntities);



export const getProfilesState = (state: State) => state.profiles;

export const getProfileIds = createSelector(getProfilesState, fromProfiles.getIds);
export const getProfileEntities  = createSelector(getProfilesState, fromProfiles.getEntities);
export const getSelectedProfileId  = createSelector(getProfilesState, fromProfiles.getSelectedProfileId);
export const getSelectedProfile  = createSelector(getProfilesState, fromProfiles.getSelectedProfile);
export const getValidUserName  = createSelector(getProfilesState, fromProfiles.getValidUserName);




/**
 * Layout Reducers
 */
export const getLayoutState = (state: State) => state.layouts;

export const getShowLoginDialog = createSelector(getLayoutState, fromLayouts.getShowLoginDialog);

export const getRequestedURL = createSelector(getLayoutState, fromLayouts.getRequestedURL);
