import AllProjects from "@/components/module/dashboard/admin/AllProjects";
import { getAllProjects } from "@/services/project";
import React from "react";

const GetAllProjects = async () => {
  const projects = await getAllProjects();
  return (
    <div>
      <AllProjects projects={projects} />
    </div>
  );
};

export default GetAllProjects;
