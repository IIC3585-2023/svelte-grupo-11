import { writable } from 'svelte/store';

export const messagingStore = writable({
    userSelected: false,
    selectedUser: ''
});