"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaDownload, FaProjectDiagram, FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import ImageBanner from "./Image";
import { TypewriterEffect } from "@/components/ui/motion/TypeWriter";
import { TextGenerateEffect } from "@/components/ui/motion/TextGenerate";
import Link from "next/link";

export function Banner() {
  const router = useRouter();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Resume Download Function
  const handleDownload = () => {
    const resumeUrl = "/Resume_of_Barkat_Ullah.pdf";
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Barkat's_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const words = [
    {
      text: "My",
    },
    {
      text: "Personal",
    },
    {
      text: "Projects",
    },
    {
      text: "Portfolio",
      className: "text-primary",
    },
  ];

  const description = `I specialize in building modern web applications using the MERN Stack and Next.js. My focus is on creating scalable solutions with secure authentication and exceptional user experiences through Tailwind CSS & shadcn UI.`;

  return (
    <div className="min-h-screen w-full py-12  md:py-12 lg:py-16 relative overflow-hidden">
      {/* Enhanced blue background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/30 via-blue-400/10 to-background" />

      {/* Animated background dots with enhanced visibility */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute h-full w-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)] opacity-20" />
      </div>

      <div className="container px-4 sm:px-6 relative">
        {/* Status Badge - Repositioned higher on mobile */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute top-0 sm:-top-6 right-4 md:right-0 z-10"
        >
          <Badge
            variant="outline"
            className="group flex items-center gap-2 px-3 py-1.5 text-sm bg-background/80 backdrop-blur-sm border-blue-500/50 hover:border-blue-500"
          >
            <span className="relative flex h-2 w-2 ">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>Available for opportunities</span>
          </Badge>
        </motion.div>

        {/* Main Content Section */}
        <div
          className={cn(
            "flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16 transition-all duration-1000",
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          {/* Left side text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1"
          >
            {/* Heading with Gradient Text */}
            <h1 className="relative z-10 mt-2 lg:mt-0 text-2xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              Full Stack Developer & MERN Specialist
            </h1>

            {/* Added Full Stack / MERN specialization text */}
            <p className="text-sm md:text-base text-foreground/80 mb-4">
              Building powerful web applications with React, Node.js, Express,
              and MongoDB. Specializing in Next.js, TypeScript and modern UI
              frameworks.
            </p>

            {/* Subheading with TypewriterEffect */}
            <div className="h-12 mb-6">
              <TypewriterEffect words={words} className="text-lg md:text-2xl" />
            </div>

            {/* Description with TextGenerateEffect */}
            <div className="mb-8">
              <TextGenerateEffect
                words={description}
                className="text-foreground text-sm md:text-base relative z-10"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 mb-8">
              <Button
                onClick={() => router.push("/projects")}
                size="lg"
                className="w-full sm:w-auto group relative overflow-hidden text-white bg-blue-600 hover:bg-blue-700"
              >
                <span className="absolute inset-0 bg-gradient-to-r text-white from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2">
                  <FaProjectDiagram className="text-lg" />
                  View Projects
                </span>
              </Button>

              <Button
                onClick={handleDownload}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-blue-500/50 hover:bg-blue-500/10 text-foreground"
              >
                <span className="flex items-center gap-2">
                  <FaDownload className="text-lg" />
                  Download Resume
                </span>
              </Button>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex justify-center md:justify-start mt-4 gap-6"
            >
              <Link
                href="https://github.com/Barkat-Ullah"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-blue-500 transition-colors"
              >
                <FaGithub className="w-10 h-10" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/barkat-ullah-1013b82a3/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-blue-500 transition-colors"
              >
                <FaLinkedin className="w-10 h-10" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side image content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="w-full md:w-1/2 flex justify-center order-1 md:order-2 mb-8 md:mb-0"
          >
            <ImageBanner />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
