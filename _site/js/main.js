const navOptions = {
    rootMargin: "-500px 0px 0px 0px"
}
const contentOptions = {
    rootMargin: "-100px 0px -100px 0px"
}
const cardOptions = {
    rootMargin: "-300px 0px -300px 0px"
}




//Navbar fade-in animations

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

//Intro blob effect
// const blob = document.querySelector('.blob');

// introSection.onpointermove = event => {
//     const {clientX, pageY} = event;
//     blob.animate({
//         left: `${clientX}px`,
//         top: `${pageY}px`
//     }, {duration: 3000, fill: 'forwards'});
// }
//Snowfall effect
// const snowStart = document.querySelector('.snow-start');
// let snowMax = 50, currentFlakes = 0;
// const colors = 
// ["rgba(220,220,220,0.2)", 
// "rgba(220,220,220,0.3)", 
// "rgba(220,220,220,0.4)", 
// "rgba(220,220,220,0.5)", 
// "rgba(220,220,220,0.6)"];

// function newSnowFlake(){

// }
// do{
    
//     setTimeout(() => {
//         currentFlakes++;
//         console.log(currentFlakes);
//     }, 5000);
// }while(currentFlakes < snowMax);



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
const hiddenToDownElements = document.querySelectorAll('.faded-in-down');

hiddenToLeftElements.forEach((element) => {
    contentObserver.observe(element);
});
hiddenToRightElements.forEach((element) => {
    contentObserver.observe(element);
});
hiddenToDownElements.forEach((element) => {
    contentObserver.observe(element);
});


//Fade-in animations for lines
const strokes = document.querySelectorAll('.process-line')
const lineObserver = new IntersectionObserver((elements) => {
    elements.forEach((element) => {
        if(element.isIntersecting){
            element.target.classList.add('extended');
        }
    });
}, cardOptions)

strokes.forEach((e) => {
    lineObserver.observe(e);
})

// Card fade animations

const cards = document.querySelectorAll('.process-step');
const cardObserver = new IntersectionObserver((elements) => {
    elements.forEach((element) => {
        if(element.isIntersecting){
            element.target.classList.remove('faded-inwards');
        }
    });
}, cardOptions)

cards.forEach((card) => {
    cardObserver.observe(card);
})

//Card background glow effect

for(const benefit of document.querySelectorAll(".card")) {
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