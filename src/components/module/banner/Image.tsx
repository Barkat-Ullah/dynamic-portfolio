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
  console.log(isLoaded);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Define tech stack with positions
  const techIcons = [
    { icon: FaReact, color: "text-cyan-400", name: "React", rotation: 0 },
    {
      icon: SiNextdotjs,
      color: "text-slate-800",
      name: "Next.js",
      rotation: 51,
    },
    {
      icon: SiMongodb,
      color: "text-green-600",
      name: "MongoDB",
      rotation: 102,
    },
    {
      icon: SiExpress,
      color: "text-slate-400",
      name: "Express",
      rotation: 153,
    },
    { icon: SiPrisma, color: "text-foreground", name: "Prisma", rotation: 204 },
    {
      icon: SiPostgresql,
      color: "text-orange-600",
      name: "PostgreSQL",
      rotation: 255,
    },
    {
      icon: SiTypescript,
      color: "text-blue-500",
      name: "TypeScript",
      rotation: 306,
    },
  ];

  return (
    <div className="flex items-center justify-center w-full h-full pt-6">
      {/* Main container with hexagonal clip-path background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Rotating outer ring for tech icons */}
        <div className="relative w-[250px] h-[250px] lg:w-[400px] lg:h-[400px]">
          {/* Background elements with clip-path */}
          <div className="absolute inset-0 bg-sky-50 rounded-full"></div>

          {/* Decorative elements */}
          <div className="absolute inset-8 rounded-full border-2 border-dashed border-blue-500/20"></div>
          <div className="absolute inset-16 rounded-full border border-blue-400/30"></div>

          {/* Tech icons positioned in a circle */}
          {techIcons.map((tech, index) => {
            const radius = 180; // Distance from center
            const angle = tech.rotation * (Math.PI / 180); // Convert to radians
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
                className="absolute"
                style={{
                  left: `calc(50% + ${x}px - 20px)`,
                  top: `calc(50% + ${y}px - 20px)`,
                  zIndex: 10,
                }}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full bg-background shadow-lg border border-primary/20 hover:border-primary/70 transition-all duration-300 overflow-hidden"
                  )}
                >
                  <tech.icon className={cn("w-5 h-5", tech.color)} />

                  {/* Tooltip on hover */}
                  <div className="absolute opacity-0 group-hover:opacity-100 -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-background rounded text-xs whitespace-nowrap shadow-md transition-opacity duration-300">
                    {tech.name}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Center profile image with full border radius */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full overflow-hidden z-10"
          >
            {/* Multiple border effect */}
            <div className="absolute inset-0 rounded-full border-4 border-blue-500/30 z-20"></div>
            <div className="absolute inset-1 rounded-full border-2 border-white/20 z-20"></div>

            {/* Glow effect */}
            <div className="absolute inset-0  rounded-full blur-sm z-0"></div>

            {/* Image */}
            <Image
              className="h-[350px] w-[300px] object-cover"
              src={profileImage}
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
              className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent z-10"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ImageBanner;
