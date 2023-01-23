
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
    none : 0,
}


const planSelect = document.querySelector('.cart-plan-input');
const planTitle = document.querySelector('.cart-plan-title');
const planPrice = document.querySelector('.cart-plan-price');
planSelect.addEventListener('input', () => {
    if (planSelect.value === 'essential'){
        planTitle.innerText = 'Essential';
        planPrice.innerText = prices.essential;
    } else if (planSelect.value === 'value') {
        planTitle.innerText = 'Value';
        planPrice.innerText = prices.value;
    } else if (planSelect.value === 'premium') {
        planTitle.innerText = 'Premium';
        planPrice.innerText = prices.premium;
    } else if (planSelect.value === 'none') {
        planTitle.innerText = 'No plan selected';
        planPrice.innerText = prices.none;
    }
    
    updateCartTotal();
});

const cartQuantity = document.querySelector('.cart-quantity-input');
cartQuantity.addEventListener('input', () => {
    if (isNaN(cartQuantity.value) || cartQuantity.value <= 0){
        cartQuantity.value = 1;
    } else if (cartQuantity.value >= 1000) {
        cartQuantity.value = 999;
    }
    updateCartTotal();
});

const essentialButton = document.querySelector('.essential-button');
const valueButton = document.querySelector('.value-button');
const premiumButton = document.querySelector('.premium-button');

essentialButton.addEventListener('click', () => {
    planTitle.innerText = 'Essential';
    planPrice.innerText = prices.essential;
    planSelect.value = 'essential';
    updateCartTotal();
});
valueButton.addEventListener('click', () => {
    planTitle.innerText = 'Value';
    planPrice.innerText = prices.value;
    planSelect.value = 'value';
    updateCartTotal();
});
premiumButton.addEventListener('click', () => {
    planTitle.innerText = 'Premium';
    planPrice.innerText = prices.premium;
    planSelect.value = 'premium';
    updateCartTotal();
});

function updateCartTotal(){
    let total = 0;
    const cartTotal = document.querySelector('.cart-total');
    let planElementPrice;

    try {
        planElementPrice = document.querySelector('.cart-plan-price').innerText;
    }
    catch {
        planElementPrice = 0;
    }
    
    total += Number(planElementPrice);


    const addOns = document.querySelectorAll('.add-on-element');
    addOns.forEach((item) => {
        const addOnPrice = Number(item.querySelector('.cart-item-price').innerText);
        const addOnQuantity = Number(item.querySelector('.cart-quantity-input').value);
        total += addOnPrice * addOnQuantity;
    });

    
    
    cartTotal.innerText = total;
}


const removeButtons = document.querySelectorAll('.cart-remove-button');
removeButtons.forEach( (button) => {
    button.addEventListener('click', (event) => {
        event.target.parentNode.remove();
        updateCartTotal();
    });
});
