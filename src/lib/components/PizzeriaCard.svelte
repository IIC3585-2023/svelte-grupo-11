<script>
    import { chosenPizzeria } from '$lib/stores/pizzeriaStore.js'

    export let id;
    export let name;
    export let area;
    export let address;
    export let openingHours;
    export let closingHours;
    export let imgUrl;

    const choosePizzeria = () => {
        console.log(`Chose pizzeria ${name} (ID: ${id})!`)
        chosenPizzeria.update( previous => {
            return {
                id,
                name,
                area,
                address,
                openingHours,
                closingHours,
                imgUrl,
            }
        })
    }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="card" on:click={choosePizzeria}>
    <div class="card-image">
        <figure class="image is-square">
            <img src={imgUrl} alt="Papa Johns">
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
            <p class="subtitle is-6">{area}</p>
        </div>
        </div>

        <div class="content">
        {address}
        <br>
        Horario atención: {openingHours} - {closingHours}
        </div>
    </div>
</div>

<style>
    .card {
        max-width: 24rem;
        cursor: pointer;
        transition: all .2s ease-in-out; 
    }

    .card:hover {
        transform: scale(1.1)
    }
</style>