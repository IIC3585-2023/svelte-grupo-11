<script>
import {messagingStore} from '../../lib/stores/messagingStore';
import {sessionStore} from '../stores/sessionStore'
import { onMount, onDestroy } from 'svelte';
	import { afterUpdate, tick } from 'svelte';

let inputText = ''
let messages = [];

const currentUserID = $sessionStore.user.id;

let socketActive = false;
let socket = null;
let loading = true;

let element;

afterUpdate(() => {
  if(messages) scrollToBottom(element);
});
	
$: if(messages && element) {
  scrollToBottom(element);
}
const scrollToBottom = async (node) => {
  if (node !== undefined){
    node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
  }
}; 

const sendMessage = () => {
  if (inputText === "") {
    return;
  }
  
  const message = JSON.stringify({
    jwt: $sessionStore.jwt,
    text: inputText,
    receiver_id: $messagingStore.selectedUser.id
  });
  const currTime = new Date()
  messages.push({
    text: inputText,
    time: `${currTime.getHours()}:${currTime.getMinutes()}:${currTime.getSeconds()}`,
    sender_id: currentUserID
  })
  messages = messages
  inputText = '';
  socket.send(message);
}

const sendInitMessage = () => {
  const message = JSON.stringify({
    jwt: $sessionStore.jwt,
    type: "init"
  });
  socket.send(message);
}

const openWebsocket = async () => {
  const API_URL = 'wss://backend-svelte.onrender.com';
  const socket_ = new WebSocket(API_URL + '/websocket/messaging_websocket');

  socket_.addEventListener("open", (event) => {
    console.log("Socket opened");
    socket = socket_;
    socketActive = true;
    sendInitMessage();
  });

  socket_.addEventListener("message", (event) => {
    console.log("Message from server ", event.data);
    const message = JSON.parse(event.data);
    const messageType = message.status;
    if(messageType != "newMessage"){
      console.log("Message from server (not user message):", message);
      return;
    }
    const sender_id = message.sender_id;
    const text = message.message;

    if(sender_id == $messagingStore.selectedUser.id){
        const currTime = new Date().toLocaleString()
        const messageObj = {
          time: currTime,
          text: text,
          sender_id: sender_id
        }
        messages.push(messageObj);
        messages = messages;

    }

  });

  socket_.addEventListener("error", (event) => {
    console.log("Error in socket", event);
  });


  socket_.addEventListener("close", (event) => {
    console.log("Socket closed :(");
    socket = null;
    socketActive = false;
  });
}

const closeWebsocket = async () => {
  if(socket){
    socket.close();
    socket = null;
    socketActive = false;
  }
}

const handleSocket = () => {
  if($sessionStore.loggedIn && !socketActive){
    openWebsocket();
  }

  if(!$sessionStore.loggedIn && socketActive){
    closeWebsocket();
  }
}

$: $sessionStore, handleSocket();

onDestroy(() => {
  closeWebsocket();
})

const getMessages = async () => {
  const API_URL = 'https://backend-svelte.onrender.com';
  if($messagingStore.selectedUser == false || !$messagingStore.selectedUser) return;
  const userID = $messagingStore.selectedUser.id;

  const URL = API_URL + `/messages/${userID}`;
  const token = $sessionStore.jwt;

  const res = await fetch(URL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if(res.status != 200){
    return;
  }

  const responseBody = await res.json();
  console.log(responseBody)
  messages.length = 0;

  if(messages.length == responseBody.length){
    return;
  }

  for(let message of responseBody){
    const date = new Date(message.createdAt);
    message.time = date.toLocaleTimeString('en-US');
    messages.push(message)
  };

  loading = false;
};
$: $messagingStore, getMessages();

const sendMessageEnterKey = async (event) => {
  if (event.key === 'Enter') {
    sendMessage()
  }
}

</script>


{#if loading}
  <div class="loader"></div>
{:else}
<div>
  
</div>
  <div bind:this={element} class="box" style="height: 55vh; overflow-y:scroll; overflow: auto;" >
    {#each messages as message, i}
      {#if message.sender_id == currentUserID}
        <div class="container">
          <img src="../src/lib/assets/user-icon.png" alt="Avatar">
          <p class="time-left">{message.text}</p>
          <span class="time-right">{ message.time }</span>
        </div>
      {:else}
        <div class="container darker">
          <img src="../src/lib/assets/user-icon.png" alt="Avatar" class="right">
          <p>{message.text}</p>
          <span class="time-left">{ message.time }</span>
        </div>
      {/if}
    {/each}
  </div>

  <div class="rows">
      <div class="row is-four-fifths message-input">
          <input class="input" type="text" bind:value={inputText} placeholder="Message" on:keypress={sendMessageEnterKey}>
          <br>
          <br>
          <button class="button is-info is-rounded" disabled={!socketActive || !$messagingStore.userSelected} on:click={sendMessage}>Enviar</button>
      </div>
  </div>
{/if}


<style>
/* Chat containers */

.message-input {
    width: 100%;
}

.container {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}

.container span {
  font-size: large;
}

.container p {
  font-size: large;
  font-weight: bolder;
  margin-left: 5%;
  color: black;
}

/* Darker chat container */
.darker {
  border-color: #ccc;
  background-color: #ddd;
}

/* Clear floats */
.container::after {
  content: "";
  clear: both;
  display: table;
}

/* Style images */
.container img {
  float: left;
  max-width: 60px;
  width: 100%;
  margin-right: 20px;
  border-radius: 50%;
}

/* Style the right image */
.container img.right {
  float: right;
  margin-left: 20px;
  margin-right:0;
}

/* Style time text */
.time-right {
  float: right;
  color: #aaa;
}

/* Style time text */
.time-left {
  float: left;
  color: #999;
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
</style>