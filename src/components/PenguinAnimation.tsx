import React, { useState, useEffect, useCallback } from 'react';
import { Bird } from 'lucide-react';

interface BirdPosition {
  x: number;
  y: number;
  rotation: number;
  speed: number;
  direction: { x: number; y: number };
  exploded: boolean;
  color: number;
}

const PenguinAnimation: React.FC = () => {
  const [birds, setBirds] = useState<BirdPosition[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const createBird = (x = Math.random() * window.innerWidth, y = Math.random() * 600) => ({
    x,
    y,
    rotation: Math.random() * 360,
    speed: 2 + Math.random() * 2,
    direction: {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1
    },
    exploded: false,
    color: Math.floor(Math.random() * 3)
  });

  // Initialize birds
  useEffect(() => {
    const initialBirds = Array(8).fill(null).map(() => createBird());
    setBirds(initialBirds);
  }, []);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  // Update bird positions
  useEffect(() => {
    const updateBirds = () => {
      setBirds(prevBirds => prevBirds.map(bird => {
        if (bird.exploded) {
          // Respawn exploded birds after a delay
          if (Math.random() < 0.02) { // 2% chance each frame to respawn
            return createBird(
              Math.random() < 0.5 ? -50 : window.innerWidth + 50, // Spawn from either side
              Math.random() * 600
            );
          }
          return bird;
        }

        let newX = bird.x + bird.direction.x * bird.speed;
        let newY = bird.y + bird.direction.y * bird.speed;
        let newDirection = { ...bird.direction };

        // Check for explosion
        const distanceToMouse = Math.hypot(newX - mousePosition.x, newY - mousePosition.y);
        if (distanceToMouse < 50 && bird.color !== undefined) { // Only colored birds explode
          return { ...bird, exploded: true };
        }

        // Avoid mouse
        if (distanceToMouse < 150) {
          const angle = Math.atan2(newY - mousePosition.y, newX - mousePosition.x);
          newDirection.x = Math.cos(angle);
          newDirection.y = Math.sin(angle);
          bird.speed = 4;
        } else {
          bird.speed = Math.max(2, bird.speed - 0.1);
        }

        // Bounce off walls
        if (newX < 0 || newX > window.innerWidth) newDirection.x *= -1;
        if (newY < 0 || newY > 600) newDirection.y *= -1;

        // Keep birds within bounds
        newX = Math.max(0, Math.min(window.innerWidth, newX));
        newY = Math.max(0, Math.min(600, newY));

        const newRotation = Math.atan2(newDirection.y, newDirection.x) * (180 / Math.PI);

        return {
          ...bird,
          x: newX,
          y: newY,
          rotation: newRotation,
          direction: newDirection
        };
      }));
    };

    const animationFrame = requestAnimationFrame(updateBirds);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition]);

  return (
    <div 
      className="relative h-[600px] overflow-hidden bg-gradient-to-b from-black via-gray-900 to-yellow-900 rounded-lg shadow-2xl"
      onMouseMove={handleMouseMove}
    >
      {birds.map((bird, index) => (
        <div
          key={index}
          className={`absolute transition-transform duration-100 ${
            bird.exploded ? 'animate-[explosion_0.5s_ease-out_forwards]' : ''
          }`}
          style={{
            transform: `translate(${bird.x}px, ${bird.y}px) rotate(${bird.rotation}deg)`,
            transition: 'transform 0.1s linear'
          }}
        >
          <Bird 
            className={`w-12 h-12 ${
              bird.exploded 
                ? 'opacity-0 scale-0 transition-all duration-500' 
                : `text-yellow-${300 + (bird.color * 100)}`
            }`}
            style={{
              filter: 'drop-shadow(0 0 8px rgba(234, 179, 8, 0.3))'
            }}
          />
        </div>
      ))}
      
      {/* Overlay text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-white text-3xl font-bold bg-black bg-opacity-50 px-8 py-4 rounded-full shadow-lg backdrop-blur-sm">
          Watch Our Birds Soar!
        </p>
      </div>
    </div>
  );
};

export default PenguinAnimation;