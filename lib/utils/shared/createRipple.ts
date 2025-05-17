export function createRipple(
  event: React.MouseEvent<HTMLElement>,
  target: HTMLElement
) {
  const circle = document.createElement("span");
  const diameter = Math.max(target.clientWidth, target.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${
    event.clientX - target.getBoundingClientRect().left - radius
  }px`;
  circle.style.top = `${
    event.clientY - target.getBoundingClientRect().top - radius
  }px`;
  circle.classList.add("ripple");

  const ripple = target.getElementsByClassName("ripple")[0];
  if (ripple) {
    ripple.remove();
  }

  target.appendChild(circle);
}
