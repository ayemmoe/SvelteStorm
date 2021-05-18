<script>
    export let fileTree;
    const fs = require('fs');
    const ipcMain = require('electron').ipcMain;
    const ipcRenderer = require('electron').ipcRenderer;
    const fileState = {};
    
    const toggleVisibility = (path) => {
        if(!fileState[path]) fileState[path]= true;
        else fileState[path] = false;
        console.log('fileState',fileState);
    }
    console.log(fileTree)

    const handleDblClick = (path) => {
        console.log('clcking now',path);
        const content = fs.readFileSync(path).toString();
        console.log('read file',content)
        // console.log(ipcMain);
        console.log(ipcRenderer);
        ipcRenderer.send('dbkfile-opened',function (evt, file, content) {
            console.log('content fileTest',content)
        })
    }

</script>

<div class=directory>
{#if fileTree}
{#each fileTree as {path,name, items}}
<ul>
    <!-- <li>{name}</li> -->
    {#if items.length > 0}
    <li on:click={toggleVisibility(path)} class={!fileState[path] ? "liFolderClosed" : "liFolderOpen"}>{name}</li>
    {:else}
    <li on:click={handleDblClick(path)} class="liFiles">{name}</li>
    {/if}
    {#if fileState[path] && items.length > 0}
      
      <svelte:self fileTree={items.sort((a,b) => {
        return b.items.length - a.items.length
    })} />
    {/if}
</ul>
{/each}
{/if}
</div>

<style>
    .liFolderClosed {
        cursor: pointer;
        padding: 0px 0 5px 25px;
        list-style: none;
        background-image: url("/home/svrchi/Desktop/Svelte Project/SvelteStorm/public/img/folderClosed.svg");
        background-repeat: no-repeat;
        background-position: left;
        background-size: 20px;
        /* border: 1px solid black; */
    }
    .liFolderOpen {
        cursor: pointer;
        display: flex;
        justify-content: flex-start;
        padding: 10px 0 5px 25px;
        list-style: none;
        background-image: url('/home/svrchi/Desktop/Svelte Project/SvelteStorm/public/img/folderOpen.svg');
        background-repeat: no-repeat;
        background-position: left;
        background-size: 20px;
        /* border: 1px solid black; */
    }


    .liFiles {
        cursor: pointer;
        padding-left: 25px;
        margin-left: 20px;
        margin-top: 3px;
        list-style: none;
        background-image: url('./home/svrchi/Desktop/Svelte Project/SvelteStorm/public/img/document.png');
        background-repeat: no-repeat;
        background-position: left;
        background-size: 20px;
        /* border: 1px solid blue; */
    }
    
    .directory{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        /* border:1px solid black; */
    }
</style>
