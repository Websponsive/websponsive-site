const navOptions = {
    rootMargin: "-300px 0px 0px 0px"
}
const contentOptions = {
    rootMargin: "-150px 0px -150px 0px"
}

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