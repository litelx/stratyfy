import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUsersState } from '../store/user.reducer';
import { User } from '../user.model';
import { getCurrentUser } from '../store/user.selector';
import { map } from 'rxjs/operators';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
    user$: Observable<User | null> = new Observable<User>();

    constructor(
        private stateStore: Store<{ users: IUsersState }>,
    ) { }

    ngOnInit(): void {
        this.user$ = this.stateStore.select(getCurrentUser)
        .pipe(
            map((r) => r)
        );
    }

    ngOnDestroy(): void {
        // this.user$.subscribe().unsubscribe();
    }

}
