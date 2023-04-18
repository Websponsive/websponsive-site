history.pushState({page_id: 1}, "");

//Remember dark mode preference
if(window.localStorage.getItem('darkMode') === 'true'){
    document.body.classList.add('dark-mode');
}

const prices = {
    essential : 129,
    value : 249,
    premium : 499,
    none : 0,
}

const container = document.querySelector('.order-items');

// Update plan from localstorage
let selectedPlan = window.localStorage.getItem('plan');
const planTitle = document.querySelector('.plan-name');
const planPrice = document.querySelector('.plan-price');
const planInput = document.querySelector('.plan-input');
if (!(selectedPlan === null)) {
    if (selectedPlan === 'essential'){
        planTitle.innerText = 'Essential';
        planPrice.innerText = prices.essential;
        planInput.value = 'essential';
    } else if (selectedPlan === 'value') {
        planTitle.innerText = 'Value';
        planPrice.innerText = prices.value;
        planInput.value = 'value'
    } else if (selectedPlan === 'premium') {
        planTitle.innerText = 'Premium';
        planPrice.innerText = prices.premium;
        planInput.value = 'premium'
    } else if (selectedPlan === 'none') {
        planTitle.innerText = 'No plan selected';
        planPrice.innerText = prices.none;
        planInput.value = 'none'
    }
}

// Update add-ons from localstorage
let storedPages = Number(window.localStorage.getItem('pages'));
if (!(storedPages === null || storedPages === 0)){
    let newElement = document.createElement('div');
    newElement.innerHTML = 
        `<div class="order-item">
        <h3 class="order-item-title paragraph dark">3 extra pages</h3>
        <p class="paragraph dark">$<span class="price">39</span>/mo</p>
        <input type="number" onclick="select()" class="order-quantity-input pages-count" value="${Number(storedPages)}">
        <button class="order-remove-button light pages-remove small-text">Remove</button>
        </div>`;
    container.append(newElement);
    updateTotal();
}
let storedReports = Number(window.localStorage.getItem('report'));
if(!(storedReports === null || storedReports === 0)){
    let newElement = document.createElement('div');
    newElement.innerHTML = 
        `<div class="order-item">
        <h3 class="order-item-title paragraph dark">Monthly report</h3>
        <p class="paragraph dark">$<span class="price">29</span>/mo</p>
        <input type="number" onclick="select()" class="order-quantity-input report-count" value="${Number(storedReports)}">
        <button class="order-remove-button report-remove light small-text">Remove</button>
        </div>`;
    container.append(newElement);
    updateTotal();
}

function render(element) {
    container.appendChild(element)    
}

function updateTotal(){
    return;
}

// Transition between pages
const cFrames_forwards = [
    {transform: "translateX(0)"},
    {transform: "translateX(-120vw)"}
]
const cFrames_backwards = [
    {transform: "translateX(-120vw)"},
    {transform: "translateX(0)"}
]
const cTiming = {
    duration: 350, 
    iterations: 1,
    fill: "forwards",
    easing: "ease"
}
const iFrames_forwards = [
    {transform: "translateX(120vw)"},
    {transform: "translateX(0)"}
]
const iFrames_backwards = [
    {transform: "translateX(0)"},
    {transform: "translateX(120vw)"}
]
const iTiming = {
    duration: 350, 
    iterations: 1,
    fill: "forwards",
    // delay: 200,
    easing: "ease"
}
const confirm = document.querySelector('.confirm');
const info = document.querySelector('.info');

const proceedButton = document.querySelector('.proceed');
proceedButton.addEventListener('click', () => {
    confirm.animate(
        cFrames_forwards, cTiming
    );
    info.animate(
        iFrames_forwards, iTiming
    );
    history.pushState({page_id: 1}, "");
});
const returnButton = document.querySelector('.return');
returnButton.addEventListener('click', () => {
    confirm.animate(
        cFrames_backwards, iTiming
    );
    info.animate(
        iFrames_backwards, cTiming
    );
})

window.onpopstate = () => {
    confirm.animate(
        cFrames_backwards, iTiming
    );
    info.animate(
        iFrames_backwards, cTiming
    );
}