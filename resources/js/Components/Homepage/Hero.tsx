import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Sparkles from "../Common/Sparkles";

// const numStars = 100; // Number of sparkles

// const generateStar = () => ({
//   id: Math.random().toString(36).substr(2, 9), // Unique ID for each star
//   size: Math.random() * 10 + 6, // Size between 6px - 16px
//   top: Math.random() * 100, // Random vertical position
//   left: Math.random() * 100, // Random horizontal position
//   delay: Math.random() * 5, // Random delay for desync
//   duration: Math.random() * 3 + 2, // Individual duration (2-5s)
// });

export const Hero4 = () => (
  <div className="relative h-screen w-full py-40 px-10 bg-transparent overflow-hidden">
 

    <div className="container h-full flex justify-center items-center mx-auto">
      <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex gap-4 flex-col"
        >
          <h1 className="text-5xl md:text-7xl max-w-lg text-[#fbe37b] tracking-tighter text-left font-bold py-3 [text-shadow:0_0_20px_rgb(250,204,21)]">
            Beauty & Comfort, Redefined.
          </h1>
          <p className="text-xl text-white leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
            Elevate your self-care in a space of pure relaxation and elegance. Experience luxury and comfort that leaves you refreshed, confident, and effortlessly beautiful.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 z-20">
          {/* Image 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative aspect-square"
          >
            <div className="absolute inset-0 bg-transparent border-2 border-primary rounded-md shadow-[0_0_20px_#facc15] pointer-events-none">
              <img src="/images/studio1.jpg" alt="logo" className="w-full h-full rounded-md relative z-10 object-cover" />
            </div>
          </motion.div>

          {/* Image 2 (Tall) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="relative row-span-2"
          >
            <div className="absolute inset-0 bg-transparent border-2 border-primary rounded-md shadow-[0_0_20px_#facc15] pointer-events-none">
              <img src="/images/studio3.jpg" alt="logo" className="w-full h-full rounded-md object-cover relative z-10" />
            </div>
          </motion.div>

          {/* Image 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="relative aspect-square"
          >
            <div className="absolute inset-0 bg-transparent border-2 border-primary rounded-md shadow-[0_0_20px_#facc15] pointer-events-none">
              <img src="/images/studio2.jpg" alt="logo" className="w-full h-full rounded-md object-cover relative z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </div>
);
