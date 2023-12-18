export interface User {
    name: string;
    email: string;
    message: string;
}

export default interface Contact extends User {
    url: string;
}
