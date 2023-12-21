// const darkBtn = document.querySelector('.darkBtn');
// const body1 = document.querySelector('body');

function toggleTheme() {
    // var element = document.body;
    // element.classList.toggle("dark-mode");
    document.body.classList.toggle('dark');
}

// const darkMode = () => {
//     bodyl.classList.toggle("dark-mode");
// }

// darkBtn.addEventListener('click', () => {
//     // Get the value of the "dark" item from the local storage on every click
//     setDarkMode = localStorage.getItem('dark-mode');

//     if(setDarkMode !== "on") {
//         darkMode();
//         // Set the value of the itwm to "on" when dark mode is on
//         setDarkMode = localStorage.setItem('dark-mode', 'on');
//     } else {
//         darkMode();
//         // Set the value of the item to  "null" when dark mode if off
//         setDarkMode = localStorage.setItem('dark-mode', null);
//     }
// });

// // Get the value of the "dark" item from the local storage
// let setDarkMode = localStorage.getItem('dark-mode');

// // Check dark mode is on or off on page reload
// if(setDarkMode === 'on') {
//     darkMode();
// }

const darkBtn = document.querySelector('.darkBtn');
const bodyEl = document.querySelector('body');

const darkMode = () => {
    bodyEl.classList.toggle('dark');
}

darkBtn.addEventListener('click', () => {
    // Get the value of the "dark" item from the local storage on every click
    setDarkMode = localStorage.getItem('dark');

    if(setDarkMode !== "on") {
        darkMode();
        // Set the value of the itwm to "on" when dark mode is on
        setDarkMode = localStorage.setItem('dark', 'on');
    } else {
        darkMode();
        // Set the value of the item to  "null" when dark mode if off
        setDarkMode = localStorage.setItem('dark', null);
    }
});

// Get the value of the "dark" item from the local storage
let setDarkMode = localStorage.getItem('dark');

// Check dark mode is on or off on page reload
if(setDarkMode === 'on') {
    darkMode();
    // toggleTheme();
}