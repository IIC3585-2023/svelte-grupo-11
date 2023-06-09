<script>
    import PizzaCard from "./PizzaCard.svelte";
    import { chosenPizzeria } from '$lib/stores/pizzeriaStore.js'
    import { API_URL } from "$lib/global.js";
    import { onMount } from "svelte";

    let pizzeriaId = $chosenPizzeria.id;
    let loading = true;
    let pizzas = []

    onMount(async () => {

        const pizzasFetch = await fetch(`${API_URL}/pizzerias/${pizzeriaId}/pizzas`);
        let rawPizzas = (await pizzasFetch.json()).pizzas;
        pizzas = rawPizzas.map( (pizza) => {
            return {
                id: pizza.id,
                name: pizza.name,
                description: pizza.description,
                cost: pizza.cost,
                calsPerSlice: pizza.cps,
                imgUrl: pizza.image_url,
            }
        })
        loading = false;
    });
</script>

{#if loading}
    <div class="loader"></div>
{:else}
    <div class="columns is-centered is-multiline is-mobile is-variable is-8">
        {#each pizzas as props, i}
        <div class="column is-narrow">
            <PizzaCard {...props}/>
        </div>
        {/each}
    </div>
{/if}

<style>
    .columns {
        margin: 0;
    }

    .loader {
        border: 16px solid #f3f3f3; /* Light grey */
        border-top: 16px solid hsl(48, 100%, 67%); /* Blue */
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
        margin-left: auto;
        margin-right: auto;
        /* position: absolute; */
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>