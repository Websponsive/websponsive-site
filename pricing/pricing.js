//Navbar collapse functionality

const menuButton = document.querySelector('#menu-button');
const navbarList = document.querySelector('.navbar-list'); 
menuButton.addEventListener('click', () => {
    navbarList.classList.toggle('hidden');
    navbarList.classList.toggle('visible');
    console.log('gigel')
    let isOpen = menuButton.getAttribute('aria-expanded');
    if(isOpen === 'false'){
        menuButton.setAttribute('aria-expanded', 'true');
    } else {
        menuButton.setAttribute('aria-expanded', 'false');
    }
});