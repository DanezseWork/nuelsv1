import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const numStars = 100; // Number of sparkles

const generateStar = () => ({
  id: Math.random().toString(36).substr(2, 9), // Unique ID for each star
  size: Math.random() * 10 + 6, // Size between 6px - 16px
  top: Math.random() * 100, // Random vertical position
  left: Math.random() * 100, // Random horizontal position
  delay: Math.random() * 5, // Random delay for desync
  duration: Math.random() * 3 + 2, // Individual duration (2-5s)
});

const Sparkles = () => {
  const [stars, setStars] = useState(() =>
    Array.from({ length: numStars }).map(generateStar)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setStars((prevStars) => {
        const newStars = [...prevStars];
        const randomIndex = Math.floor(Math.random() * newStars.length);
        newStars[randomIndex] = generateStar(); // Replace one star at a time
        return newStars;
      });
    }, 1000); // Adjust time for a more dynamic twinkling effect

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-yellow-300 z-10"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            clipPath:
              "polygon(50% 0%, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0% 50%, 40% 40%)", // Cross shape
            transform: "rotate(45deg)",
            opacity: 0.8,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0.8, 0.3, 0], // Smooth fade-out effect
            scale: [0, 1.2, 0.9], // Slight twinkle effect
          }}
          transition={{
            duration: star.duration, // Individual star durations
            repeat: Infinity,
            repeatDelay: Math.random() * 4 + 2, // Ensure randomness
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default Sparkles; 