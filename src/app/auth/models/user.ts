export class User {
   
    constructor(
        public name: string,
        public email: string,
        public role: string, 
        public uuid: string, 
        public token: string,
    ) {

    }

    getUser(): User {
        const user: any = {
            name: this.name,
            email: this.email,
            role: this.role, 
            uuid: this.uuid, 
            token: this.token,
        }
        return user;
    }

    getEmail(): string {
        return this.email;
    }

    getRole(): string {
        return this.role;
    }
}

export interface AuthResponse {
    token: string;
}
export interface UserRegisterReq {
    email: string;
    password: string;
    name: string;
    uuid: string;
}

export interface UserloginRequest {
    email: string;
    password: string;
}
export interface UserloginResponse {
        user: User
        token: string
}