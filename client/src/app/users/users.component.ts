import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BackendApiService } from '../backend-api.service';
import { IUsersState } from '../store/user.reducer';
import { DBUser, Role, User } from '../user.model';
import { Message } from '../message/message.model';
import { getCurrentUser } from '../store/user.selector';
import * as actions from '../store/user.actions';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from '../message/message.service';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
    users$: Observable<DBUser[]> = new Observable<DBUser[]>();
    users: DBUser[] = [];
    isEdit: boolean = false;
    user: User = {
        username: '',
        password: '',
        role: Role.basic,
    };
    role: typeof Role = Role;

    private currentUser$: Subscription = new Subscription();

    constructor(private backendApiService: BackendApiService,
        private messageService: MessageService,
        private stateStore: Store<{ users: IUsersState }>,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.currentUser$ = this.stateStore.select(getCurrentUser).subscribe(user => {
            if (user?.role == Role.basic || user == null) {
                this.router.navigate(['/']);
                return;
            }
            this.setUsersFromDB();
        });
    }

    setUsersFromDB() {
        this.backendApiService.getUsers()
            .subscribe(users => {
                this.stateStore.dispatch(actions.SetUsers(users))
                this.users = users.users.map(u => {
                    return { ...u, isEdit: false }
                })
            });
    }

    updateUser(user: DBUser) {
        user.isEdit = !user.isEdit;
        this.stateStore.dispatch(actions.UpdateUser({ user }));

        this.backendApiService.updateUsers(user)
            .pipe(
                map((u: any) => {
                    this.messageService.message = u.message;
                    this.messageService.type = Message.success;
                })
            )
            .subscribe((u) => {
            });
    }

    deleteUser(id: string) {
        this.stateStore.dispatch(actions.RemoveUser({ _id: id }));
        this.backendApiService.deleteUsers(id)
            .pipe(
                map((u: any) => {
                    this.messageService.message = u.message;
                    this.messageService.type = Message.success;
                    this.setUsersFromDB();
                })
            )
            .subscribe(() => {
            });
    }

    CreateNewUser() {
        this.backendApiService.createUser(this.user)
            .pipe(
                map((u: any) => {
                    this.messageService.message = u.message;
                    this.messageService.type = Message.success;
                    this.setUsersFromDB();
                    this.cleanUser();
                })
            )
            .subscribe(() => { });
    }

    cleanUser() {
        this.user = {
            username: '',
            password: '',
            role: Role.basic,
        };
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.currentUser$.unsubscribe();
        this.messageService.clear();
    }
}
