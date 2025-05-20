import ProjectDetailsCard from "@/components/module/project/ProjectDetailsCard";
import { backendUrl } from "@/services/backend";

type Params = Promise<{ projectId: string }>;
const ProjectDetails = async ({ params }: { params: Params }) => {
  const { projectId } = await params;
  const res = await fetch(`${backendUrl}/admin/projects/${projectId}`, {
    cache: "no-store",
  });
  const { data: project } = await res.json();

  return (
    <div className="container mx-auto px-6">
      <ProjectDetailsCard project={project} />
    </div>
  );
};

export default ProjectDetails;
