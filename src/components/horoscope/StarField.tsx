import { motion } from 'framer-motion';
import { useMemo } from 'react';

export function StarField() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 2,
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 4,
      floatDistance: Math.random() * 20 + 10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/3" />
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            opacity: [0.15, 0.5, 0.15],
            scale: [1, 1.3, 1],
            y: [0, -particle.floatDistance, 0],
            x: [0, particle.floatDistance * 0.3, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}