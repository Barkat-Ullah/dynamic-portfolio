"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar, BookOpen } from "lucide-react";

export default function Education() {
  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Northern",
      period: "2025 - At present",
      grade: "GPA: -.--/4.00",
      description:
        "Focused on software engineering, data structures, algorithms, and web development.",
    },
    {
      degree: "Diploma in CSE",
      institution: "Feni Polytechnic Institute",
      period: "2020 - 2024",
      grade: "GPA: 3.48/4.00",
      description:
        "Science background with focus on Mathematics, Javascript & Programming .",
      achievements: ["Board Scholarship Recipient"],
    },
  ];

  const courses = [
    "Full Stack Web Development",
    "Data Structures & Algorithms",
    "Database Management Systems",
    "Software Engineering",
    "Computer Networks",
  ];

  return (
    <section className="w-full py-6 md:py-12 lg:py-16 ">
      <div className="container px-4 md:px-8 lg:px-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              Education & Learning
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My academic journey and continuous learning path
            </p>
          </div>
        </div>

        <div className="mx-auto space-y-8 py-12">
          {/* Formal Education */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <GraduationCap className="h-6 w-6" />
              Formal Education
            </h3>
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {education.map((edu, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{edu.degree}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      {edu.period}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">
                        {edu.grade}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {edu.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Certifications */}
          {/* <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Award className="h-6 w-6" />
              Professional Certifications
            </h3>
          </div> */}

          {/* Relevant Coursework */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Relevant Coursework
            </h3>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                  {courses.map((course, index) => (
                    <Badge key={index} variant="secondary">
                      {course}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
