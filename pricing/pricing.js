//Navbar collapse functionality

const menuButton = document.querySelector('.nav-menu-button');
const navbarList = document.querySelector('.navbar-list'); 
menuButton.addEventListener('click', () => {
    navbarList.classList.toggle('hidden');
    navbarList.classList.toggle('visible');
    if(!navbar.classList.contains('nav-scrolled')){
        navbar.classList.toggle('nav-scrolled');
    }

    let isOpen = menuButton.getAttribute('aria-expanded');
    if(isOpen === 'false'){
        menuButton.setAttribute('aria-expanded', 'true');
    } else {
        menuButton.setAttribute('aria-expanded', 'false');
    }
});