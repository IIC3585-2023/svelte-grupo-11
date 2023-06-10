<script>
import ChatMessages from "../../lib/components/ChatMessages.svelte";
import ChatUserList from "../../lib/components/ChatUserList.svelte";
import {messagingStore} from '../../lib/stores/messagingStore';
import {sessionStore} from '../../lib/stores/sessionStore';
import { goto } from '$app/navigation';
import { onMount } from 'svelte';

onMount(async () => {
    $messagingStore.selectedUser = false;
    $messagingStore.userSelected = {};
    if(!$sessionStore.loggedIn) goto('/')
})

</script>

<!-- <div class="columns box" style="margin-left: 20px; margin-right: 20px; margin-top: 20px; height: 100% !important; max-height: 100% !important">
    <div class="column is-one-third has-text-centered" style="overflow-y: auto; height: 100% !important; max-height: 100% !important">
        <ChatUserList></ChatUserList>
    </div>
    <div class="column is-two-thirds has-text-centered">Auto</div>
</div> -->
<div class="columns box" style="margin-left: 20px; margin-right: 20px; margin-top: 20px; height: 800px !important; max-height: 800px !important">
    <div class="column is-one-third has-text-centered" style="overflow-y: auto; height: 100% !important; max-height: 100% !important">
        <ChatUserList></ChatUserList>
    </div>
    <div class="column is-two-thirds has-text-centered">
        <ChatMessages></ChatMessages>
    </div>
</div>