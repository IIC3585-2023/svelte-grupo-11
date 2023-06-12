<script>
import {messagingStore} from '../../lib/stores/messagingStore';
import { onMount } from 'svelte';
import {API_URL} from '../global';
import {sessionStore} from '../stores/sessionStore';

export let isChatting;

let users = []

let loading = true;

const selectUser = (user) => {
    $messagingStore.selectedUser = user;
    $messagingStore.userSelected = true;
    isChatting = true;
    console.log("Selected User", $messagingStore.selectedUser)
}

const currentUserID = $sessionStore.user.id;

const getUserList = async () => {
    const token = $sessionStore.jwt;
    const res = await fetch(API_URL + '/messages/users', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    });    
    if(res.status != 200){
        return;
    }

    const responseBody = await res.json();
    const newUsers = [];
    const userID = $sessionStore.user.id;
    for(let userPair of responseBody){
        if(userPair.receiver_id != userID){
            let add = true;
            for(let user of newUsers){
                if(user.id == userPair.receiver_id) add = false
            }
            if(add) newUsers.push({id: userPair.receiver_id, firstname: userPair.receiverfirstname, lastname: userPair.receiverlastname})
        }
        else{
            let add = true;
            for(let user of newUsers){
                if(user.id == userPair.sender_id) add = false
            }
            if(add) newUsers.push({id: userPair.sender_id, firstname: userPair.senderfirstname, lastname: userPair.senderlastname})
        }
    };
    users = newUsers;
    loading = false;
}

onMount(async () => {
    if($sessionStore.loggedIn != true) return;
    await getUserList();
});

</script>

{#if loading}
    <div class="loader"></div>
{:else}
    <br>
    <div class="content">
        {#each users as user, i}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="box clickable" on:click={() => selectUser(user)}>
                {`${user.firstname} ${user.lastname}`}
            </div>
        {/each}
    </div>
{/if}

<style>
    .clickable:hover{
        cursor: pointer;
        background-color: #D3D3D3;
    }

    .loader {
        border: 16px solid #f3f3f3;
        border-top: 16px solid hsl(48, 100%, 67%);
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
        margin-left: auto;
        margin-right: auto;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .box {
        background-color: #FFE08A;
        font-weight: bolder;
    }
</style>