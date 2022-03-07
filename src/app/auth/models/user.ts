export class User {
   
    constructor(
        public name: string,
        public email: string,
        public role: string, 
        public uuid: string, 
        public token: string,
    ) {

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
    user: User;
    token: string;
}

export interface UserStorage {
    name: string;
    role: string;
    email: string;
}