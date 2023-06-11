<script>
    import PurchaseCard from "$lib/components/PurchaseCard.svelte";
    import { sessionStore } from "$lib/stores/sessionStore.js"
    import { API_URL } from "$lib/global.js";
    import { onMount } from "svelte";

    let purchases = [];
    let loading = true;
    onMount(async () => {
        const purchasesFetch = await fetch(`${API_URL}/purchases`);
        const rawPurchases = (await purchasesFetch.json()).purchases;
        console.log(rawPurchases);
        const mappedPurchases = rawPurchases.map( (item) => {
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
            return {
                id: item.id,
                remainingSlices: item.remaining_slices,
                pizza: formattedPizza,
                purchaseDate: item.date,
                users: item.users,
                pizzeria: formattedPizzeria,
            }
        })
        if ($sessionStore.loggedIn) {
            purchases = mappedPurchases.filter((item) => {
                for (const user of item.users) {
                    if (user.id === $sessionStore.user.id) {
                        return false
                    }
                }
                return true;
            });
        }
        else {
            purchases = mappedPurchases
        }
        loading = false;
    });

</script>

<div class="hero">
    <div class="hero-body">
        <div class="container has-text-centered">
            <p class="title" id='HeroTitle'>Compras actuales</p>
        </div>
    </div>
</div>

{#if loading}
    <div class="loader"></div>
{:else}
    {#if purchases.length > 0}
        <div class="container" id="PurchasesContainer">
            <div class="columns is-multiline">
                {#each purchases as purchase, i}
                    <div class="column is-one-third-widescreen is-half-tablet">
                        <PurchaseCard {...purchase}/>
                    </div>
                {/each}
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
    #HeroTitle {
        font-size: 70px;
    }

    @media (max-width: 1024px) {
        #PurchasesContainer {
            margin-right: 15px;
            margin-left: 15px;
        }
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