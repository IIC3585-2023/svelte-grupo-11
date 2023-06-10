<script>
import {messagingStore} from '../../lib/stores/messagingStore';
import { onMount } from 'svelte';
import {API_URL} from '../global';
import {sessionStore} from '../stores/sessionStore';

let users = []

const selectUser = (user) => {
    $messagingStore.selectedUser = user;
    $messagingStore.userSelected = true;
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
}

onMount(async () => {
    if($sessionStore.loggedIn != true) return;
    await getUserList();
});

</script>

<div class="content">
    {#each users as user, i}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="box clickable" on:click={() => selectUser(user)}>
        {`${user.firstname} ${user.lastname}`}
    </div>
    {/each}
</div>

<style>
    .clickable:hover{
        cursor: pointer;
        background-color: #D3D3D3;
    }
</style>