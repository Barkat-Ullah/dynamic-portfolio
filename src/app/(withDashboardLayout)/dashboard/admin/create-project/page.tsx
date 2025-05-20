import ProjectForm from "@/components/module/dashboard/admin/CreateProjectPage";
// import CreateProjectPage from "@/components/module/dashboard/admin/CreateProjectPage";
import React from "react";

const CreateProject = () => {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Add New Project</h1>
      <ProjectForm />
    </div>
  );
};

export default CreateProject;
