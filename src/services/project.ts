/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { backendUrl } from "./backend";

// get all Projects
export const getAllProjects = async () => {
  try {
    const res = await fetch(`${backendUrl}/admin/projects`, {
      next: {
        tags: ["PROJECT"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get single Project
export const getSingleProject = async (ProjectId: string) => {
  try {
    const res = await fetch(`${backendUrl}/admin/projects/${ProjectId}`, {
      next: {
        tags: ["PROJECT"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const addProject = async (ProjectData: any): Promise<any> => {
  try {
    const res = await fetch(`${backendUrl}/admin/projects`, {
      method: "POST",
      body: JSON.stringify(ProjectData), // Convert to JSON string
      headers: {
        "Content-Type": "application/json", // Add this content type header
        Authorization: (await cookies()).get("token")!.value,
      },
    });
    revalidateTag("PROJECT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// update Project
export const updateProject = async (
  ProjectData: any,
  ProjectId: string
): Promise<any> => {
  try {
    const res = await fetch(`${backendUrl}/admin/projects/${ProjectId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("token")!.value,
      },
      body: JSON.stringify(ProjectData),
    });
    revalidateTag("PROJECT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
