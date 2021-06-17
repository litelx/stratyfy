import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, shareReplay } from 'rxjs/operators';
import { DBUser, User } from './user.model';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class BackendApiService {

    constructor(private http: HttpClient,
                private router: Router
    ) { }

    login(username: string, password: string) {
        return this.http.post<{ token: string, usrename: string }>(`${uri}/login`, { username, password })
        .pipe(
            shareReplay(),
            catchError(this.returnBack)
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
                catchError(this.returnBack)
            );
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

        return this.http.put(`${uri}/users/${user._id}`, { user }).pipe(
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
        // const expiresAt = moment().add(10, 'minute');

        localStorage.setItem('username', authResult.usrename);
        localStorage.setItem('token', authResult.token);
        // localStorage.setItem("expiresIn", JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        // localStorage.removeItem("expiresIn");
    }

    // public isLoggedIn() {
    //     return moment().isBefore(this.getExpiration());
    // }

    // isLoggedOut() {
    //     return !this.isLoggedIn();
    // }

    getExpiration() {
        // const expiration: string = localStorage.getItem("expiresIn") || '';
        // const expiresAt = JSON.parse(expiration);
        // return moment(expiresAt);
        // return moment(expiration);
    }

    returnBack(err: any): Observable<never> {
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err}`;
        } else {
            errorMessage = `Backend returned code ${err}: ${err}`;
        }
        console.error(err);
        // this.router.navigate(['/']);
        return throwError(errorMessage);
    }
}
const uri = 'http://localhost:8081'