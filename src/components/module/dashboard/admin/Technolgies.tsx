"use client";

import { useState } from "react";
import { Check, X, ChevronsUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Import React Icons
import {
  FaReact,
  FaVuejs,
  FaAngular,
  FaNodeJs,
  FaDatabase,
  FaFire,
  FaNetworkWired,
  FaCode,
  FaHtml5,
  FaCss3Alt,
  FaRedo,
  FaGitAlt,
  FaGithub,
  FaGitlab,
  FaDesktop,
  FaServer,
  FaLayerGroup,
  FaSquare,
  FaAmazon,
} from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import {
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiSupabase,
  SiGraphql,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiBootstrap,
  SiMaterialformkdocs,
  SiChakraui,
  SiRedux,
  SiFramer,
  SiGreensock,
  SiThreedotjs,
  SiWebgl,
  SiStripe,
  SiPaypal,
  SiGooglecloud,
  SiVercel,
  SiNetlify,
  SiDocker,
  SiKubernetes,
  SiJest,
  SiCypress,
  SiStorybook,
  SiWebpack,
  SiVite,
  SiBabel,
  SiEslint,
  SiPrettier,
  SiPwa,
} from "react-icons/si";

// Define the technology type
export type Technology = {
  name: string;
  icon: string;
};

// Map of technology icons using React Icons
const iconMap = {
  React: FaReact,
  NextJS: SiNextdotjs,
  Vue: FaVuejs,
  Angular: FaAngular,
  Node: FaNodeJs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Firebase: FaFire,
  Supabase: SiSupabase,
  GraphQL: SiGraphql,
  REST: FaNetworkWired,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  TailwindCSS: SiTailwindcss,
  Bootstrap: SiBootstrap,
  MaterialUI: SiMaterialformkdocs,
  ChakraUI: SiChakraui,
  Redux: SiRedux,
  Zustand: FaRedo,
  ContextAPI: FaRedo,
  FramerMotion: SiFramer,
  GSAP: SiGreensock,
  ThreeJS: SiThreedotjs,
  WebGL: SiWebgl,
  Stripe: SiStripe,
  PayPal: SiPaypal,
  AWS: FaAmazon,
  GoogleCloud: SiGooglecloud,
  Azure: VscAzure,
  Vercel: SiVercel,
  Netlify: SiNetlify,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  Git: FaGitAlt,
  GitHub: FaGithub,
  GitLab: FaGitlab,
  Jest: SiJest,
  Cypress: SiCypress,
  Storybook: SiStorybook,
  Webpack: SiWebpack,
  Vite: SiVite,
  Babel: SiBabel,
  ESLint: SiEslint,
  Prettier: SiPrettier,
  PWA: SiPwa,
  Electron: FaDesktop,
  Server: FaServer,
  Database: FaDatabase,
  Code: FaCode,
  Layers: FaLayerGroup,
  SquareCode: FaSquare,
};

// List of technologies with their icons
const technologies: Technology[] = [
  { name: "React.js", icon: "React" },
  { name: "Next.js", icon: "NextJS" },
  { name: "Vue.js", icon: "Vue" },
  { name: "Angular", icon: "Angular" },
  { name: "Node.js", icon: "Node" },
  { name: "Express.js", icon: "Express" },
  { name: "MongoDB", icon: "MongoDB" },
  { name: "PostgreSQL", icon: "PostgreSQL" },
  { name: "MySQL", icon: "MySQL" },
  { name: "Firebase", icon: "Firebase" },
  { name: "Supabase", icon: "Supabase" },
  { name: "GraphQL", icon: "GraphQL" },
  { name: "REST API", icon: "REST" },
  { name: "TypeScript", icon: "TypeScript" },
  { name: "JavaScript", icon: "JavaScript" },
  { name: "HTML", icon: "HTML" },
  { name: "CSS", icon: "CSS" },
  { name: "Tailwind CSS", icon: "TailwindCSS" },
  { name: "Bootstrap", icon: "Bootstrap" },
  { name: "Material UI", icon: "MaterialUI" },
  { name: "Chakra UI", icon: "ChakraUI" },
  { name: "Redux", icon: "Redux" },
  { name: "Zustand", icon: "Zustand" },
  { name: "Context API", icon: "ContextAPI" },
  { name: "Framer Motion", icon: "FramerMotion" },
  { name: "GSAP", icon: "GSAP" },
  { name: "Three.js", icon: "ThreeJS" },
  { name: "WebGL", icon: "WebGL" },
  { name: "Stripe", icon: "Stripe" },
  { name: "PayPal", icon: "PayPal" },
  { name: "AWS", icon: "AWS" },
  { name: "Google Cloud", icon: "GoogleCloud" },
  { name: "Azure", icon: "Azure" },
  { name: "Vercel", icon: "Vercel" },
  { name: "Netlify", icon: "Netlify" },
  { name: "Docker", icon: "Docker" },
  { name: "Kubernetes", icon: "Kubernetes" },
  { name: "Git", icon: "Git" },
  { name: "GitHub", icon: "GitHub" },
  { name: "GitLab", icon: "GitLab" },
  { name: "Jest", icon: "Jest" },
  { name: "Cypress", icon: "Cypress" },
  { name: "Storybook", icon: "Storybook" },
  { name: "Webpack", icon: "Webpack" },
  { name: "Vite", icon: "Vite" },
  { name: "Babel", icon: "Babel" },
  { name: "ESLint", icon: "ESLint" },
  { name: "Prettier", icon: "Prettier" },
  { name: "PWA", icon: "PWA" },
  { name: "Electron", icon: "Electron" },
];

interface TechnologySelectorProps {
  value: Technology[];
  onChange: (value: Technology[]) => void;
}

export default function TechnologySelector({
  value,
  onChange,
}: TechnologySelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Get the selected technologies
  const selected = value || [];

  // Handle selection of a technology
  const handleSelect = (tech: Technology) => {
    const isSelected = selected.some((item) => item.name === tech.name);

    if (isSelected) {
      onChange(selected.filter((item) => item.name !== tech.name));
    } else {
      onChange([...selected, tech]);
    }
  };

  // Remove a selected technology
  const handleRemove = (techName: string) => {
    onChange(selected.filter((item) => item.name !== techName));
  };

  // Render the icon for a technology
  const renderIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || FaCode;
    return <IconComponent className="h-4 w-4" />;
  };

  // Filter technologies based on search input
  const filteredTechnologies = technologies.filter((tech) =>
    tech.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="w-full justify-between"
            onClick={() => setOpen(!open)}
          >
            {selected.length > 0
              ? `${selected.length} technologies selected`
              : "Select technologies"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search technologies..."
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty>No technologies found.</CommandEmpty>
              <CommandGroup>
                {filteredTechnologies.map((tech) => {
                  const isSelected = selected.some(
                    (item) => item.name === tech.name
                  );
                  return (
                    <CommandItem
                      key={tech.name}
                      value={tech.name}
                      onSelect={() => handleSelect(tech)}
                    >
                      <div className="flex items-center gap-2 w-full">
                        {renderIcon(tech.icon)}
                        <span>{tech.name}</span>
                      </div>
                      <Check
                        className={`ml-auto h-4 w-4 ${
                          isSelected ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((tech) => (
            <Badge
              key={tech.name}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {renderIcon(tech.icon)}
              {tech.name}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => handleRemove(tech.name)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
