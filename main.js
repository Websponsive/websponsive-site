const observer = new IntersectionObserver((elements) => {
    elements.forEach((element) => {
        if(element.isIntersecting){
            element.target.classList.add('faded-out');
        } else {
            element.target.classList.remove('faded-out');
        }
    });
});

const hiddenToLeftElements = document.querySelectorAll('.faded-in-left');
const hiddenToRightElements = document.querySelectorAll('.faded-in-right');

hiddenToLeftElements.forEach((element) => {
    observer.observe(element);
});
hiddenToRightElements.forEach((element) => {
    observer.observe(element);
});


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