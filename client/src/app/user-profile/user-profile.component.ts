import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BackendApiService } from '../backend-api.service';
import { User } from '../user.model';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    user$: Observable<User> = new Observable<User>();
    username: string = '';

    constructor(
        private route: ActivatedRoute,
        private backendApiService: BackendApiService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        const username = this.route.snapshot.paramMap.get('username');
        this.user$ = this.backendApiService.getUser(username || "")
            .pipe(
                catchError(this.returnBack)
            );
    }

    returnBack(err: any): Observable<never> {
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err}`;
        } else {
            errorMessage = `Backend returned code ${err}: ${err}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }
}
