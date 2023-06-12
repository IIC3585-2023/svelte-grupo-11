<script>
    import PizzaIcon from '$lib/assets/pizza.png'
    import {sessionStore} from '../stores/sessionStore';
    import { goto } from '$app/navigation';

    let burgerToggle = false

    const toggleBurger = () => {
        burgerToggle = !burgerToggle
    }

    const hideDropdown = () => {
        burgerToggle = false;
    }

    $: menuActive = burgerToggle ? 'is-active' : '';

    const signout = () => {
        sessionStore.update((previous) => {
        previous.loggedIn = false;
        previous.jwt = '';
        previous.user = '';
        burgerToggle = false;
        goto('/')
        return previous;
    })};

</script>

<nav class="navbar is-warning" aria-label="main navigation">
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
        <a href="/buy_pizza" class="navbar-item" on:click={hideDropdown}>
            Pedir una Pizza
        </a>
        {/if}
        {#if $sessionStore.loggedIn}
        <a href="/chat" class="navbar-item" on:click={hideDropdown}>
            Chat
        </a>
        {/if}
        {#if $sessionStore.loggedIn}
        <a href="/profile" class="navbar-item" on:click={hideDropdown}>
            Mis pizzas
        </a>
        {/if}
        </div>
        {#if !$sessionStore.loggedIn}

        <div class="navbar-end">
        <div class="navbar-item">
            <div class="buttons">
            <a href="/signup" class="button is-warning is-dark" on:click={hideDropdown}>
                <strong>Sign up</strong>
            </a>
            <a href="/login" class="button is-warning" on:click={hideDropdown}>
                Log in
            </a>
            </div>
        </div>
        </div>
        {:else}
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                    <a href="#top" class="button is-warning not-clickable">
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

    .not-clickable {
        cursor: default;
    }

    .navbar-menu {
        background-color: #FFE08A;
    }

@media only screen and (max-width: 1000px) {
  .navbar-menu {
      display: block;
      opacity: 0;
      position: relative;
      padding: 0;
      left: 0;
      right: 0;
      max-height: 0px;
      transition: all 0.25s ease-in-out;
      pointer-events: none;
      overflow: hidden;
  }

  .navbar-menu.is-active {
    max-height: 200px;
    padding: .5rem .75rem;
      opacity: 1;
      transform: none;
      pointer-events: auto;
  }
}
</style>