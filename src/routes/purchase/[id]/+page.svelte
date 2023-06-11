<script>
    // /** @type {import('./$types').PageData} */
    export let data;

    import {sessionStore} from '$lib/stores/sessionStore'
    import { onMount } from "svelte";
    import { API_URL } from '$lib/global';
    import PurchaseCard from "$lib/components/PurchaseCard.svelte";

    let loading = true;
    let purchase = {};
    let reformatedPurchase = {}

    onMount(async () => {
        const URL = API_URL + `/purchases/${data.purchaseId}`;
        const token = $sessionStore.jwt;

        const resMyPurchases = await fetch(URL, {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`
            }
        });

        console.log(URL)
        if(resMyPurchases.status != 200){
            goto('/');
        }
        purchase = (await resMyPurchases.json()).purchase;
        
        const item = purchase;
        console.log(item)
        const formattedPizza = {
            id: item.pizza_id,
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
        console.log(purchase)
        
        loading = false;
    });


</script>


{#if purchase !== {}}
<div class="container" id="PurchasesContainer">
    <div class="columns is-multiline">
        <div class="column is-one-third-widescreen is-half-tablet">
            <!-- <PurchaseCard {...purchase}/> -->
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