/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";

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
import { addProject } from "@/services/project";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

export default function ProjectForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  // Initialize the form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
      image: "",
      thumbnail: "",
      technologies: [],
      type: "Individual",
      client_code: "",
      server_code: "",
      features: [""],
      myContribution: "",
    },
  });

  //  const featuresArray = useFieldArray({
  //    control: form.control,
  //    name: "features",
  //  });

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
      // Log the form data to the console
      console.log("Form data:", data);

      // Simulate API call
      const result = await addProject(data);
      if (result.status) {
        toast.success("Project updated successfully!");
        console.log(result);
        // Redirect back to projects list
        router.push("/dashboard/admin/get-project");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to update project");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form after successful submission
      // form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error creating project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
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
                      <Input placeholder="Fitness Studio" {...field} />
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
                      placeholder="A comprehensive fitness management platform for gym owners and members..."
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
                      <Input
                        placeholder="https://fitness-studio.surge.sh"
                        {...field}
                      />
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

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating Project..." : "Create Project"}
        </Button>
      </form>
    </Form>
  );
}
