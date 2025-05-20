// import type { Metadata } from "next";

import BlogForm from "@/components/module/dashboard/admin/Blogs/BlogForm";

// export const metadata: Metadata = {
//   title: "Create Blog",
//   description: "Create a new blog post",
// };

export default function CreateBlogPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Create Blog Post
          </h1>
          <p className="text-muted-foreground">
            Fill in the details below to create a new blog post
          </p>
        </div>
        <BlogForm />
      </div>
    </div>
  );
}
