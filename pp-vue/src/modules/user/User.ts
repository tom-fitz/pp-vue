import { type User as fbUser } from 'firebase/auth';

export class User {

    constructor(
        public id: string = "", 
        public email: string = "", 
        public password: string = "", 
        public isAdmin: boolean = false,
        public displayName: string = "",
        public firstName: string = "",
        public lastName: string = "",
        public photoUrl: string = "",
        public phoneNumber: string = "",
    ){}

    set(user: fbUser) {
        this.id = user.uid;
        this.email = user.email ?? "";
        this.isAdmin = user.email === 'a@a.com';
        this.displayName = user.displayName ?? '';
        if (user.displayName) {
            this.firstName = user.displayName?.split(' ')[0] ?? '';
            this.lastName = user.displayName?.split(' ')[1] ?? '';
        }
    }

    get (): User {
        return this;
    }

    getInitials (): string {
        if (this.displayName) {
          return this.displayName?.split(" ").map((n)=>n[0]).join("") ?? 'AA';
        }
        return '##';
    }
}