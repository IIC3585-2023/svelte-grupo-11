<script>
import {sessionStore} from '../../lib/stores/sessionStore';
import { API_URL } from '../../lib/global';
import { goto } from '$app/navigation';

let firstName = '';
let lastName = '';
let email = '';
let password = '';

let validatedFirstName = false;
let validatedLastName = false;
let validatedEmail = false;
let validatedPassword = false;

let showError = false;

if($sessionStore.loggedIn){
    goto('/')
}

$: validated = validatedFirstName && validatedLastName && validatedEmail && validatedPassword;
let loadingButton = false;

const validateFirstName = () => {
    validatedFirstName = firstName != '';
}

const validateLastName = () => {
    validatedLastName =  lastName != '';
}

const validateEmail = () => {
    validatedEmail =  email != '';
}

const validatePassword = () => {
    validatedPassword =  password != '';
}

const hideError = () => {
    showError = false;
}

const submitForm = async () => {
    loadingButton = true;
    const body = {
        firstName: firstName,
        lastName: lastName, 
        email: email, 
        password
    }

    const response = await fetch(API_URL + '/sign_up', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    loadingButton = false;
    if(response.status != 200){
        console.log("Error");
        showError = true;
        return;
    };

    goto('/login');
}
    


</script>
<!-- https://frontendshape.com/post/bulma-css-login-form-page-example -->
<div class="hero is-fullheight" id='HeroContainer'>
    <div class="hero-body is-justify-content-center is-align-items-center">
        <div class="columns is-flex is-flex-direction-column box form-container">
            <div class="column">
                <label for="firstName">First Name</label>
                <input class="input is-primary {validatedFirstName ? '' : 'is-danger'}" type="text" on:change={validateFirstName} bind:value={firstName} placeholder="Rich">
            </div>
            <div class="column">
                <label for="lastName">Last Name</label>
                <input class="input is-primary {validatedLastName ? '' : 'is-danger'}" type="text" on:change={validateLastName} bind:value={lastName} placeholder="Harris">
            </div>
            <div class="column">
                <label for="email">Email</label>
                <input class="input is-primary {validatedEmail ? '' : 'is-danger'}" type="text" on:change={validateEmail} bind:value={email} placeholder="rich.harris@uc.cl">
            </div>
            <div class="column">
                <label for="Name">Password</label>
                <input class="input is-primary {validatedPassword ? '' : 'is-danger'}" type="password" on:change={validatePassword} bind:value={password} placeholder="Password">
            </div>
            {#if showError}
                <article class="message is-danger" style="width: 90%; margin-left: 5%">
                    <div class="message-header">
                    <p>Error</p>
                    <button class="delete" aria-label="delete" on:click={hideError}></button>
                    </div>
                    <div class="message-body">
                        Error al hacer signup
                    </div>
                </article>
            {/if}
            <div class="column">
                <button class="button is-warning is-fullwidth {loadingButton ? 'is-loading' : ''}" type="submit" on:click={submitForm} disabled={!validated}>SignUp</button>
            </div>
            <div class="has-text-centered">
                <p class="is-size-7"> Already have an account? <a href="/login" class="has-text-primary">Login</a>
                </p>
            </div>
        </div>
    </div>
</div>

<style>
    @media (min-width:1025px) {
        .form-container{
            width: 70%;
        }
    }

    #HeroContainer {
        margin-top: -5%;
    }
</style>