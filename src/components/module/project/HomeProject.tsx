"use client";
import { TProject } from "@/app/(withCommonLayout)/projects/page";
import { Badge } from "@/components/ui/badge";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/ui/motion/ProjectsCard";
// import { CardBody, CardContainer, CardItem } from "../ui/projectsCard";
import Image from "next/image";
import Link from "next/link";

interface ProjectsProps {
  projects: TProject[];
}

const HomeProject: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 text-center">
        Recent Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
        {projects?.map((project) => (
          <CardContainer key={project._id} className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {project.title}
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <Image
                  src={project?.thumbnail}
                  height={1000}
                  width={1000}
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt={project.title}
                />
              </CardItem>
              <div className="flex justify-between items-center mt-4">
                <CardItem
                  translateZ={20}
                  as={Link}
                  href="/projects"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                >
                  View Project →
                </CardItem>
                <Badge>
                  <h2>{project.type}</h2>
                </Badge>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default HomeProject;
