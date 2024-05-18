<script>
    import { onMount } from "svelte";
    import { getAllScans } from "$lib/db.js";
    import TextArea from "$lib/componants/textArea.svelte";

    let scans = [];

    onMount(async () => {
        console.log(await getAllScans());
        scans = await getAllScans();
    });

    function formatDate(date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        day = day < 10 ? "0" + day : day;
        month = month < 10 ? "0" + month : month;

        let ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        let formattedDate = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
        return formattedDate;
    }
</script>

<div class="main">
    {#if scans && scans.length !== 0}
        {#each scans as scan}
            <span>{formatDate(scan.date)}</span>
            <TextArea content={scan.content} height="100px" />
        {/each}
    {:else}
        <p>No scans.</p>
    {/if}
</div>

<style>
    .main {
        padding: 20px;
    }
</style>
