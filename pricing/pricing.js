
const menuButton = document.querySelector('#menu-button');
const navbarList = document.querySelector('.navbar-list'); 
const cartButton = document.querySelector('#cart-button');
const cart = document.querySelector('.cart');

//Navbar collapse functionality

menuButton.addEventListener('click', () => {
    navbarList.classList.toggle('nav-hidden');
    navbarList.classList.toggle('nav-visible');
    cart.classList.remove('cart-visible');
    cart.classList.add('cart-hidden');

    let isOpen = menuButton.getAttribute('aria-expanded');
    if(isOpen === 'false'){
        menuButton.setAttribute('aria-expanded', 'true');
    } else {
        menuButton.setAttribute('aria-expanded', 'false');
    }
});

//Cart display functionality

cartButton.addEventListener('click', () => {
    cart.classList.toggle('cart-hidden');
    cart.classList.toggle('cart-visible');
    navbarList.classList.remove('nav-visible');
    navbarList.classList.add('nav-hidden');
});

//Cart functionalities

const prices = {
    essential : 129,
    value : 249,
    premium : 499,
}

const removeButtons = document.querySelectorAll('.cart-remove-button');
removeButtons.forEach( (button) => {
    button.addEventListener('click', (event) => {
        event.target.parentNode.remove();
    });
});

const planSelect = document.querySelector('.cart-plan-input');
const planTitle = document.querySelector('.cart-plan-title');
const planPrice = document.querySelector('.cart-plan-price');
planSelect.addEventListener('input', () => {
    if (planSelect.value === 'essential'){
        planTitle.innerText = 'Essential';
        planPrice.innerText = `$${prices.essential}/mo`;
    } else if (planSelect.value === 'value') {
        planTitle.innerText = 'Value';
        planPrice.innerText = `$${prices.value}/mo`;
    } else if (planSelect.value === 'premium') {
        planTitle.innerText = 'Premium';
        planPrice.innerText = `$${prices.premium}/mo`;
    }

    updateCartTotal();
});

const cartQuantity = document.querySelector('.cart-quantity-input');
cartQuantity.addEventListener('input', () => {
    if (isNaN(cartQuantity.value) || cartQuantity.value <= 0){
        cartQuantity.value = 1;
    } else if (cartQuantity.value >= 100) {
        cartQuantity.value = 99;
    }
    updateCartTotal();
});