import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUsersState } from '../store/user.reducer';
import { getCurrentUser } from '../store/user.selector';
import { User } from '../user.model';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
    user$: Observable<User | null> = new Observable<User>();

    constructor(
        private stateStore: Store<{ users: IUsersState }>,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.user$ = this.stateStore.select(getCurrentUser)
        .pipe(
            map(data => {
                if (!data) {
                    this.router.navigate(['/']);
                }
                return data;
            })
        );
    }

    ngOnDestroy(): void {
        this.user$.subscribe().unsubscribe();
    }
}
