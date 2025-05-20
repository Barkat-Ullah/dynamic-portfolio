"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiRedux,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiJsonwebtokens,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
  SiFirebase,
  SiStripe,
  SiNetlify,
  SiSocketdotio,
  SiZod,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiPrisma,
  SiPostgresql,
} from "react-icons/si";
import { FaServer } from "react-icons/fa";
import { DiVisualstudio } from "react-icons/di";
import { TbBrandFramerMotion } from "react-icons/tb";
import { RiReactjsLine } from "react-icons/ri";

interface Skill {
  name: string;
  icon: React.ElementType;
}

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  skills: Skill[];
}

export function SkillsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend Development",
      icon: RiReactjsLine,
      skills: [
        { name: "HTML5", icon: SiHtml5 },
        { name: "CSS3", icon: SiCss3 },
        { name: "JavaScript", icon: SiJavascript },
        { name: "TypeScript", icon: SiTypescript },
        { name: "React.js", icon: SiReact },
        { name: "Next.js", icon: SiNextdotjs },
        { name: "Redux", icon: SiRedux },
        { name: "Tailwind CSS", icon: SiTailwindcss },
        { name: "Framer Motion", icon: TbBrandFramerMotion },
      ],
    },
    {
      title: "Backend Development",
      icon: FaServer,
      skills: [
        { name: "Node.js", icon: SiNodedotjs },
        { name: "Express.js", icon: SiExpress },
        { name: "MongoDB", icon: SiMongodb },
        { name: "Mongoose", icon: SiMongoose },
        { name: "PostgreSQL", icon: SiPostgresql },
        { name: "Prisma", icon: SiPrisma },
        { name: "JWT", icon: SiJsonwebtokens },
        { name: "Socket.io", icon: SiSocketdotio },
        { name: "Zod", icon: SiZod },
      ],
    },
    {
      title: "Deployment & Tools",
      icon: SiGit,
      skills: [
        { name: "Git", icon: SiGit },
        { name: "GitHub", icon: SiGithub },
        { name: "VS Code", icon: DiVisualstudio },
        { name: "Postman", icon: SiPostman },
        { name: "Vercel", icon: SiVercel },
        { name: "Firebase", icon: SiFirebase },
        { name: "Stripe", icon: SiStripe },
        { name: "Netlify", icon: SiNetlify },
      ],
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="skills">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-background to-background" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute h-full w-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)] opacity-10" />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400"
          >
            Technical Skills
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            My expertise spans across various technologies in web development,
            with a focus on building modern, scalable applications.
          </motion.p>
        </div>

        <div className="space-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.title} className="mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-6"
              >
                <category.icon className="text-blue-500 text-2xl" />
                <h3 className="text-xl md:text-2xl font-semibold">
                  {category.title}
                </h3>
              </motion.div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {category.skills.map((skill, index) => {
                  const skillIndex = categoryIndex * 100 + index;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="relative group"
                      onMouseEnter={() => setHoveredIndex(skillIndex)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div className="relative h-full w-full p-4 rounded-xl border border-border bg-card overflow-hidden">
                        {/* Hover effect */}
                        <div
                          className={cn(
                            "absolute inset-0 h-full w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                            hoveredIndex === skillIndex && "opacity-100"
                          )}
                        />

                        {/* Animated border */}
                        <div
                          className={cn(
                            "absolute inset-0 h-full w-full  opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                            hoveredIndex === skillIndex && "opacity-100"
                          )}
                          style={{
                            maskImage:
                              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            maskComposite: "exclude",
                            maskPosition: "0 0",
                            padding: "1px",
                          }}
                        />

                        <div className="flex flex-col items-center justify-center text-center h-full space-y-2 relative z-10">
                          <skill.icon className="text-blue-500 text-3xl mb-2" />
                          <span className="text-sm font-medium">
                            {skill.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Core
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
