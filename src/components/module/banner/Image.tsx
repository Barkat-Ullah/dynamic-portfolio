"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiTypescript,
} from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { cn } from "@/lib/utils";
import profileImage from "@/asset/my image.jpg";

const ImageBanner = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  console.log(isLoaded);

  useEffect(() => {
    setIsLoaded(true);

    // Set initial screen size
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Handle window resize
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define tech stack with positions
  const techIcons = [
    { icon: FaReact, color: "text-cyan-400", name: "React", rotation: 0 },
    {
      icon: SiNextdotjs,
      color: "text-slate-800 dark:text-slate-200",
      name: "Next.js",
      rotation: 51,
    },
    {
      icon: SiMongodb,
      color: "text-green-600 dark:text-green-500",
      name: "MongoDB",
      rotation: 102,
    },
    {
      icon: SiExpress,
      color: "text-slate-400 dark:text-slate-300",
      name: "Express",
      rotation: 153,
    },
    {
      icon: SiPrisma,
      color: "text-foreground dark:text-slate-200",
      name: "Prisma",
      rotation: 204,
    },
    {
      icon: SiPostgresql,
      color: "text-orange-600 dark:text-orange-500",
      name: "PostgreSQL",
      rotation: 255,
    },
    {
      icon: SiTypescript,
      color: "text-blue-500 dark:text-blue-400",
      name: "TypeScript",
      rotation: 306,
    },
  ];

  // Responsive radius calculation
  const getRadius = () => {
    if (screenSize.width < 640) return 85; // sm
    if (screenSize.width < 768) return 110; // md
    if (screenSize.width < 1024) return 140; // lg
    return 180; // xl and above
  };

  return (
    <div className="flex items-center justify-center w-full h-full pt-6">
      {/* Main container with responsive sizing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        {/* Rotating outer ring for tech icons */}
        <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px]">
          {/* Background elements with clip-path */}
          <div className="absolute inset-0 bg-sky-50 dark:bg-slate-800/20 rounded-full"></div>

          {/* Decorative elements */}
          <div className="absolute inset-4 sm:inset-6 md:inset-8 rounded-full border-2 border-dashed border-blue-600/20 dark:border-blue-400/30"></div>
          <div className="absolute inset-8 sm:inset-12 md:inset-16 rounded-full border border-blue-400/30 dark:border-blue-300/40"></div>

          {/* Tech icons positioned in a circle */}
          {techIcons.map((tech, index) => {
            const radius = getRadius();
            const angle = tech.rotation * (Math.PI / 180);
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                whileHover={{
                  scale: 1.2,
                  zIndex: 20,
                }}
                className="absolute group"
                style={{
                  left: `calc(50% + ${x}px - 16px)`,
                  top: `calc(50% + ${y}px - 16px)`,
                  zIndex: 10,
                }}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-background dark:bg-background/90 shadow-lg border border-primary/20 hover:border-primary/70 dark:border-primary/30 dark:hover:border-primary/80 transition-all duration-300 overflow-hidden"
                  )}
                >
                  <tech.icon
                    className={cn("w-4 h-4 sm:w-5 sm:h-5", tech.color)}
                  />

                  {/* Tooltip on hover */}
                  <div className="absolute opacity-0 group-hover:opacity-100 -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-background dark:bg-background/95 rounded text-xs whitespace-nowrap shadow-md transition-opacity duration-300 border border-border z-30">
                    {tech.name}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Center profile image with responsive sizing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px] lg:w-[220px] lg:h-[220px] rounded-full overflow-hidden z-10"
          >
            {/* Multiple border effect */}
            <div className="absolute inset-0 rounded-full border-4 border-blue-500/30 dark:border-blue-400/40 z-20"></div>
            <div className="absolute inset-1 rounded-full border-2 border-white/20 dark:border-white/10 z-20"></div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full blur-sm z-0"></div>

            {/* Image */}
            <Image
              className="h-[300px] w-[350px] object-cover"
              src={profileImage || "/placeholder.svg"}
              alt="profile image"
              width={300}
              height={350}
              priority
              onLoad={() => setIsLoaded(true)}
            />
            {/* Overlay gradient on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent dark:from-blue-800/60 z-10"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ImageBanner;
