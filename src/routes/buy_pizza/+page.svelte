<script>
    import PizzeriasCardsList from '$lib/components/PizzeriasCardsList.svelte';
    import PizzasCardList from '$lib/components/PizzasCardsList.svelte'

    import { chosenPizzeriaId } from '$lib/stores/pizzeriaStore.js'
    import { chosenPizzaId } from '$lib/stores/pizzaStore.js'
    import { onDestroy } from "svelte";
    import { get } from 'svelte/store';

    let pizzeriaChosen = false;
    let pizzaChosen = false;

    chosenPizzeriaId.subscribe( (value) => {
        pizzeriaChosen = value < 0 ? false : true;
    });

    chosenPizzaId.subscribe( (value) => {
        pizzaChosen = value < 0 ? false : true;
    })

    onDestroy( () => {
        chosenPizzeriaId.update((n) => -1);
        chosenPizzaId.update((n) => -1);
    })
</script>

<!-- TODO: Cambiar esto pa que haga display al titulo correcto segun el paso, y quiza poner algo
asi como step 1, step 2, step 3, etc. y poner botones pa volver al step anterior-->
<div class="hero">
    <div class="hero-body">
        <div class="container has-text-centered">
            <p class="title" id='HeroTitle'>Elige tu Pizzeria</p>
        </div>
    </div>
</div>

{#if !pizzeriaChosen}
    <PizzeriasCardsList/>
{:else if !pizzaChosen}
    <PizzasCardList/>
{:else}
    <h1>Elegidas pizzas y pizzerias</h1>
    <p>Pizzeria ID: {get(chosenPizzeriaId)}</p>
    <p>Pizza ID: {get(chosenPizzaId)}</p>
{/if}



<style>
    /* @font-face {
        font-family: 'PizzaFont';
        font-size: 'Normal';
        font-weight: 400;
        src: url('/fonts/CHEESEPIZZA.ttf') format('truetype')
    } */

    #HeroTitle {
        /* font-family: 'PizzaFont'; */
        font-size: 70px;
    }
</style>