import { writable } from "svelte/store";

export const chosenPizzeria = writable({
    id: -1,
    name: '',
    area: '',
    address: '',
    openingHours: '',
    closingHours: '',
    imgUrl: '',
});