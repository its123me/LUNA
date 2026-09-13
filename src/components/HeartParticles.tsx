import { useEffect, useState } from "react";

type Heart = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
};

type HeartParticlesProps = {
  active?: boolean;
  count?: number;
  variant?: "love" | "stars" | "miss" | "departed" | "candle";
};

export default function HeartParticles({
  active = true,
  count = 5,
  variant = "love",
}: HeartParticlesProps) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    if (!active) {
      setHearts([]);
      return;
    }

    const newHearts: Heart[] = Array.from({ length: count }, (_, index) => ({
      id: Date.now() + index,
      left: 20 + Math.random() * 60,
      size: 10 + Math.random() * 13,
      delay: Math.random() * 0.8,
      duration: 2.8 + Math.random() * 1.8,
      rotation: -18 + Math.random() * 36,
    }));

    setHearts(newHearts);

    const timer = window.setTimeout(() => {
      setHearts([]);
    }, 5200);

    return () => window.clearTimeout(timer);
  }, [active, count]);

  if (!active || hearts.length === 0) {
    return null;
  }

  return (
    <div
      className={`heart-particles heart-particles-${variant}`}
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart-particle"
          style={
            {
              left: `${heart.left}%`,
              fontSize: `${heart.size}px`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
              "--heart-rotation": `${heart.rotation}deg`,
            } as React.CSSProperties
          }
        >
          ♡
        </span>
      ))}
    </div>
  );
}