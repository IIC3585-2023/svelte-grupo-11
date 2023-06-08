<script>
    export let text;

    $: longer = text + ' with more text'
</script>

<input bind:value={text}>

<p>Value of text is {text}</p>
<p>Longer text is  {longer}</p>

<style>
</style>