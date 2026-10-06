import { letterFocus } from "./letterFocus-txt-nums.js";
let lastLetterPressed = null;
const backlink = document.querySelector('#backlink');
const homelink = document.querySelector('#homelink');
function setupGlobalKeyListener() {

    addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
    })
}
setupGlobalKeyListener();