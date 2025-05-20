import Project from "@/components/module/project/Project";
import { backendUrl } from "@/services/backend";
export interface TProject {
  _id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  thumbnail: string;
  technologies: {
    name: string;
    icon: string;
  }[];
  type: "Individual" | "Team Projects";
  client_code: string;
  server_code: string;
  features: string[];
  myContribution?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectsPage = async () => {
  const res = await fetch(`${backendUrl}/admin/projects`, {
    cache: "no-store",
  });

  const { data: projects }: { data: TProject[] } = await res.json();
  return (
    <div>
      <Project projects={projects} />
    </div>
  );
};

export default ProjectsPage;
