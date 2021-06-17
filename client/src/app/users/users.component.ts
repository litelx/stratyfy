import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendApiService } from '../backend-api.service';
import { DBUser, Role, User } from '../user.model';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    // users$: Observable<{users: DBUser[]}> = new Observable<{users: DBUser[]}>();
    users: DBUser[] = [];
    isEdit: boolean = false;
    user: User = {
        username: '',
        password: '',
        role: Role.basic,
    };
    role: typeof Role = Role;

    constructor(private backendApiService: BackendApiService) { }

    ngOnInit(): void {
        this.setUsersFromDB();
    }
    
    setUsersFromDB() {
        // this.users$ = 
        this.backendApiService.getUsers()
        .subscribe(users => {
            this.users = users.users
        });
    }
    
    updateUser(event: any, user: DBUser) {
        console.log(event, user);
        user.isEdit = !user.isEdit;
        this.backendApiService.updateUsers(user)
        .subscribe(updatedUser => {
            console.log(updatedUser);
            
            this.setUsersFromDB();
        });
    }
    
    deleteUser(event: any, username: string) {
        console.log(event, username);
        this.backendApiService.deleteUsers(username)
        .subscribe(updatedUser => {
            this.setUsersFromDB()
        });
    }

    CreateNewUser(event: any) {
        console.log(event, this.user);
        this.backendApiService.createUser(this.user)
        .subscribe(o => {
            // console.log(o);
            this.cleanUser();
            this.setUsersFromDB()
            
        });
    }

    cleanUser() {
        this.user = {
            username: '',
            password: '',
            role: Role.basic,
        };
    }
    
}
