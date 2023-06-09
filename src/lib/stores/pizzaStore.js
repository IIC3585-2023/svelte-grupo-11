import { writable } from "svelte/store";

export const chosenPizza = writable({
    id: -1,
    name: '',
    description: '',
    cost: '',
    calsPerSlice: '',
    imgUrl: '',
});