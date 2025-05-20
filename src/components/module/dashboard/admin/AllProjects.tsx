"use client";

import Image from "next/image";
import { PencilLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

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

interface AllProjectsProps {
  projects: {
    data: TProject[];
    message: string;
    status: boolean;
    statusCode: number;
  };
}

const AllProjects = ({ projects }: AllProjectsProps) => {
  const projectsData = projects.data || [];

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectsData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No projects found.
                </TableCell>
              </TableRow>
            ) : (
              projectsData.map((project) => (
                <TableRow key={project._id}>
                  <TableCell>
                    <div className="relative h-16 w-24 overflow-hidden rounded-md">
                      <Image
                        src={project.thumbnail || project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="max-w-md">
                      <div className="font-semibold">{project.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {project.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        project.type === "Individual" ? "outline" : "secondary"
                      }
                    >
                      {project.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" asChild>
                      <Link
                        href={`/dashboard/admin/get-project/${project._id}`}
                      >
                        <PencilLine className="h-4 w-4 mr-1" />
                        Update
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllProjects;
