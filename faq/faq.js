//Navbar collapse functionality
const cartButton = document.querySelector('#cart-button');
const cart = document.querySelector('.cart');
const menuButton = document.querySelector('#menu-button');
const navbarList = document.querySelector('.navbar-list'); 
const navbar = document.querySelector('.navbar');
menuButton.addEventListener('click', () => {
   navbar.classList.toggle('nav-hidden');
   navbar.classList.toggle('nav-visible');
   cart.classList.remove('cart-visible');
   cart.classList.add('cart-hidden');
   cartButton.setAttribute('aria-expanded', 'false');
   let isOpen = menuButton.getAttribute('aria-expanded');
   if(isOpen === 'false'){
       menuButton.setAttribute('aria-expanded', 'true');
       // navbar.style.maxHeight = '320px';
   } else if (isOpen === 'true'){
       menuButton.setAttribute('aria-expanded', 'false');
       // navbar.style.maxHeight = '80px';
   }
});
 
//Remember dark mode preference
const darkModeButton = document.querySelector('#dark-mode-button');
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

/*************** Cart functionalities *******************/

const prices = {
    essential : 129,
    value : 249,
    premium : 499,
    none : 0,
}

const planSelect = document.querySelector('.cart-plan-input');
const planTitle = document.querySelector('.cart-plan-title');
const planPrice = document.querySelector('.cart-plan-price');
const cartTotal = document.querySelector('.cart-total');
const addOnsSection = document.querySelector('.cart-add-ons');

addOnsState();

//Update plan value from the localstorage
let selectedPlan = window.localStorage.getItem('plan');
if (!(selectedPlan === null)) {
    cartTotal.innerText = window.localStorage.getItem('total');
    if (selectedPlan === 'essential'){
        planTitle.innerText = 'Essential';
        planPrice.innerText = prices.essential;
        planSelect.value = 'essential';
    } else if (selectedPlan === 'value') {
        planTitle.innerText = 'Value';
        planPrice.innerText = prices.value;
        planSelect.value = 'value';
    } else if (selectedPlan === 'premium') {
        planTitle.innerText = 'Premium';
        planPrice.innerText = prices.premium;
        planSelect.value = 'premium';
    } else if (selectedPlan === 'none') {
        planTitle.innerText = 'No plan selected';
        planPrice.innerText = prices.none;
        planSelect.value = 'none';
    }
}


//Update add-ons from localstorage
let storedPages = Number(window.localStorage.getItem('pages'));
if (!(storedPages === null || storedPages === 0)){
    let newElement = document.createElement('div');
    newElement.innerHTML = 
        `<div class="cart-item add-on-element">
        <p class="cart-item-title paragraph dark">3 extra pages</p>
        <p class="paragraph dark">$<span class="cart-item-price">39</span>/mo</p>
        <input type="number" onclick="select()" class="cart-quantity-input pages-count" value="${Number(storedPages)}">
        <button class="cart-remove-button light pages-remove small-text">Remove</button>
        </div>`;
    addOnsSection.append(newElement);
    addOnsSection.dataset.pages = 'yes';
    quantityEvents();
    removeButtonPages();
    updateCartTotal();
    addOnsState();
}
let storedReports = Number(window.localStorage.getItem('report'));
if(!(storedReports === null || storedReports === 0)){
    let newElement = document.createElement('div');
    newElement.innerHTML = 
        `<div class="cart-item add-on-element">
        <p class="cart-item-title paragraph dark">Monthly report</p>
        <p class="paragraph dark">$<span class="cart-item-price">29</span>/mo</p>
        <input type="number" onclick="select()" class="cart-quantity-input report-count" value="${Number(storedReports)}">
        <button class="cart-remove-button report-remove light small-text">Remove</button>
        </div>`;
    addOnsSection.append(newElement);
    addOnsSection.dataset.pages = 'yes';
    quantityEvents();
    removeButtonReport();
    updateCartTotal();
    addOnsState();
}


