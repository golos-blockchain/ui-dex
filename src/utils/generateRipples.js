export const generateRipples = (func) => (e) => {
    const target = e.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(target.clientWidth, target.clientHeight);
    const radius = diameter / 2;

    let xPos, yPos;

    const {width, height, left, top} = target.getBoundingClientRect();

    if(!e.clientX && !e.clientY){
        xPos = width / 2 - radius;
        yPos = height / 2 - radius;
    } else {
        xPos = e.clientX - left - radius;
        yPos = e.clientY - top - radius;
    }

    circle.style.width = circle.style.height = `${diameter}px`;

    circle.style.left = `${xPos}px`;
    circle.style.top = `${yPos}px`;
    circle.classList.add("ripple");
    const ripple = target.getElementsByClassName("ripple")[0];

    if (ripple) {
        ripple.remove();
    }

    target.appendChild(circle);

    if(func){ setTimeout(func, 125) }
}