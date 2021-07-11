import { state } from '@angular/animations';
import { createReducer, on, Action } from '@ngrx/store';
import { DBUser, User } from '../user.model';
import * as actions from './user.actions';

export const usersFeatureKey = 'users';

// State Type
export interface IUsersState {
    users: DBUser[];
    currentUser: User | null;
}

// Initial state
export const initialState: IUsersState = {
    users: [],
    currentUser: null
};

// REDUCER
const usersReducer = createReducer(
    initialState,
    on(actions.SetUsers, (state, action) => ({ ...state, users: [...action.users] })),
    on(actions.AddUser, (state, action) => ({ ...state, users: [...state.users, action.user] })),
    on(actions.RemoveUser, (state, action) => ({
        ...state,
        users: [...state.users].filter(u => u._id != action._id)
    })),
    on(actions.UpdateUser, (state, action) => {
        const users = [...state.users];
        let user = users.find(u => u._id == action.user._id);
        let index = -1;
        if (user) {
            index = users.indexOf(user);
            if (index > -1) {
                users[index] = { ...action.user };
                return {
                    ...state,
                    users: users
                };
            }
        }
        return { ...state };
    }),
    on(actions.SetCurrentUser, (state, action) => ({ ...state, currentUser: action.currentUser })),
);

export function reducer(state: IUsersState | undefined, action: Action) {
    return usersReducer(state, action);
};
