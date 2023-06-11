<script>
    // /** @type {import('./$types').PageData} */
    export let data;

    import {sessionStore} from '$lib/stores/sessionStore'
    import { onMount } from "svelte";
    import { API_URL } from '$lib/global';
    import PurchaseCard from "$lib/components/PurchaseCard.svelte";
    
    import { goto } from "$app/navigation";

    let loading = true;
    let reformatedPurchase = null
    let hideButton = true;

    onMount(async () => {
        const URL = API_URL + `/purchases/${data.purchaseId}`;
        const token = $sessionStore.jwt;

        const res = await fetch(URL, {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`
            }
        });
        if(res.status != 200){
            goto('/');
        }
        
        const item = (await res.json()).purchase;
        const formattedPizza = {
            id: item.pizza.id,
            name: item.pizza.name,
            description: item.pizza.description,
            cost: item.pizza.cost,
            calsPerSlice: item.pizza.cps,
            imgUrl: item.pizza.image_url,
        };
        const formattedPizzeria = {
            id: item.pizza.pizzeria.id,
            name: item.pizza.pizzeria.name,
            address: item.pizza.pizzeria.address,
            imgUrl: item.pizza.pizzeria.image_url,
            openingHour: item.pizza.pizzeria.opening_hour,
            closingHour: item.pizza.pizzeria.closing_hour,
            area: item.pizza.pizzeria.area,
        }
        reformatedPurchase = {
            id: item.id,
            remainingSlices: item.remaining_slices,
            pizza: formattedPizza,
            purchaseDate: item.date,
            users: item.users,
            pizzeria: formattedPizzeria,
        }
        
        loading = false;
    });

    const goBack = () => {
        goto('/profile')
    }


</script>

{#if loading}
    <br>
    <br>
    <div class="loader"></div>
{:else}
    {#if reformatedPurchase !== null}
        <div class="container" id="PurchasesContainer">
            <div class="columns is-multiline">
                <div class="column is-center">
                    <div class="item">
                      <PurchaseCard {...reformatedPurchase} {hideButton}/>
                      <br>
                      <button id="backButton" class='button is-warning has-text-centered' on:click={goBack}>Atrás</button>
                    </div>
                </div>
            </div>
        </div>
    {:else}
        <div class="hero">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <p class="title">No se encontraron compras actuales</p>
                </div>
            </div>
        </div>
    {/if}
{/if}

    
<style>
    @media (max-width: 0px) {
        #PurchasesContainer {
            max-width: 1rem;
            margin-right: 15px;
            margin-left: 15px;
        }
    }
    .item {
        max-width: 60rem;
        align-content: center;
        align-items: center;
        margin: auto;
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

    #backButton {
        display:block
    }
</style>