import { type User as fbUser } from 'firebase/auth';

export class User {

    constructor(
        public id?: string, 
        public email?: string, 
        public password?: string, 
        public isAdmin?: boolean) {}

    set(user: fbUser) {
        this.id = user.uid;
        this.email = user.email ?? "";
        this.isAdmin = user.email === 'a@a.com';
    }

    get (): User {
        return this;
    }
}