"use client";

import { useEffect } from "react";

const HEARTS = [
  { symbol: "❤", left: "10vw", size: "16px", duration: "7s", delay: "0s", opacity: 0.5 },
  { symbol: "💖", left: "25vw", size: "22px", duration: "9s", delay: "2s", opacity: 0.7 },
  { symbol: "♥", left: "40vw", size: "14px", duration: "6s", delay: "1s", opacity: 0.4 },
  { symbol: "💕", left: "55vw", size: "20px", duration: "8s", delay: "3s", opacity: 0.6 },
  { symbol: "💗", left: "70vw", size: "18px", duration: "7.5s", delay: "1.5s", opacity: 0.5 },
  { symbol: "❤", left: "85vw", size: "24px", duration: "8.5s", delay: "0.5s", opacity: 0.7 },
  { symbol: "💖", left: "15vw", size: "15px", duration: "10s", delay: "4s", opacity: 0.5 },
  { symbol: "♥", left: "80vw", size: "19px", duration: "6.5s", delay: "3.5s", opacity: 0.6 },
  { symbol: "💕", left: "92vw", size: "13px", duration: "7s", delay: "5s", opacity: 0.4 },
  { symbol: "💗", left: "5vw", size: "21px", duration: "9.5s", delay: "2.5s", opacity: 0.6 },
];

const CLICK_EMOJIS = ["💖", "💕", "💗", "💓", "❤️"];

export default function Home() {
  useEffect(() => {
    const handleClick = (e) => {
      const clickHeart = document.createElement("span");
      clickHeart.className = "click-particle";
      clickHeart.textContent = CLICK_EMOJIS[Math.floor(Math.random() * CLICK_EMOJIS.length)];
      clickHeart.style.left = `${e.clientX}px`;
      clickHeart.style.top = `${e.clientY}px`;
      document.body.appendChild(clickHeart);

      setTimeout(() => {
        clickHeart.remove();
      }, 800);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <div className="hearts-bg" aria-hidden="true">
        {HEARTS.map((heart, idx) => (
          <span
            key={idx}
            className="floating-particle"
            style={{
              left: heart.left,
              fontSize: heart.size,
              animationDuration: heart.duration,
              animationDelay: heart.delay,
              "--particle-opacity": heart.opacity,
            }}
          >
            {heart.symbol}
          </span>
        ))}
      </div>

      <main className="page-container">
        <div className="content-box">
          <div className="heart-wrapper">
            <svg className="heart-svg" viewBox="0 0 500 500" aria-hidden="true">
              <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff5277" />
                  <stop offset="45%" stopColor="#e61c5d" />
                  <stop offset="100%" stopColor="#8a0328" />
                </linearGradient>
                <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="12" stdDeviation="20" floodColor="#ff1a60" floodOpacity="0.45" />
                </filter>
              </defs>
              <path
                className="heart-shape"
                d="M 250,440 
                   C 105,310 15,220 15,135 
                   C 15,55 75,10 155,10 
                   C 205,10 235,35 250,75 
                   C 265,35 295,10 345,10 
                   C 425,10 485,55 485,135 
                   C 485,220 395,310 250,440 Z"
                fill="url(#heartGradient)"
                filter="url(#softGlow)"
              />
            </svg>

            <div className="couple-names-container">
              <span className="first-name">Adriana</span>
              <span className="ampersand">&amp;</span>
              <span className="second-name">Alyson</span>
              <div className="tagline">Juntos para sempre</div>
            </div>
          </div>

          <p className="romantic-quote">
            “O amor não é olhar um para o outro, é olhar juntos na mesma direção.”
          </p>
        </div>
      </main>
    </>
  );
}
