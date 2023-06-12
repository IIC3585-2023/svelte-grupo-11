<script>
    import Profile from "../../lib/components/Profile.svelte";

// const currentUserID = $sessionStore.user.id;


</script>

<div class="hero">
    <div class="hero-body">
        <div class="container has-text-centered">
            <p class="title" id='HeroTitle'>Mis Pizzas</p>
        </div>
    </div>
</div>

<Profile/>

<style>
    #HeroTitle {
        font-size: 70px;
    }
</style>