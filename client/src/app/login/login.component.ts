import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BackendApiService } from '../backend-api.service';
import { IUsersState } from '../store/user.reducer';
import { Role, User } from '../user.model';
import * as actions from '../store/user.actions';
import { map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MessageService } from '../message/message.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    public username: string = '';
    public password: string = '';
    public message: string = '';

    constructor(private router: Router,
        private stateStore: Store<{ users: IUsersState }>,
        private messageService: MessageService,
        private backendApiService: BackendApiService) { }

    ngOnInit(): void {
        this.backendApiService.logout();
    }

    public async login() {

        if (!this.username || !this.password) return;

        this.backendApiService.login(this.username, this.password)
            .pipe(
                map(auth => {
                    this.backendApiService.setSession(auth)
                }),
                switchMap(() => this.backendApiService.getUser(this.username)),
                map(currUser => {
                    this.stateStore.dispatch(actions.SetCurrentUser({ currentUser: currUser }));
                    this.router.navigate(['profile'])
                }),
            ).subscribe(() => {});
    }

    ngOnDestroy(): void {
        this.messageService.clear();
    }

    setUsername(event: any) {
        this.username = event.target?.value;
    }

    setPassword(event: any) {
        this.password = event.target?.value;
    }
}
