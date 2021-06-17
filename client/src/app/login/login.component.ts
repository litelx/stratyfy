import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendApiService } from '../backend-api.service';
import { Role, User } from '../user.model';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public username: string = '';
    public password: string = '';
    user: User = {
        username: '',
        password: '',
        role: Role.basic,
    };
    constructor(private router: Router,
        private backendApiService: BackendApiService) { }

    ngOnInit(): void {

    }

    public async login(event: any) {
        this.username = event.target[0].value
        this.password = event.target[1].value

        if (this.username && this.password) {
            this.backendApiService.login(this.username, this.password)
            .subscribe((auth: { token: string, usrename: string }) => {
                this.backendApiService.setSession(auth)
                if (auth.token) {
                    this.router.navigate(['profile', { username: this.username }])
                }
            });
        }

    }
}
