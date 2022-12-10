function handleMouseMovement (w) {
    const {currentTarget: target} = w;

    const rect = target.getBoundingClientRect(),
          x = w.clientX - rect.left,
          y = w.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
}

for(const benefit of document.querySelectorAll(".benefit")) {
    benefit.onmousemove = w => handleMouseMovement(w);
}