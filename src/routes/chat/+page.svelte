<script>
import ChatMessages from "../../lib/components/ChatMessages.svelte";
import ChatUserList from "../../lib/components/ChatUserList.svelte";
import {messagingStore} from '../../lib/stores/messagingStore';
import {sessionStore} from '../../lib/stores/sessionStore';
import { goto } from '$app/navigation';
import { onMount } from 'svelte';

let isChatting = false;

onMount(async () => {
    $messagingStore.selectedUser = false;
    $messagingStore.userSelected = {};
    if(!$sessionStore.loggedIn) goto('/')
})

const goBack = async () => {
    isChatting = false;
}

</script>

<div style=", width: 100%;">
    {#if !isChatting}
            <ChatUserList bind:isChatting></ChatUserList>
    {:else}
        <div class="column has-text-centered">
            <button id="backButton" class='button is-warning has-text-centered' on:click={goBack}>Atrás</button>
            <br>
            <br>
            <ChatMessages></ChatMessages>
        </div>
    {/if}
</div>