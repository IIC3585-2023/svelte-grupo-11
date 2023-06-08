<script>
    import PizzeriaCard from "$lib/components/PizzeriaCard.svelte";
    import { API_URL } from "$lib/global.js";
    import { onMount } from "svelte";

    let loading = true;
    let pizzerias = []

    onMount(async () => {

        const pizzeriasFetch = await fetch(`${API_URL}/pizzerias`)
        let rawPizzerias = (await pizzeriasFetch.json()).pizzerias;
        pizzerias = rawPizzerias.map( (pizzeria) => {
            return {
                id: pizzeria.id,
                name: pizzeria.name,
                address: pizzeria.address,
                area: pizzeria.area,
                openingHours: pizzeria.opening_hour.slice(0, 5),
                closingHours: pizzeria.closing_hour.slice(0, 5),
                imgUrl: pizzeria.image_url,
            }
        })
        loading = false;
    });


</script>

<div class="hero">
    <div class="hero-body">
        <div class="container has-text-centered">
            <p class="title" id='ChoosePizzeriaTitle'>Elige tu Pizzeria</p>
        </div>
    </div>
</div>

{#if loading}
    <div class="loader"></div>
{:else}
<div class="columns is-centered is-multiline is-mobile is-variable is-8">
    {#each pizzerias as props, i}
    <div class="column is-narrow">
        <PizzeriaCard {...props}/>
    </div>
    {/each}
</div>
{/if}

<style>
    @font-face {
        font-family: 'PizzaFont';
        font-size: 'Normal';
        font-weight: 400;
        src: url('/fonts/CHEESEPIZZA.ttf') format('truetype')
    }

    #ChoosePizzeriaTitle {
        /* font-family: 'PizzaFont'; */
        font-size: 70px;
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