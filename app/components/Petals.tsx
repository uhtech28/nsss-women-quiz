"use client";

import { useEffect, useState } from "react";

type Petal = {
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
};

export default function Petals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 12 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${-100 - Math.random() * 200}px`,
      size: `${16 + Math.random() * 10}px`,
      delay: `${Math.random() * 8}s`,
      duration: `${10 + Math.random() * 8}s`,
    }));

    setPetals(generated);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: p.left,
            top: p.top,
            fontSize: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: 0.65,
          }}
        >
          🌸
        </span>
      ))}
    </div>
  );
}
