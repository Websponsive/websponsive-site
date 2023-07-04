const darkModeButton = document.querySelector('#dark-mode-button');

//Remember dark mode preference
if(window.localStorage.getItem('darkMode') === 'true'){
    document.body.classList.add('dark-mode');
    darkModeButton.setAttribute('aria-expanded', 'true')
}

// Dark mode functionality
darkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    let isOpen = darkModeButton.getAttribute('aria-expanded');
    if(isOpen === 'false'){
        darkModeButton.setAttribute('aria-expanded', 'true');
        window.localStorage.setItem('darkMode', 'true');
    } else if (isOpen === 'true'){
        darkModeButton.setAttribute('aria-expanded', 'false');
        window.localStorage.setItem('darkMode', 'false');
    }
}) ;

//Navbar collapse functionality
const menuButton = document.querySelector('#menu-button');
const navbarList = document.querySelector('.navbar-list'); 
const navbar = document.querySelector('.navbar');
menuButton.addEventListener('click', () => {
    navbar.classList.toggle('nav-hidden');
    navbar.classList.toggle('nav-visible');

    if(!navbar.classList.contains('nav-scrolled')){
        navbar.classList.toggle('nav-scrolled');
    }
    
    let isOpen = menuButton.getAttribute('aria-expanded');
    if(isOpen === 'false'){
        menuButton.setAttribute('aria-expanded', 'true');
    } else if (isOpen === 'true'){
        menuButton.setAttribute('aria-expanded', 'false');
    }
});