<script>
    import {notificationStore} from '../stores/notificationStore';
    let x;
    let open = false;
    const showToast = () => {
        open = true;
        clearTimeout(x);
        x = setTimeout(()=>{
            open = false;
        }, 4000);
    }

    const closeToast = () => {
        open = false;
    }
    
    notificationStore.subscribe((value) => {
        console.log($notificationStore.showNotification)
        if(!$notificationStore.showNotification) return;
        showToast();
        $notificationStore.showNotification = false;
    })

</script>

<div class="wrapper">
    <div id="toast" style="{open ? 'transform: translate(0px);' : 'transform: translate(400px);'}">
        <div class="container-1">
            <i class="fas fa-check-square"></i>
        </div>
        <div class="container-2">
            <p>Notificacion</p>
            <p>Una persona se unio a una de tus compras</p>
        </div>
        <button id="close" on:click={closeToast}>
            &times;
        </button>
    </div>
</div>

<style scoped>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Poppins",sans-serif;
    font-size: 14px;
    border: none;
}
.wrapper{
    width: 420px;
    padding: 30px 20px;
    position: absolute;
    bottom: 50px;
    right: 0;
    overflow: hidden;
}
#toast{
    width: 380px;
    height: 80px;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0 10px 20px rgba(75, 50, 50, 0.05);
    border-left: 8px solid #47d764;
    border-radius: 7px;
    display: grid;
    grid-template-columns: 1.2fr 6fr 0.5fr;
    /* transform: translate(400px); */
    transition: 1s;
}
.container-1,.container-2{
    align-self: center;
}
.container-1 i{
    font-size: 40px;
    color: #47d764;
}
.container-2 p:first-child{
    color: #101020;
    font-weight: 600;
    font-size: 16px;
}
.container-2 p:last-child{
    font-size: 12px;
    color: #656565;
    font-weight: 400;
}
#toast button{
    align-self: flex-start;
    background-color: transparent;
    font-size: 25px;
    line-height: 0;
    color: #656565;
    cursor: pointer;
}
</style>