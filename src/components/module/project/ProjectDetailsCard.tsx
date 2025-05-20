/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  ArrowRight,
  CheckCircle2,
  Users,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiTypescript,
  SiRedux,
  SiNextdotjs,
  SiSocketdotio,
  SiStripe,
  SiFirebase,
  SiCloudinary,
  SiPrisma,
  SiPostgresql,
  SiVercel,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";

const iconMap: Record<string, React.ComponentType<any>> = {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiTypescript,
  SiRedux,
  SiNextdotjs,
  SiSocketdotio,
  SiStripe,
  SiFirebase,
  SiCloudinary,
  SiPrisma,
  SiPostgresql,
  SiVercel,
  TbBrandFramerMotion,
};

interface Technology {
  _id?: string;
  name: string;
  icon: string;
}

interface ProjectDetailsProps {
  project: {
    title: string;
    description: string;
    image: string;
    link: string;
    technologies: Technology[];
    type: string;
    createdAt: string | Date;
    client_code: string;
    server_code: string;
    features: string[];
    myContribution: string;
  };
}

const ProjectDetailsCard: React.FC<ProjectDetailsProps> = ({ project }) => {
  console.log(project);
  const [activeTab, setActiveTab] = useState("overview");
  const [isHovered, setIsHovered] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const isIndividual = project.type === "Individual";

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Link
          href="/projects"
          className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
        >
          <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
          <span>Back to Projects</span>
        </Link>
      </motion.div>

      {/* Project Type Badge - Top */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6 flex items-center"
      >
        <Badge
          variant="outline"
          className={cn(
            "px-3 py-1.5 text-sm font-medium flex items-center gap-2",
            isIndividual
              ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
              : "bg-purple-500/10 text-purple-500 border-purple-500/20"
          )}
        >
          {isIndividual ? (
            <>
              <User className="h-3.5 w-3.5" />
              Individual Project
            </>
          ) : (
            <>
              <Users className="h-3.5 w-3.5" />
              Team Project
            </>
          )}
        </Badge>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Image with animation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="sticky top-24">
            {/* Project title for mobile - will be hidden on larger screens */}
            <div className="mb-4 lg:hidden">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                {project.title}
              </h1>
              <div className="text-muted-foreground text-sm mb-4">
                Completed:{" "}
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </div>
            </div>

            {/* Image with hover animation */}
            <div
              className="relative overflow-hidden rounded-xl border border-border mb-6 group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Project type indicator on the image */}
              <div className="absolute top-4 left-4 z-10">
                <Badge
                  variant="outline"
                  className={cn(
                    "px-3 py-1 text-xs font-medium bg-background/80 backdrop-blur-sm flex items-center gap-1.5",
                    isIndividual
                      ? "border-blue-500/30 text-blue-500"
                      : "border-purple-500/30 text-purple-500"
                  )}
                >
                  {isIndividual ? (
                    <>
                      <User className="h-3 w-3" />
                      Individual
                    </>
                  ) : (
                    <>
                      <Users className="h-3 w-3" />
                      Team
                    </>
                  )}
                </Badge>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20  opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[1]" />

              {/* Image container with animation */}
              <div className="aspect-video w-full relative">
                <div
                  className={`absolute inset-0 transition-transform duration-[5s] ease-linear ${
                    isHovered ? "translate-y-[-50%]" : "translate-y-0"
                  }`}
                >
                  <Image
                    src={
                      project.image || "/placeholder.svg?height=800&width=1200"
                    }
                    alt={project.title}
                    width={1200}
                    height={800}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => {
                  const IconComponent = iconMap[tech.icon];
                  return (
                    <div
                      key={tech._id || tech.name}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-card border border-border"
                    >
                      {IconComponent && (
                        <IconComponent className="text-blue-500 h-4 w-4" />
                      )}
                      <span className="text-xs">{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right column - Links and details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-1"
        >
          <div className="sticky top-24">
            <div className="space-y-6">
              {/* Project title - hidden on mobile, shown on larger screens */}
              <div className="hidden lg:block">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                  {project.title}
                </h1>
                <div className="text-muted-foreground text-sm mb-4">
                  Completed:{" "}
                  {new Date(project.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>

              {/* Project Links */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Project Links
                </h3>
                <div className="space-y-2">
                  <Button
                    asChild
                    variant="default"
                    className="w-full justify-start bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Link
                      href={project.client_code}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Client Repository
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Link
                      href={project.server_code}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Server Repository
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Project Type - More detailed */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Project Type
                </h3>
                <div
                  className={cn(
                    "p-3 rounded-lg border flex items-center gap-3",
                    isIndividual
                      ? "bg-blue-500/5 border-blue-500/20"
                      : "bg-purple-500/5 border-purple-500/20"
                  )}
                >
                  {isIndividual ? (
                    <>
                      <User
                        className={cn(
                          "h-5 w-5",
                          isIndividual ? "text-blue-500" : "text-purple-500"
                        )}
                      />
                      <div>
                        <div className="font-medium">Individual Project</div>
                        <div className="text-xs text-muted-foreground">
                          Designed and developed independently
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Users className="h-5 w-5 text-purple-500" />
                      <div>
                        <div className="font-medium">Team Project</div>
                        <div className="text-xs text-muted-foreground">
                          Collaborative development with team members
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs and content - Full width */}
      <div className="mt-12">
        {/* Tabs */}
        <div className="border-b border-border mb-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={cn(
                "pb-2 text-sm font-medium transition-colors relative",
                activeTab === "overview"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={cn(
                "pb-2 text-sm font-medium transition-colors relative",
                activeTab === "features"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Features
            </button>
            <button
              onClick={() => setActiveTab("contribution")}
              className={cn(
                "pb-2 text-sm font-medium transition-colors relative",
                activeTab === "contribution"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              My Contribution
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div className="min-h-[300px]">
          {activeTab === "overview" && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold mb-4">Project Overview</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-2">
                  <h4 className="font-medium">Project Type</h4>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {isIndividual ? (
                      <>
                        <User className="h-4 w-4 text-blue-500" />
                        <span>Individual Project</span>
                      </>
                    ) : (
                      <>
                        <Users className="h-4 w-4 text-purple-500" />
                        <span>Team Project</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Completed</h4>
                  <p className="text-muted-foreground">
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h4 className="font-medium mb-3">Key Technologies</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {project.technologies.map((tech) => {
                    const IconComponent = iconMap[tech.icon];
                    return (
                      <div
                        key={tech._id || tech.name}
                        className="flex items-center gap-2 p-3 rounded-lg bg-card border border-border"
                      >
                        {IconComponent && (
                          <IconComponent className="text-blue-500 h-5 w-5" />
                        )}
                        <span className="text-sm">{tech.name}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "features" && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature: string, index: any) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card"
                    >
                      <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "contribution" && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-semibold">My Contribution</h3>
                  <Badge
                    variant="outline"
                    className={cn(
                      "ml-2",
                      isIndividual
                        ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                        : "bg-purple-500/10 text-purple-500 border-purple-500/20"
                    )}
                  >
                    {project.type}
                  </Badge>
                </div>
                <div
                  className={cn(
                    "p-6 rounded-lg border",
                    isIndividual
                      ? "border-blue-500/20 bg-blue-500/5"
                      : "border-purple-500/20 bg-purple-500/5"
                  )}
                >
                  <p className="text-foreground leading-relaxed">
                    {project.myContribution}
                  </p>
                </div>
              </motion.div>

              {project.type === "Team Projects" && (
                <motion.div variants={itemVariants}>
                  <h4 className="font-medium mb-3">Team Collaboration</h4>
                  <p className="text-muted-foreground">
                    This project was developed as part of a team effort, where I
                    contributed significantly to its success by focusing on
                    specific areas while collaborating with other team members.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Call to action */}
      <div className="mt-12 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href={project.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Live Project
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link
              href={project.client_code}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              View Source Code
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsCard;
