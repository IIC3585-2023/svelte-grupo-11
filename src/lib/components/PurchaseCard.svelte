<script>
    import { sessionStore } from "$lib/stores/sessionStore.js"
    import { API_URL } from "../global";
    import { goto } from "$app/navigation";

    export let id;
    export let remainingSlices;
    export let pizza;
    export let purchaseDate;
    export let users;
    export let pizzeria;
    export let hideButton = false;
    export let hideChatButton = true;

    const date = new Date(purchaseDate);
    const dateOptions = {
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    }
    const parsedDate = new Intl.DateTimeFormat("es-CL", dateOptions).format(date)

    let buyer = {}
    for (const user of users) {
        if (user.user_purchase.buyer) {
            buyer = user;
            break
        }
    }

    let clickedJoin = false;

    const clickJoin = () => {
        clickedJoin = true;
    }

    let chosenSlices = 1;

    const checkValidSlices = (slices) => {
        if (slices === null) {
            return ''
        }
        else if (slices > remainingSlices) {
            return remainingSlices
        }
        else if (slices < 1) {
            return 1
        }
        return slices
    }

    $: chosenSlices = checkValidSlices(chosenSlices);

    let buttonStatus = ''
    let buttonSuccess = false

    const joinPurchase = async () => {
        console.log(`Joined purchase ${id} with ${chosenSlices} slices!`)
        if (chosenSlices === null) {
            return;
        }
        buttonStatus = 'is-loading';
        const joinPurchaseResponse = await fetch(`${API_URL}/purchases/${id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${$sessionStore.jwt}`,
            },
            body: JSON.stringify({
                boughtSlices: chosenSlices,
            })
        });
        if (joinPurchaseResponse.status === 200) {
            buttonStatus = '';
            buttonSuccess = true;
        }
        else {
            const response = await joinPurchaseResponse.json();
            console.log(response);
        }
    }

    const goToChat = async (receiver_id) => {
        const URL = API_URL + `/messages`;
        const token = $sessionStore.jwt;
        const body = {
            "text": "Hola! Estoy interesado de compartir una pizza.",
            "receiver_id": receiver_id
        }

        const res = await fetch(URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        
        goto('/chat');
    }

</script>


<div class='box is-flex is-flex-direction-column'>
    <div class='columns is-vcentered'>
        <div class='column'>
            <figure class="image is-2by1">
                <img src={pizza.imgUrl} alt="Pizzas" id='PizzaImg'>
            </figure>
            <div class='content'>
                <p class='title'>{pizzeria.name}</p>
                <p class='subtitle'>{pizzeria.address}</p>
                <h2>Pizza {pizza.name} - {new Intl.NumberFormat('es-cl', { style: 'currency', currency: 'CLP' }).format(pizza.cost)}</h2>
                <p class='subtitle'>{pizza.description}</p>
                <p class='subtitle'>{pizza.calsPerSlice} Calorías por pedazo</p>
            </div>
        </div>
    </div>
    <div class="content">
        <p class='title'>{remainingSlices} {remainingSlices === 1 ? "pedazo restante" : "pedazos restantes"}</p>
        <p>Programada para el {parsedDate}</p>
        <p>Comprada por {buyer.firstName} {buyer.lastName}</p>
        
        {#if buyer.id !== $sessionStore.user.id}
            {#if !hideChatButton}
                <button id="chatButton" class='button is-warning has-text-centered' on:click={goToChat(buyer.id)}>Hablar con comprador</button>
            {/if}
        {/if}
    </div>
    {#if $sessionStore.loggedIn}
        {#if !clickedJoin}
            <br><br>
            {#if  !hideButton}
                <button class='button is-warning' on:click={clickJoin}>Unirse a la compra</button>
            {/if}
            <br>
        {:else}
            <div class='field'>
                <label for='Slices' class='label'>¿Cuantos pedazos quieres?</label>
                <div class='control'>
                    <input class='input' bind:value={chosenSlices} type='number' min="1" max="{remainingSlices}"/>
                </div>
            </div>
            <button class='button is-warning {buttonStatus}' on:click={joinPurchase} disabled="{buttonSuccess}">
                {#if !buttonSuccess}
                    Unirse
                {:else}
                    Unido
                {/if}
            </button>
        {/if}
    {/if}
</div>
 

<style>
    #PizzaImg {
        object-fit: cover;
        border-radius: 8px;
    }
</style>