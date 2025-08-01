/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Download,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ImprovedFooter() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Articles", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ];

  const keyTechnologies = [
    "React",
    "Next.js",
    "Redux",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "Tailwind CSS",
    "MongoDB",
    "PostgreSQL",
    "Prisma",
    "Mongoose",
    "ExpressJS",
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/Barkat-Ullah",
      icon: Github,
      username: "Barkat-Ullah",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/barkat-ullah-1013b82a3",
      icon: Linkedin,
      username: "Md Barkat Ullah",
    },
  ];

  const handleDownload = () => {
    const resumeUrl = "/Resume_of_Barkat_Ullah.pdf";
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Barkat's_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 md:px-8 lg:px-10">
        {/* Main Footer Content */}
        <div className="grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Md Barkat Ullah</h3>
            <p className="text-sm text-muted-foreground">
              Full Stack Developer passionate about creating scalable web
              applications and solving complex problems with elegant solutions.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">
                Available for opportunities
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Technologies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Key Technologies</h3>
            <div className="flex flex-wrap gap-1">
              {keyTechnologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDownload}
              className="w-fit bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Resume
            </Button>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Let's Connect</h3>
            <div className="space-y-3">
              <Link
                href="mailto:your-email@example.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                barkatullah585464@gmail.com
              </Link>
              <Link
                href="tel:+8801234567890"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                +880 183 488 9596
              </Link>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Follow me</p>
              <div className="flex flex-col space-y-2">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <social.icon className="h-4 w-4" />
                    <span>{social.username}</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Md Barkat Ullah. All rights
                reserved.
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <Link
                  href="/privacy"
                  className="hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <Badge variant="outline" className="text-xs">
                Next.js
              </Badge>
              <Badge variant="outline" className="text-xs">
                Tailwind CSS
              </Badge>
              <Badge variant="outline" className="text-xs">
                Aceternity UI
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
