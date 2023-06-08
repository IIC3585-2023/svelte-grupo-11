<script>
    import PizzaIcon from '$lib/assets/pizza.png'

    let burgerToggle = false

    const toggleBurger = () => {
        burgerToggle = !burgerToggle
    }

    $: menuActive = burgerToggle ? 'is-active' : '';
</script>

<nav class="navbar" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="/">
            <img src={PizzaIcon} alt='bulma_icon' width="28" height="28">
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
        <a href="buy_pizza" class="navbar-item">
            Pedir una Pizza
        </a>

        <a href="current_pizzas" class="navbar-item">
            Pizzas actuales
        </a>

        <!-- <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
            More
            </a>

            <div class="navbar-dropdown">
            <a class="navbar-item">
                About
            </a>
            <a class="navbar-item">
                Jobs
            </a>
            <a class="navbar-item">
                Contact
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item">
                Report an issue
            </a>
            </div>
        </div> -->
        </div>

        <div class="navbar-end">
        <div class="navbar-item">
            <div class="buttons">
            <a href="signup" class="button is-warning">
                <strong>Sign up</strong>
            </a>
            <a href="/login" class="button is-light">
                Log in
            </a>
            </div>
        </div>
        </div>
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
</style>