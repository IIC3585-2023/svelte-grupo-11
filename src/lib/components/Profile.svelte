<script>  
    import {sessionStore} from '../stores/sessionStore'
    import { API_URL } from '../global';
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';

    let userPurchases = [];

    let loading = true;

    onMount(async () => {
        // TODO CHECK IF LOGGED IN

        const URL = API_URL + `/purchases/my_purchases`;
        const token = $sessionStore.jwt;

        const resMyPurchases = await fetch(URL, {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`
            }
        });

        if(resMyPurchases.status != 200){
            goto('/');
        }

        userPurchases = (await resMyPurchases.json()).purchases;
        
        loading = false;
    });

    const choosePurchase = () => {
        console.log("click");
    }

    const purchaseBuyer = (users) => {
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if ( user.user_purchase.buyer == true){
                return user.firstName + " " + user.lastName;
            }
        }
    }

</script>

{#if loading}
    <div class="loader"></div>
{:else}
    <div class="columns is-centered is-multiline is-mobile is-variable is-8">
        {#each userPurchases as props, i}
            <div class="column is-narrow">
                
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="card" on:click={choosePurchase}>
                    <div class="card-image">
                        <figure class="image">
                            <img src={props.purchase.pizza.image_url} alt="Pizza">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                        <!-- <div class="media-left">
                            <figure class="image is-48x48">
                                <img src={PapaJohnsLogo} alt="Papa Johns">
                            </figure>
                        </div> -->
                        <div class="media-content">
                            <p class="title is-4">{props.purchase.pizza.name}</p>
                            <p class="subtitle is-6">{props.purchase.pizza.description}</p>
                        </div>
                        </div>
                        
                        <div class="content">
                            Comprador: {purchaseBuyer(props.purchase.users)}
                            <br>
                            Mi cantidad de rebanadas: {props.slices}
                            <br>
                            Cantidad de usuarios: {props.purchase.users.length}
                        </div>
                    </div>
                </div>

            </div>
        {/each}
    </div>
{/if}

<style>
    .media-content {
        overflow: hidden; /* Hide scrollbars */
    }
    .card {
        border: black;
    }

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
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }


    .card {
        width: 24rem;
        cursor: pointer;
        transition: all .2s ease-in-out; 
    }

    .card:hover {
        transform: scale(1.1)
    }
</style>