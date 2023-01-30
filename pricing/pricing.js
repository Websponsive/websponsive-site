
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

/*************** Cart functionalities *******************/

const prices = {
    essential : 129,
    value : 249,
    premium : 499,
    none : 0,
}

addOnsState();

const planSelect = document.querySelector('.cart-plan-input');
const planTitle = document.querySelector('.cart-plan-title');
const planPrice = document.querySelector('.cart-plan-price');
const cartTotal = document.querySelector('.cart-total');
let total;


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
if (!storedPages){

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


//Plan-selecter buttons from the content
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

//Add-ons-selecter buttons from the content
const pagesButton = document.querySelector('.pages-button');
const reportButton = document.querySelector('.report-button');
const addOnsSection = document.querySelector('.cart-add-ons');
pagesButton.addEventListener('click', () => {
    let newElement = document.createElement('div');
    if(addOnsSection.dataset.pages === "yes"){
        const pageCount = document.querySelector('.pages-count');
        pageCount.value = Number(pageCount.value) + 1;
        window.localStorage.setItem('pages', `${pageCount.value}`);
    } else {
        newElement.innerHTML = 
        `<div class="cart-item add-on-element">
        <p class="cart-item-title paragraph dark">3 extra pages</p>
        <p class="paragraph dark">$<span class="cart-item-price">39</span>/mo</p>
        <input type="number" onclick="select()" class="cart-quantity-input pages-count" value="1">
        <button class="cart-remove-button light pages-remove small-text">Remove</button>
        </div>`;
        addOnsSection.append(newElement);
        addOnsSection.dataset.pages = 'yes';
    }
    quantityEvents();
    removeButtonsEvents();
    updateCartTotal();
    addOnsState();
});
reportButton.addEventListener('click', () => {
    if (addOnsSection.dataset.report === 'yes') {
        const reportCount = document.querySelector('.report-count');
        reportCount.value = Number(reportCount.value) + 1;
        window.localStorage.setItem('report', `${reportCount.value}`);
    } else {
        let newElement = document.createElement('div');
        newElement.innerHTML = 
        `<div class="cart-item add-on-element">
        <p class="cart-item-title paragraph dark">Monthly report</p>
        <p class="paragraph dark">$<span class="cart-item-price">29</span>/mo</p>
        <input type="number" onclick="select()" class="cart-quantity-input report-count" value="1">
        <button class="cart-remove-button report-remove light small-text">Remove</button>
        </div>`;
        addOnsSection.append(newElement);
        addOnsSection.dataset.report = 'yes';
        window.localStorage.setItem('report', '1');
    }
    quantityEvents();
    removeButtonsEvents();
    updateCartTotal();
    addOnsState();
}); 


//Add-ons display function
function addOnsState() {
    const addOnsSection = document.querySelector('.cart-add-ons');
    if(Number(window.localStorage.getItem('pages')) || Number(window.localStorage.getItem('report'))) {
        addOnsSection.style.display = 'block';
    } else {
        addOnsSection.style.display = 'none';
    }
}


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
function removeButtonsEvents() {
    try{
        const pagesRemove = document.querySelector('.pages-remove');
        pagesRemove.addEventListener('click', (event) => {
            event.target.parentNode.remove();
            addOnsSection.dataset.pages = 'no';
            window.localStorage.removeItem('pages');
            updateCartTotal();
            addOnsState();
        });
        const reportRemove = document.querySelector('.report-remove');
        reportRemove.addEventListener('click', (event) => {
            event.target.parentNode.remove();
            addOnsSection.dataset.report = 'no';
            window.localStorage.removeItem('report');
            updateCartTotal();
            addOnsState();
        });
    } catch {
        return;
    }
}

//Cart display functionality

cartButton.addEventListener('click', () => {
    cart.classList.toggle('cart-hidden');
    cart.classList.toggle('cart-visible');
    navbarList.classList.remove('nav-visible');
    navbarList.classList.add('nav-hidden');
    menuButton.setAttribute('aria-expanded', 'false');
    updateCartTotal();
    cartTotal.innerText = total;
});