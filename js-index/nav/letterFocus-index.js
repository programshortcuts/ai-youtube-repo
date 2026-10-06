// letter-focus.js
let lastLetterPressed = null;
const backlink = document.querySelector('#backlink');
const homelink = document.querySelector('#homelink');

export function letterFocus({ e, focusZone }) {
    if (!e || !e.key) return;
    // Ignore typing fields and modifier keys
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const key = e.key.toLowerCase();
    if (key.length !== 1 || !/^[a-z0-9]$/.test(key)) return;
    // Find visible, valid elements
    const allEls = [...document.querySelectorAll('a, [id],[data-nav-target')].filter(el => {
        const rect = el.getBoundingClientRect();
        return el.offsetParent !== null && rect.width > 0 && rect.height > 0;
    });
    // Filter elements by ID starting with pressed key
    const matching = allEls.filter(el => {
        if(!el.hasAttribute('data-nav-target')){
            const id = el.id?.toLowerCase?.() || '';
            console.log('el')
            if(id == 'homelink' && !backlink){
                console.log(id)
                return homelink
            }
            return (
                id.startsWith(key) 
                // id !== 'targetdiv' &&
                // id !== 'targetheaderh3'
            );
            
        }  else {

            const dnt = el.getAttribute('data-nav-target')
            return dnt.startsWith(key)
        }
    });
    // SPECIAL CASES for mainTargetDiv and sideBar in side-bar-nav.js and main-content-nav.js
    if (matching.length === 0) return;
    const activeEl = document.activeElement;
    const activeIndex = matching.indexOf(activeEl);
    let newIndex;
    if (key !== lastLetterPressed) {
        newIndex = e.shiftKey ? matching.length - 1 : 0;
    } else {
        if (activeIndex === -1) {
            newIndex = e.shiftKey ? matching.length - 1 : 0;
        } else {
            newIndex = e.shiftKey
                ? (activeIndex - 1 + matching.length) % matching.length
                : (activeIndex + 1) % matching.length;
        }
    }
    const target = matching[newIndex];
    if (!target) return;
    // Ensure focusability
    if (typeof target.focus !== 'function') {target.setAttribute('tabindex', '-1');
    }
    target.focus()
    target.scrollIntoView({behavior:"smooth",inline:"center"});
    console.log('target', target)
    lastLetterPressed = key;
}
