<script>
    import { page } from "$app/stores";
</script>

<div class="container">
    <div class="main">
        <div class="center">
            <nav>
                {#if $page.url.pathname === "/"}
                    <span>Home</span>
                {:else}
                    <button class="dark-button"><a href="/">Home</a> </button>
                {/if}
                {#if $page.url.pathname === "/history"}
                    <span>History</span>
                {:else}
                    <button class="dark-button">
                        <a href="/history">History</a>
                    </button>
                {/if}
                {#if $page.url.pathname === "/settings"}
                    <span>Settings</span>
                {:else}
                    <button class="dark-button">
                        <a href="/settings">Settings</a>
                    </button>
                {/if}
            </nav>
        </div>

        <slot></slot>
    </div>
</div>

<style>
    :global(body) {
        background-color: #352f44;
        color: #fff;
        margin: 0;
        padding: 0;
    }
    :global(a) {
        background-color: inherit;
        color: inherit;
        text-decoration: none;
    }
    .container {
        display: flex;
        justify-content: center;
    }
    .main {
        width: 350px;
    }
    .center {
        display: flex;
        justify-content: center;
        padding-top: 0.25rem;
    }
    .dark-button {
        background-color: #5c5470;
        color: #ffffff;
        border: 0;
        padding: 4px 8px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
        transition:
            background-color 0.3s,
            color 0.3s,
            border 0.3s;
    }

    .dark-button a {
        text-decoration: none;
    }

    .dark-button:hover {
        background-color: #b9b4c7;
        color: #faf0e6;
    }

    a:hover {
        color: #faf0e6;
    }

    .dark-button:active {
        background-color: #b9b4c7;
        color: #faf0e6;
    }
    a:active {
        color: #faf0e6;
    }
    span {
        padding: 4px 8px;
    }
</style>
