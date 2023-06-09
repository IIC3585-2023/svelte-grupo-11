<script>
    import PizzeriasCardsList from '$lib/components/PizzeriasCardsList.svelte';
    import PizzasCardList from '$lib/components/PizzasCardsList.svelte';
    import PizzaConfirmation from '$lib/components/PizzaConfirmation.svelte';

    import { chosenPizzeria } from '$lib/stores/pizzeriaStore.js'
    import { chosenPizza } from '$lib/stores/pizzaStore.js'
    import { onDestroy } from "svelte";

    let pizzeriaChosen = false;
    let pizzaChosen = false;

    let step = 0;

    let headerMessages = ['Elige tu Pizzeria', 'Elige tu Pizza', 'Termina tu pedido'];

    $: headerMessage = headerMessages[step];

    chosenPizzeria.subscribe( (value) => {
        pizzeriaChosen = value.id < 0 ? false : true;
        if (pizzeriaChosen) {
            step = 1;
        }
    });

    chosenPizza.subscribe( (value) => {
        pizzaChosen = value.id < 0 ? false : true;
        if (pizzaChosen) {
            step = 2;
        }
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

<div class="hero">
    <div class="hero-body">
        <div class="container has-text-centered">
            <p class="title" id='HeroTitle'>{ headerMessage }</p>
        </div>
    </div>
</div>

{#if step === 0}
    <PizzeriasCardsList/>
{:else if step === 1}
    <PizzasCardList/>
{:else if step === 2}
    <PizzaConfirmation/>
{/if}

{#if step > 0}
    <div class="hero">
        <div class="hero-body">
            <div class="container has-text-centered">
                <button class="button is-warning" on:click={() => step -= 1}>Volver</button>
            </div>
        </div>
    </div>
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