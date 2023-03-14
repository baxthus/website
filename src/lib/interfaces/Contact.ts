import type User from '$lib/interfaces/User';

export default interface Contact extends User {
    url: string;
}