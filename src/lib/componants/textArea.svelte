<script>
    export let content, height;

    let copyStatus = "Copy";
    let textarea;

    async function copyToClipboard() {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(textarea.value);
                copyStatus = "Copied!";
            } else {
                textarea.select();
                const successful = document.execCommand("copy");
                copyStatus = successful ? "Copied!" : "Error";
            }
        } catch (err) {
            copyStatus = "Error";
            console.error("Error copying to clipboard:", err);
        }

        setTimeout(() => {
            copyStatus = "Copy";
        }, 3000);
    }
</script>

<div class="textarea-container">
    <textarea id="textarea" spellcheck="false" bind:this={textarea} style="height: {height || '200px'};">{content}</textarea>
    <div id="copyToClipboard-a" class="clipboard">
        <button class="copy-button" on:click={copyToClipboard}>{copyStatus}</button>
    </div>
</div>

<style>
    .textarea-container {
        position: relative;
        width: 100%;
    }

    textarea {
        min-width: 20vw;
        max-width: 80vw;
        /* min-height: 200px;
        max-height: 80vh; */
        font-size: 1em;
        background-color: #222222;
        color: #fff;
        padding: 10px;
        border: 1px solid #dcdcdc;
        border-radius: 5px;
        resize: vertical;
        width: 100%;
        /* height: 200px; */
    }
    textarea::-webkit-scrollbar {
        width: 4px;
    }
    textarea::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    textarea::-webkit-scrollbar-thumb {
        background: #888;
    }
    textarea::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    .copy-button {
        position: absolute;
        top: 20px;
        right: 0;
        background-color: #4caf50;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
        cursor: pointer;
        font-size: 12px;
        margin: -14px -17px;
    }

    .copy-button:hover {
        background-color: #45a049;
    }
</style>
