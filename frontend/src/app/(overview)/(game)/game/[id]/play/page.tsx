"use client";

import { useState, useEffect } from 'react';
import DrawGame from "@/ui/overview/game/draw-game";

export default function Page() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth / 2,
    height: window.innerHeight / 3,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    console.log(dimensions, handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dimensions]);

  return (
    <div className="flex w-full h-full items-center justify-center">
      <DrawGame width={dimensions.width} height={dimensions.height} map={''} />
    </div>
  );
}
