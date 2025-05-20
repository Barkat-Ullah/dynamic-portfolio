"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import TechnologySelector from "./Technolgies";
import { updateProject } from "@/services/project";

// Define the project interface
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
  createdAt?: string;
  updatedAt?: string;
}

// Define the response interface
interface ProjectResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: TProject;
}

// Define the form schema with Zod
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  link: z.string().url({
    message: "Please enter a valid URL.",
  }),
  image: z.string().url({
    message: "Please enter a valid image URL.",
  }),
  thumbnail: z.string().url({
    message: "Please enter a valid thumbnail URL.",
  }),
  technologies: z
    .array(
      z.object({
        name: z.string(),
        icon: z.string(),
      })
    )
    .min(1, {
      message: "Please select at least one technology.",
    }),
  type: z.enum(["Individual", "Team Projects"]),
  client_code: z.string().url({
    message: "Please enter a valid client code repository URL.",
  }),
  server_code: z.string().url({
    message: "Please enter a valid server code repository URL.",
  }),
  features: z
    .array(
      z.string().min(3, {
        message: "Feature must be at least 3 characters.",
      })
    )
    .min(1, {
      message: "Please add at least one feature.",
    }),
  myContribution: z.string().min(10, {
    message: "Your contribution must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const UpdateProject = ({ project }: { project: ProjectResponse }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const projectData = project.data;

  // Initialize the form with project data as default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: projectData.title,
      description: projectData.description,
      link: projectData.link,
      image: projectData.image,
      thumbnail: projectData.thumbnail,
      technologies: projectData.technologies,
      type: projectData.type,
      client_code: projectData.client_code,
      server_code: projectData.server_code,
      features: projectData.features,
      myContribution: projectData.myContribution || "",
    },
  });

  // This will watch the features array for changes
  const features = form.watch("features");

  // Add a new feature field
  const addFeature = () => {
    const currentFeatures = form.getValues("features");
    form.setValue("features", [...currentFeatures, ""], { shouldDirty: true });
    // Force re-render by triggering form state update
    form.trigger("features");
  };

  // Remove a feature field
  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues("features");
    if (currentFeatures.length > 1) {
      const updatedFeatures = currentFeatures.filter((_, i) => i !== index);
      form.setValue("features", updatedFeatures, { shouldDirty: true });
      // Force re-render by triggering form state update
      form.trigger("features");
    }
  };

  // Handle form submission
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    try {
      // Call the updateProject function with the form data
      const result = await updateProject(data, projectData._id);

      console.log("API response:", result);

      if (result.status) {
        toast.success("Project updated successfully!");

        // Redirect back to projects list
        router.push("/dashboard/admin/get-project");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Error updating project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container py-10">
      <Button variant="outline" asChild className="mb-6">
        <Link href="/dashboard/admin/get-project">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Update Project</h1>
        <p className="text-muted-foreground">
          Edit the project information below
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Project Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Individual">Individual</SelectItem>
                          <SelectItem value="Team Projects">
                            Team Projects
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Project description..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Live Link</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="client_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Code Repository</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/username/repo"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="server_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Server Code Repository</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/username/server-repo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Image URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/image.jpg"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Full-size image of your project
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Thumbnail URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/thumbnail.jpg"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Smaller thumbnail image for previews
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="technologies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technologies Used</FormLabel>
                    <FormControl>
                      <TechnologySelector
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Select all technologies used in this project
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <FormLabel className="block mb-4">Project Features</FormLabel>
              {features.map((feature, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`features.${index}`}
                  render={({ field }) => (
                    <FormItem className="mb-4 flex items-center gap-2">
                      <FormControl>
                        <div className="flex w-full items-center gap-2">
                          <Input placeholder="Feature description" {...field} />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeFeature(index)}
                            disabled={features.length <= 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addFeature}
                className="mt-2"
              >
                Add Feature
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="myContribution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>My Contribution</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your role and contributions to this project..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      For team projects, describe your specific contributions
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Updating Project..." : "Update Project"}
            </Button>
            <Button type="button" variant="outline" className="flex-1" asChild>
              <Link href="/dashboard/admin/get-project">Cancel</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateProject;
