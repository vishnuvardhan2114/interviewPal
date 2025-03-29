"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden z-0">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFYwYzkuOTQgMCAxOCA4LjA2IDE4IDE4aDEuNWE0LjUgNC41IDAgMDA0LjUtNC41IDQuNSA0LjUgMCAwMC00LjUtNC41SDM2djEuNWE0LjUgNC41IDAgMDA0LjUgNC41IDQuNSA0LjUgMCAwMDQuNS00LjVIMTh2LTEuNU0wIDE4djEuNWE0LjUgNC41IDAgMDA0LjUgNC41IDQuNSA0LjUgMCAwMDQuNS00LjVIMHptMCAxOHYxLjVhNC41IDQuNSAwIDAwNC41IDQuNSA0LjUgNC41IDAgMDA0LjUtNC41SDB6TTAgMHYxLjVhNC41IDQuNSAwIDAwNC41IDQuNSA0LjUgNC41IDAgMDA0LjUtNC41SDB6IiBmaWxsPSIjZjFmNWY5IiBmaWxsLW9wYWNpdHk9Ii4yIi8+PC9nPjwvc3ZnPg==')] opacity-30" />

      {/* Animated gradient blobs */}
      <motion.div
        className="absolute w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-indigo-300/20 via-purple-300/20 to-pink-300/20 blur-3xl"
        animate={{
          x: mousePosition.x * 0.05 - 200,
          y: mousePosition.y * 0.05 - 200,
          scale: [1, 1.05, 1],
        }}
        transition={{
          scale: {
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          },
          x: { duration: 1, ease: "easeOut" },
          y: { duration: 1, ease: "easeOut" },
        }}
      />

      <motion.div
        className="absolute w-[35vw] h-[35vw] rounded-full bg-gradient-to-r from-blue-300/20 via-cyan-300/20 to-teal-300/20 blur-3xl"
        animate={{
          x: mousePosition.x * -0.03 + window.innerWidth * 0.6,
          y: mousePosition.y * -0.03 + window.innerHeight * 0.6,
          scale: [1, 1.1, 1],
        }}
        transition={{
          scale: {
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          },
          x: { duration: 1.5, ease: "easeOut" },
          y: { duration: 1.5, ease: "easeOut" },
        }}
      />

      <motion.div
        className="absolute w-[25vw] h-[25vw] rounded-full bg-gradient-to-r from-amber-300/10 via-yellow-300/10 to-orange-300/10 blur-3xl"
        animate={{
          x: mousePosition.x * 0.02 + window.innerWidth * 0.2,
          y: mousePosition.y * 0.02 + window.innerHeight * 0.3,
          scale: [1, 1.08, 1],
        }}
        transition={{
          scale: {
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
          },
          x: { duration: 2, ease: "easeOut" },
          y: { duration: 2, ease: "easeOut" },
        }}
      />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 bg-noise opacity-20" />
    </div>
  );
};

export default AnimatedBackground;