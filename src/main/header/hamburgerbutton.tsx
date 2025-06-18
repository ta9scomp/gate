// src/main/header/hamburgerbutton.tsx
import React, { useState, useEffect } from 'react';
import './hamburgerbutton.css';

type HamburgerButtonProps = {
  onClick: () => void;
};

export default function HamburgerButton({ onClick }: HamburgerButtonProps) {
  const [hover, setHover] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [transitionDuration, setTransitionDuration] = useState('0.4s');

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (hover) {
      setTransitionDuration('0.1s');
      setOpacity(0.4);
      timer = setTimeout(() => {
        setTransitionDuration('0.4s');
        setOpacity(0.56);
      }, 200);
    } else {
      setTransitionDuration('0.45s');
      setOpacity(1);
    }

    return () => clearTimeout(timer);
  }, [hover]);

  return (
    <div
      className="hamburger-button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: 'pointer',
        width: '33px',
        height: '25px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '5px',
      }}
    >
      {[...Array(3)].map((_, i) => (
        <span
          key={i}
          className="bar"
          style={{
            backgroundColor: 'black',
            height: '3px',
            width: '100%',
            opacity: opacity,
            transition: `opacity ${transitionDuration} ease-in-out`,
            transformOrigin: 'right',
          }}
        />
      ))}
    </div>
  );
}
