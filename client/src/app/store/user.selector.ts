import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './user.reducer';

export const getElementsState = createFeatureSelector<fromReducer.IUsersState>(fromReducer.usersFeatureKey);

export const getState = createSelector(getElementsState, (state: fromReducer.IUsersState) => {
    return state;
});

export const getUsers = createSelector(getElementsState,
    (state: fromReducer.IUsersState) => {
        return state.users;
    });

export const getCurrentUser = createSelector(getElementsState,
    (state: fromReducer.IUsersState) => {
        return state?.currentUser || null;
    });