//Plan selector from cart itself
planSelect.addEventListener('input', () => {
    if (planSelect.value === 'essential'){
        planTitle.innerText = 'Essential';
        planPrice.innerText = prices.essential;
        window.localStorage.setItem('plan', 'essential');
    } else if (planSelect.value === 'value') {
        planTitle.innerText = 'Value';
        planPrice.innerText = prices.value;
        window.localStorage.setItem('plan', 'value');
    } else if (planSelect.value === 'premium') {
        planTitle.innerText = 'Premium';
        planPrice.innerText = prices.premium;
        window.localStorage.setItem('plan', 'premium');
    } else if (planSelect.value === 'none') {
        planTitle.innerText = 'No plan selected';
        planPrice.innerText = prices.none;
        window.localStorage.setItem('plan', 'none');
    }
    
    updateCartTotal();
});
//Add-ons quantity checker
function quantityEvents() {
    const cartQuantities = document.querySelectorAll('.cart-quantity-input');
    cartQuantities.forEach((item) => {
        item.addEventListener('input', () => {
            if (isNaN(item.value) || item.value < 0){
                item.value = 0;
            } else if (item.value >= 1000) {
                item.value = 999;
            }
            updateCartTotal();
        });
    });
}


//Add-ons display function
function addOnsState() {
    if(addOnsSection.dataset.pages === 'no' && addOnsSection.dataset.report === 'no') {
        addOnsSection.style.display = 'none';
    } else {
        addOnsSection.style.display = 'block';
    }
}

//Checkout functionality
const checkoutButton = document.querySelector('.cart-checkout-button');
checkoutButton.addEventListener('click', () => {
    window.localStorage.clear();
    planSelect.value = 'none';
    planTitle.innerText = 'No plan selected';
    planPrice.innerText = prices.none;
    try {
        const addOnElements = document.querySelectorAll('.add-on-element');
        addOnElements.forEach((element) => {
            element.remove();
        });
        addOnsSection.dataset.pages = 'no';
        addOnsSection.dataset.report = 'no';
    } catch (error) {
        return;
    }
    updateCartTotal();
    addOnsState();
    window.alert('Thanks for checking out');
});


//Cart total update function
function updateCartTotal(){
    let planElementPrice;
    total = 0;
    planElementPrice = document.querySelector('.cart-plan-price').innerText;
    total += Number(planElementPrice);
    
    
    const addOns = document.querySelectorAll('.add-on-element');
    addOns.forEach((item) => {
        const addOnPrice = Number(item.querySelector('.cart-item-price').innerText);
        const addOnQuantity = Number(item.querySelector('.cart-quantity-input').value);
        total += addOnPrice * addOnQuantity;
    });
    
    cartTotal.innerText = total;
    window.localStorage.setItem('total', `${total}`);
}

//Remove buttons functionality
function removeButtonPages() {
    try{
        const pagesRemove = document.querySelector('.pages-remove');
        pagesRemove.addEventListener('click', (event) => {
            event.target.parentNode.remove();
            addOnsSection.dataset.pages = 'no';
            window.localStorage.removeItem('pages');
            updateCartTotal();
            addOnsState();
        });
    } catch (e) {
        console.log(e);
        return;
    }
}
function removeButtonReport() {
    try {
        const reportRemove = document.querySelector('.report-remove');
        reportRemove.addEventListener('click', (event) => {
            event.target.parentNode.remove();
            addOnsSection.dataset.report = 'no';
            window.localStorage.removeItem('report');
            updateCartTotal();
            addOnsState();
        });
    } catch (e) {
        console.log(e);
        return;
    }
}

//Cart display functionality

cartButton.addEventListener('click', () => {
    cart.classList.toggle('cart-hidden');
    cart.classList.toggle('cart-visible');
    navbar.classList.remove('nav-visible');
    navbar.classList.add('nav-hidden');
    updateCartTotal();
    menuButton.setAttribute('aria-expanded', 'false');

    let isOpen = cartButton.getAttribute('aria-expanded');
    if(isOpen === 'false'){
       cartButton.setAttribute('aria-expanded', 'true');
    } else if (isOpen === 'true'){
       cartButton.setAttribute('aria-expanded', 'false');
    }
});