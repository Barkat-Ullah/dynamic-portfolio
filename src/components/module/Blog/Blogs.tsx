"use client";

import { BlogTypes } from "@/app/(withCommonLayout)/blogs/page";
import type React from "react";
import BlogBentoGrid from "./BlogBentoGrid";

interface BlogsProps {
  blogs?: BlogTypes[];
}

const Blog: React.FC<BlogsProps> = ({ blogs }) => {
  if (!blogs) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 text-center">
        Recent Articles
      </h1>
      <BlogBentoGrid blogs={blogs} />
    </div>
  );
};

export default Blog;
