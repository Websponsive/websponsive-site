const navOptions = {
    rootMargin: "-300px 0px 0px 0px"
}
const contentOptions = {
    rootMargin: "-150px 0px -150px 0px"
}
const cartButton = document.querySelector('#cart-button');
const cart = document.querySelector('.cart');

//Navbar collapse functionality
const menuButton = document.querySelector('#menu-button');
const navbarList = document.querySelector('.navbar-list'); 
menuButton.addEventListener('click', () => {
    navbarList.classList.toggle('nav-hidden');
    navbarList.classList.toggle('nav-visible');
    cart.classList.remove('cart-visible');
    cart.classList.add('cart-hidden');
    
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

//Cart display functionality

cartButton.addEventListener('click', () => {
    cart.classList.toggle('cart-hidden');
    cart.classList.toggle('cart-visible');
    navbarList.classList.remove('nav-visible');
    navbarList.classList.add('nav-hidden');
    menuButton.setAttribute('aria-expanded', 'false');
});


//Navbar fade-in animations

const navbar = document.querySelector('.navbar');
const introSection = document.querySelector('.intro');

const navObserver = new IntersectionObserver((elements) => {
    elements.forEach((element) => {
        if(!element.isIntersecting){
            navbar.classList.add('nav-scrolled');
            navbar.style.animationDelay = "0s";
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });
}, navOptions);

navObserver.observe(introSection);




//Fade-in animations for content

const contentObserver = new IntersectionObserver((elements) => {
    elements.forEach((element) => {
        if(element.isIntersecting){
            element.target.classList.add('faded-out');
        } else {
            element.target.classList.remove('faded-out');
        }
    });
}, contentOptions);

const hiddenToLeftElements = document.querySelectorAll('.faded-in-left');
const hiddenToRightElements = document.querySelectorAll('.faded-in-right');

hiddenToLeftElements.forEach((element) => {
    contentObserver.observe(element);
});
hiddenToRightElements.forEach((element) => {
    contentObserver.observe(element);
});


//Card background glow effect

for(const benefit of document.querySelectorAll(".benefit")) {
    benefit.onmousemove = w => handleMouseMovement(w);
}
function handleMouseMovement (w) {
    const {currentTarget: target} = w;
    
    const rect = target.getBoundingClientRect(),
    x = w.clientX - rect.left,
    y = w.clientY - rect.top;
    
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
}

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
    const addOnsSection = document.querySelector('.cart-add-ons');
    if(addOnsSection.dataset.pages === 'no' && addOnsSection.dataset.report === 'no') {
        addOnsSection.style.display = 'none';
    } else {
        addOnsSection.style.display = 'block';
    }
}


//Cart total update function
function updateCartTotal(){
    let total = 0;
    let planElementPrice;

    planElementPrice = document.querySelector('.cart-plan-price').innerText;
    planElementPrice = 0;
    
    total += Number(planElementPrice);


    const addOns = document.querySelectorAll('.add-on-element');
    addOns.forEach((item) => {
        const addOnPrice = Number(item.querySelector('.cart-item-price').innerText);
        const addOnQuantity = Number(item.querySelector('.cart-quantity-input').value);
        total += addOnPrice * addOnQuantity;
    });

    cartTotal.innerText = total;
}

//Remove buttons functionality
function removeButtonsEvents() {
    const removeButtons = document.querySelectorAll('.cart-remove-button');
    removeButtons.forEach( (button) => {
        button.addEventListener('click', (event) => {
            event.target.parentNode.remove();
            updateCartTotal();
            addOnsState();
        });
    });
}

