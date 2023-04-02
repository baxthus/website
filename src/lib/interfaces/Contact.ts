export interface User {
    name: string;
    email: string;
    message: string;
}

export interface Contact extends User {
    url: string;
}