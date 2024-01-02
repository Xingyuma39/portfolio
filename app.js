function toggleTheme() {
    document.body.classList.toggle('dark');
}

const darkBtn = document.querySelector('.darkBtn');
const bodyEl = document.querySelector('body');

const darkMode = () => {
    bodyEl.classList.toggle('dark');
}

darkBtn.addEventListener('click', () => {
    setDarkMode = localStorage.getItem('dark');
    if(setDarkMode !== "on") {
        darkMode();
        setDarkMode = localStorage.setItem('dark', 'on');
    } else {
        darkMode();
        setDarkMode = localStorage.setItem('dark', null);
    }
});

let setDarkMode = localStorage.getItem('dark');

if(setDarkMode === 'on') {
    darkMode();
}