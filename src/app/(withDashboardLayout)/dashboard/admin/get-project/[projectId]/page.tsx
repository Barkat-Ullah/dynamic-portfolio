import UpdateProject from "@/components/module/dashboard/admin/UpdateProject";
import { getSingleProject } from "@/services/project";
import React from "react";
type Params = Promise<{ projectId: string }>;
const page = async ({ params }: { params: Params }) => {
  const { projectId } = await params;
  const project = await getSingleProject(projectId);
  return (
    <div>
      <UpdateProject project={project} />
    </div>
  );
};

export default page;
