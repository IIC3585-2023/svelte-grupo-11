<script>
    import PizzaIcon from '$lib/assets/pizza.png'
    import {sessionStore} from '../stores/sessionStore';

    let burgerToggle = false

    const toggleBurger = () => {
        burgerToggle = !burgerToggle
    }

    $: menuActive = burgerToggle ? 'is-active' : '';

    const signout = () => {
        sessionStore.update((previous) => {
        previous.loggedIn = false;
        previous.jwt = '';
        previous.user = '';
        return previous;
    })};

</script>

<nav class="navbar" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" id='PizzaLogo' href="/">
            <img src={PizzaIcon} alt='bulma_icon' width="32" height="32">
        </a>
        <a class="navbar-item" id='PizzaSplit' href="/">
            PizzaSplit
        </a>

        <a href="#top" role="button" class="navbar-burger {menuActive}" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" on:click={toggleBurger}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu {menuActive}">
        <div class="navbar-start">
        {#if $sessionStore.loggedIn}
        <a href="/buy_pizza" class="navbar-item">
            Pedir una Pizza
        </a>
        {/if}
        <a href="/current_pizzas" class="navbar-item">
            Pizzas actuales
        </a>
        {#if $sessionStore.loggedIn}
        <a href="/chat" class="navbar-item">
            Chat
        </a>
        {/if}
        </div>
        {#if !$sessionStore.loggedIn}

        <div class="navbar-end">
        <div class="navbar-item">
            <div class="buttons">
            <a href="/signup" class="button is-warning">
                <strong>Sign up</strong>
            </a>
            <a href="/login" class="button is-light">
                Log in
            </a>
            </div>
        </div>
        </div>
        {:else}
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                    <a href="#top" class="button is-warning">
                        <strong>{$sessionStore.user.firstName +' ' +  $sessionStore.user.lastName}</strong>
                    </a>
                    <a href="#top" on:click={signout} class="button is-light">
                        Sign out
                    </a>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</nav>

<style>
    @font-face {
        font-family: 'PizzaFont';
        font-size: 'Normal';
        font-weight: 400;
        src: url('/fonts/CHEESEPIZZA.ttf') format('truetype')
    }

    #PizzaSplit {
        font-family: 'PizzaFont';
        font-size: xx-large;
        padding-left: 6px;
    }
    #PizzaSplit:hover {
        color: black;
    }

    #PizzaLogo {
        padding-right: 6px;
    }
</style>