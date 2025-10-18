import { ReactNode } from 'react';

interface ScrollTextProps {
  children: ReactNode;
  scrollY: number;
  startAt?: number;
  endAt?: number;
  className?: string;
}

export function ScrollText({
  children,
  scrollY,
  startAt = 0,
  endAt = 400,
  className = '',
}: ScrollTextProps) {
  // Calculate progress between startAt and endAt scroll positions
  const progress = Math.max(0, Math.min(1, (scrollY - startAt) / (endAt - startAt)));

  const opacity = progress;
  const scale = 0.8 + progress * 0.2;
  const translateY = (1 - progress) * 80;

  return (
    <div
      className={className}
      style={{
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`,
        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
      }}
    >
      {children}
    </div>
  );
}

interface ParallaxLayerProps {
  children: ReactNode;
  scrollY: number;
  speed?: number;
  className?: string;
}

export function ParallaxLayer({
  children,
  scrollY,
  speed = 0.5,
  className = '',
}: ParallaxLayerProps) {
  return (
    <div
      className={className}
      style={{
        transform: `translateY(${scrollY * speed}px)`,
      }}
    >
      {children}
    </div>
  );
}
