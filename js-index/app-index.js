import { letterFocus } from "./letterFocus-txt-nums.js";
import { initDropDowns, hideTopicSnips } from "./ui/drop-downs-index.js";
let lastLetterPressed = null;
const backlink = document.querySelector('#backlink');
const homelink = document.querySelector('#homelink');

function initMain(){
    setupGlobalKeyListener();
    initDropDowns()
}

function setupGlobalKeyListener() {

    addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        letterFocus({e})
    })
}
initMain()
