function handleMouseMovement (e) {
    const {currentTarget: target} = e;

    const rect = target.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
}

for(const benefit of document.querySelectorAll(".benefit")) {
    benefit.onmousemove = e => handleMouseMovement(e);
}