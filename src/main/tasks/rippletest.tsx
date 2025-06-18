import React from "react";
import "./rippletest.css";

const createRipple = (event: React.MouseEvent<HTMLDivElement>) => {
  const target = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(target.clientWidth, target.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - target.getBoundingClientRect().left - radius}px`;
  circle.style.top = `${event.clientY - target.getBoundingClientRect().top - radius}px`;
  circle.classList.add("ripple");

  const existing = target.getElementsByClassName("ripple")[0];
  if (existing) existing.remove();

  target.appendChild(circle);
};

const RippleTest = () => {
  return (
    <div className="ripple-wrapper" onClick={createRipple}>
      Click me for ripple!
    </div>
  );
};

export default RippleTest;
