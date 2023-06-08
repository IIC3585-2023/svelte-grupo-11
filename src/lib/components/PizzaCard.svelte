<script>
    import { chosenPizzaId } from '$lib/stores/pizzaStore.js'

    export let id;
    export let name;
    export let description;
    export let cost;
    export let calsPerSlice;
    export let imgUrl;

    const choosePizza = () => {
        console.log(`Chose pizza ${name} (ID: ${id})!`)
        chosenPizzaId.update( (n) => id);
    }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="card" on:click={choosePizza}>
    <div class="card-image">
        <figure class="image is-2by1">
            <img src={imgUrl} alt="Pizzas">
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
            <p class="title is-4">{name}</p>
            <p class="subtitle is-8">{new Intl.NumberFormat('es-cl', { style: 'currency', currency: 'CLP' }).format(cost)}</p>
        </div>
        </div>

        <div class="content">
        {description}
        <br><br>
        Calorias por pedazo: {calsPerSlice}
        </div>
    </div>
</div>

<style>
    .card {
        max-width: 20rem;
        cursor: pointer;
        transition: all .2s ease-in-out; 
    }

    .card:hover {
        transform: scale(1.1)
    }
</style>