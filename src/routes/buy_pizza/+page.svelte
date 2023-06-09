<script>
    import PizzeriasCardsList from '$lib/components/PizzeriasCardsList.svelte';
    import PizzasCardList from '$lib/components/PizzasCardsList.svelte';
    import PizzaConfirmation from '$lib/components/PizzaConfirmation.svelte';

    import { chosenPizzeria } from '$lib/stores/pizzeriaStore.js'
    import { chosenPizza } from '$lib/stores/pizzaStore.js'
    import { onDestroy } from "svelte";

    let pizzeriaChosen = false;
    let pizzaChosen = false;

    chosenPizzeria.subscribe( (value) => {
        pizzeriaChosen = value.id < 0 ? false : true;
    });

    chosenPizza.subscribe( (value) => {
        pizzaChosen = value.id < 0 ? false : true;
    })

    onDestroy( () => {
        chosenPizzeria.update( previous => {
            previous.id = -1;
            return previous;
        });
        chosenPizza.update( previous => {
            previous.id = -1;
            return previous;
        });
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
    <PizzaConfirmation/>
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