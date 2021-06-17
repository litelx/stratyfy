export type User = {
    username: string, 
    role: Role, 
    password: string,
}

export interface DBUser extends User {
    _id: string,
    isEdit?: boolean
}

export enum Role {
    manager = 'manager',
    basic = 'basic'
}