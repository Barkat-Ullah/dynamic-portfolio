import Blogs from "@/components/module/Blog/Blogs";
import { backendUrl } from "@/services/backend";
import React from "react";
export interface BlogTypes {
  _id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  image: string;
}
const BlogPage = async () => {
  const res = await fetch(`${backendUrl}/admin/blogs`, {
    cache: "no-store",
  });

  const { data: blogs }: { data: BlogTypes[] } = await res.json();
  return (
    <div>
      <Blogs blogs={blogs} />
    </div>
  );
};

export default BlogPage;
