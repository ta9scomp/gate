import React, { useState, useEffect } from 'react';
import './hamburgerbutton.css';

type HamburgerButtonProps = {
  onClick: () => void;
};

export default function HamburgerButton({ onClick }: HamburgerButtonProps) {
  const [hover, setHover] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [transitionDuration, setTransitionDuration] = useState('0.4s');
  const [clicked, setClicked] = useState(false); // クリックアニメ用

  // ホバー時の透明度処理
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (hover) {
      setTransitionDuration('0.1s');
      setOpacity(0.5);
      timer = setTimeout(() => {
        setTransitionDuration('0.3s');
        setOpacity(0.65);
      }, 200);
    } else {
      setTransitionDuration('0.45s');
      setOpacity(1);
    }

    return () => clearTimeout(timer);
  }, [hover]);

  // クリック時：アニメーション発火 & 外部処理実行
  const handleClick = () => {
    setClicked(true);
    onClick();

    // hover中にクリック → 再発火させる
    if (hover) {
      setHover(false);
      setTimeout(() => {
        setHover(true);
      }, 0);
    }

    setTimeout(() => {
      setClicked(false);
    }, 800);
  };

  return (
    <div
      className={`hamburger-button ${clicked ? 'clicked' : ''}`} // クラス付与
      onClick={handleClick}
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
