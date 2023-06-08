import { writable } from 'svelte/store';

export const sessionStore = writable({
    loggedIn: false,
    user: '',
    jwt: ''
});