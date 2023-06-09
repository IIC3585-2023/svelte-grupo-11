<script>
    import { chosenPizzeria } from '$lib/stores/pizzeriaStore.js'
    import { chosenPizza } from '$lib/stores/pizzaStore.js'
    import { sessionStore } from '../stores/sessionStore';
    import { API_URL } from "$lib/global.js";
    import { goto } from "$app/navigation";

    const pizzeria = $chosenPizzeria
    const pizza = $chosenPizza

    let slices = 4;
    // let chosenDate = (new Date()).toISOString().slice(0, 19);
    let chosenDate = ''

    let formErrors = false;
    let errorMsg = ''

    const validateSlices = (s) => {
        return (s >= 1 && s <= 7);
    }

    const validateDate = (dateString) => {
        return (dateString !== '');
    }

    const removeErrorMsg = () => {
        formErrors = false;
    }

    const buyPizza = async () => {
        console.log('Bought Pizza');
        console.log(`Slices: ${slices}`);
        console.log(`chosenDate: ${chosenDate}:00-04`);

        if (!validateSlices(slices)) {
            console.log('Slices are invalid!')
            errorMsg = 'Cantidad de pedazos debe estar entre 1 y 7'
            formErrors = true;
            return;
        }

        if (!validateDate(chosenDate)) {
            console.log('Invalid Date!')
            errorMsg = 'La fecha no puede ser vacia'
            formErrors = true;
            return;
        }

        const postResponse = await fetch(`${API_URL}/purchases`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${$sessionStore.jwt}`,
            },
            body: JSON.stringify({
                totalSlices: 8,
                boughtSlices: slices,
                date: chosenDate,
                pizza_id: pizza.id
            })
        });
        if (postResponse.status === 200) {
            //TODO: Quiza redireccionar a todas las ordenes puestas, o las
            // del usuario
            goto('/');
        };
    };
</script>

<div class='container is-max-desktop' id='FormContainer'>
    <div class='box is-flex is-flex-direction-column'>
        <div class='content'>
            <p class='title'>{pizzeria.name}</p>
            <p class='subtitle'>{pizzeria.address}</p>
            <h2>Pizza {pizza.name} - {new Intl.NumberFormat('es-cl', { style: 'currency', currency: 'CLP' }).format(pizza.cost)}</h2>
            <p class='subtitle'>{pizza.description}</p>
            <p class='subtitle'>Calorias por pedazo: {pizza.calsPerSlice}</p>
        </div>
        <div class='field'>
            <label for='DatetimeInput' class='label'>Elige tu hora</label>
            <div class='control'>
                <input class='input' type='datetime-local' bind:value={chosenDate}/>
            </div>
        </div>
        <div class='field'>
            <label for='Slices' class='label'>¿Cuantos pedazos quieres?</label>
            <div class='control'>
                <input class='input' bind:value={slices} type='number' min="1" max="7"/>
            </div>
        </div>
        <div class='field is-grouped is-grouped-right'>
            <div class="control">
                <button class="button is-warning" on:click={buyPizza}>Comprar</button>
            </div>
        </div>
        {#if formErrors}
        <article class="message is-danger">
            <div class="message-header">
                <p>Error: {errorMsg}</p>
                <button class="delete" aria-label="delete" on:click={removeErrorMsg}></button>
            </div>
        </article>
        {/if}
    </div>
</div>


<style>
    @media (max-width: 1024px) {
        #FormContainer {
            margin-right: 10px;
            margin-left: 10px;
        }
    }
</style>