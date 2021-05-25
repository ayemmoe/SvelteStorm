import {writable} from 'svelte/store';

const DirectoryData = writable({
    fileTree: [],
    openFilePath :'',
    fileRead: false,
    activeFile: '',
    rename: false,
    deleteFile: false,
    fileChange: false,
});


export default DirectoryData; 