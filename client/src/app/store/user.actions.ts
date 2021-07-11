import { createAction, props } from '@ngrx/store';
import { DBUser, User } from '../user.model';

// actions types
export const AddUser = createAction(
    'Add user',
    props<{ user: DBUser }>()
);

export const RemoveUser = createAction(
    'Remove user',
    props<{ _id: string }>()
);

export const UpdateUser = createAction(
    'Update user',
    props<{ user: DBUser }>()
);

export const SetUsers = createAction(
    'Set users',
    props<{ users: DBUser[] }>()
);

export const SetCurrentUser = createAction(
    'Set Current user',
    props<{ currentUser: User | null}>()
);

export const RemoveCurrentUser = createAction(
    'Remove Current user',
);
