import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, map, shareReplay, switchMap, take } from 'rxjs/operators';
import { DBUser, User } from './user.model';
import { Message } from './message/message.model';
import { Observable, of, pipe, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { IUsersState } from './store/user.reducer';
import * as actions from './store/user.actions';
import { MessageService } from './message/message.service';

@Injectable({
    providedIn: 'root'
})
export class BackendApiService {

    constructor(private http: HttpClient,
        private messageService: MessageService,
        private stateStore: Store<{ usesr: IUsersState }>,
    ) { }

    login(username: string, password: string) {
        return this.http.post<{ token: string, usrename: string }>(`${uri}/login`, { username, password })
            .pipe(
                shareReplay(),
                catchError(this.returnBack.bind(this))
            );
    }

    resetPassword(username: string, password: string, newPassword: string) {
        return this.http.post(`${uri}/reset-password`, { username, password })
            .pipe(
                shareReplay(),
                catchError(this.returnBack)
            )
    }

    getUser(username: string) {

        return this.http.get<User>(`${uri}/users/${username}`)
            .pipe(
                shareReplay(),
                catchError(this.returnBack),
                //     concatMap(u => 
                //         of(u).pipe(
                //             take(1),
                //             map(() => u)
                //         )
                //     )
            )
        //     .subscribe(user => {
        //         y = user;
        //     });
        // return r;
    }

    getUsers() {
        return this.http.get<{ users: DBUser[] }>(`${uri}/users`)
            .pipe(
                shareReplay(),
                catchError(this.returnBack)
            );
    }

    createUser(user: User) {
        return this.http.post<DBUser>(`${uri}/users`, user).pipe(
            shareReplay(),
            catchError(this.returnBack)
        );
    }

    updateUsers(user: DBUser) {

        return this.http.put(`${uri}/users/${user._id}`, user).pipe(
            shareReplay(),
            catchError(this.returnBack)
        );
    }

    deleteUsers(userId: string) {
        return this.http.delete(`${uri}/users/${userId}`)
            .pipe(
                shareReplay(),
                catchError(this.returnBack)
            );
    }


    public setSession(authResult: { token: string, usrename: string }) {
        localStorage.setItem('username', authResult.usrename);
        localStorage.setItem('token', authResult.token);
    }

    public logout(): void {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        this.stateStore.dispatch(actions.SetCurrentUser({ currentUser: null }))
    }

    returnBack(err: any): Observable<never> {
        let errorMessage: string;
        if (err instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err}`;
        } else {
            errorMessage = `Backend returned code ${err}: ${err.error}`;
            this.messageService.message = err.message;
            this.messageService.type = Message.error;
            setTimeout(() => {
                this.messageService.clear();
            }, 4000);
        }
        return throwError(errorMessage);
    }
}
const uri = 'http://localhost:8081'