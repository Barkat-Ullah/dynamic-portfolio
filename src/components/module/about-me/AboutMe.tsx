/* eslint-disable react/no-unescaped-entities */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Coffee, Code, Heart } from "lucide-react";

export default function AboutMe() {
  const interests = [
    "Full Stack Development",
    "Open Source",
    "Problem Solving",
    "Learning New Technologies",
    "Code Architecture",
    "Team Collaboration",
  ];

  const personalFacts = [
    { icon: Coffee, text: "Coffee enthusiast ☕" },
    { icon: Code, text: "1.5+ years of coding experience" },
    { icon: MapPin, text: "Based in Bangladesh" },
    { icon: Heart, text: "Passionate about clean code" },
  ];

  return (
    <section className="w-full py-6 md:py-8 lg:py-12">
      <div className="container px-4 md:px-8 lg:px-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              About Me
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get to know the person behind the code
            </p>
          </div>
        </div>

        <div className="mx-auto grid  items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Hello, I'm Md Barkat Ullah</h3>
              <p className="text-muted-foreground">
                I'm a passionate Full Stack Developer with expertise in the MERN
                stack ecosystem. I love building scalable web applications and
                solving complex problems with elegant solutions.
              </p>
              <p className="text-muted-foreground">
                My journey in web development started with curiosity and has
                evolved into a deep passion for creating digital experiences
                that make a difference. I believe in writing clean, maintainable
                code and staying updated with the latest technologies.
              </p>
              <p className="text-muted-foreground">
                When I'm not coding, you'll find me exploring new frameworks,
                contributing to open source projects, or sharing knowledge with
                the developer community.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {personalFacts.map((fact, index) => (
                <div key={index} className="flex items-center gap-2">
                  <fact.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {fact.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4">
                  What I'm passionate about
                </h4>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4">Current Focus</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    Building scalable web applications
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    Learning cloud technologies
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                    Contributing to open source
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
