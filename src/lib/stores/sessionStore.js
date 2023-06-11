import { persist, createLocalStorage } from "@macfja/svelte-persistent-store"
import { writable } from 'svelte/store';

export const sessionStore = persist(writable({
    loggedIn: false,
    user: '',
    jwt: ''
}), createLocalStorage(), 'sessionSvelte')